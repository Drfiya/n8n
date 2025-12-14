/**
 * Output Generation Script
 *
 * Generates Markdown and CSV cheat guide files from normalized node data
 */

const fs = require('fs');
const path = require('path');

const normalizedData = require('../data/normalized-nodes.json');
const schema = require('../data/cheat-guide-schema.json');

// Category order for grouping
const categoryOrder = [
  'trigger',
  'transform',
  'input',
  'output',
  'organization'
];

const categoryDisplayNames = {
  trigger: 'Triggers',
  transform: 'Data Transformation',
  input: 'Data Sources',
  output: 'Data Destinations',
  organization: 'Flow Control'
};

const categoryEmojis = {
  trigger: '⚡',
  transform: '🔄',
  input: '📥',
  output: '📤',
  organization: '🗂️'
};

/**
 * Escape special characters for CSV
 */
function escapeCSV(str) {
  if (!str) return '';
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Generate CSV output
 */
function generateCSV(nodes) {
  const header = ['Icon', 'Node Name', 'Category', 'Type', 'Description', 'Auth Required', 'Icon File', 'Has Dark Mode'];

  const rows = nodes.map(node => [
    node.categoryIcon,
    escapeCSV(node.name),
    escapeCSV(node.categoryDisplay),
    escapeCSV(node.nodeTypeDisplay),
    escapeCSV(node.description),
    node.requiresCredentials ? 'Yes' : 'No',
    escapeCSV(node.iconFileName || ''),
    node.hasLightDarkIcons ? 'Yes' : 'No'
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
}

/**
 * Generate Markdown table for a category
 */
function generateMarkdownTable(nodes) {
  const header = '| Icon | Node Name | Type | Description | Auth |';
  const separator = '|:----:|-----------|:----:|-------------|:----:|';

  const rows = nodes.map(node => {
    const auth = node.requiresCredentials ? '✓' : '';
    const desc = node.description.length > 60
      ? node.description.substring(0, 57) + '...'
      : node.description;
    return `| ${node.categoryIcon} | ${node.name} | ${node.nodeTypeDisplay} | ${desc} | ${auth} |`;
  });

  return [header, separator, ...rows].join('\n');
}

/**
 * Generate full Markdown document
 */
function generateMarkdown(nodes) {
  const lines = [];

  // Header
  lines.push('# n8n Nodes Cheat Guide');
  lines.push('');
  lines.push(`> Generated on ${new Date().toISOString().split('T')[0]}`);
  lines.push(`> Total nodes: ${nodes.length}`);
  lines.push('');

  // Summary stats
  lines.push('## Summary');
  lines.push('');
  lines.push('| Category | Count |');
  lines.push('|----------|------:|');

  const categoryCounts = {};
  nodes.forEach(node => {
    categoryCounts[node.category] = (categoryCounts[node.category] || 0) + 1;
  });

  categoryOrder.forEach(cat => {
    if (categoryCounts[cat]) {
      lines.push(`| ${categoryEmojis[cat]} ${categoryDisplayNames[cat]} | ${categoryCounts[cat]} |`);
    }
  });
  lines.push(`| **Total** | **${nodes.length}** |`);
  lines.push('');

  // Legend
  lines.push('## Legend');
  lines.push('');
  lines.push('**Type:** Trigger = starts workflows, Action = runs within workflows');
  lines.push('');
  lines.push('**Auth:** ✓ = requires credentials/API keys');
  lines.push('');

  // Table of contents
  lines.push('## Table of Contents');
  lines.push('');
  categoryOrder.forEach(cat => {
    if (categoryCounts[cat]) {
      const anchor = categoryDisplayNames[cat].toLowerCase().replace(/\s+/g, '-');
      lines.push(`- [${categoryEmojis[cat]} ${categoryDisplayNames[cat]} (${categoryCounts[cat]})](#${anchor})`);
    }
  });
  lines.push('');
  lines.push('---');
  lines.push('');

  // Generate sections by category
  categoryOrder.forEach(cat => {
    const categoryNodes = nodes.filter(n => n.category === cat);
    if (categoryNodes.length === 0) return;

    lines.push(`## ${categoryEmojis[cat]} ${categoryDisplayNames[cat]}`);
    lines.push('');
    lines.push(`*${categoryNodes.length} nodes*`);
    lines.push('');
    lines.push(generateMarkdownTable(categoryNodes));
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  // Footer
  lines.push('## About');
  lines.push('');
  lines.push('This cheat guide was automatically generated from the n8n repository.');
  lines.push('');
  lines.push('- Source: `packages/nodes-base/nodes/`');
  lines.push('- All nodes listed are native n8n nodes');
  lines.push(`- Last updated: ${new Date().toISOString().split('T')[0]}`);

  return lines.join('\n');
}

/**
 * Generate a compact single-table Markdown version
 */
function generateMarkdownCompact(nodes) {
  const lines = [];

  lines.push('# n8n Nodes Quick Reference');
  lines.push('');
  lines.push(`> ${nodes.length} native nodes | Generated ${new Date().toISOString().split('T')[0]}`);
  lines.push('');

  // Category legend
  lines.push('**Categories:** ');
  lines.push(categoryOrder.map(cat => `${categoryEmojis[cat]} ${categoryDisplayNames[cat]}`).join(' | '));
  lines.push('');

  // Single large table
  const header = '| Cat | Node Name | Type | Description |';
  const separator = '|:---:|-----------|:----:|-------------|';

  lines.push(header);
  lines.push(separator);

  // Sort by category then name
  const sortedNodes = [...nodes].sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.name.localeCompare(b.name);
  });

  sortedNodes.forEach(node => {
    const desc = node.description.length > 50
      ? node.description.substring(0, 47) + '...'
      : node.description;
    lines.push(`| ${node.categoryIcon} | ${node.name} | ${node.nodeTypeDisplay} | ${desc} |`);
  });

  return lines.join('\n');
}

/**
 * Main generation function
 */
function generate() {
  console.log('Starting output generation...');
  console.log(`Processing ${normalizedData.nodes.length} nodes`);

  // Sort nodes by category then name
  const sortedNodes = [...normalizedData.nodes].sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.name.localeCompare(b.name);
  });

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate CSV
  console.log('\nGenerating CSV...');
  const csv = generateCSV(sortedNodes);
  const csvPath = path.join(outputDir, 'n8n-nodes-cheat-guide.csv');
  fs.writeFileSync(csvPath, csv, 'utf-8');
  console.log(`  Written: ${csvPath}`);

  // Generate full Markdown
  console.log('\nGenerating Markdown (full)...');
  const md = generateMarkdown(sortedNodes);
  const mdPath = path.join(outputDir, 'n8n-nodes-cheat-guide.md');
  fs.writeFileSync(mdPath, md, 'utf-8');
  console.log(`  Written: ${mdPath}`);

  // Generate compact Markdown
  console.log('\nGenerating Markdown (compact)...');
  const mdCompact = generateMarkdownCompact(sortedNodes);
  const mdCompactPath = path.join(outputDir, 'n8n-nodes-quick-reference.md');
  fs.writeFileSync(mdCompactPath, mdCompact, 'utf-8');
  console.log(`  Written: ${mdCompactPath}`);

  // Summary
  console.log('\n=== Generation Complete ===');
  console.log(`Total nodes: ${sortedNodes.length}`);
  console.log('\nFiles generated:');
  console.log(`  1. ${csvPath}`);
  console.log(`  2. ${mdPath}`);
  console.log(`  3. ${mdCompactPath}`);

  // Category breakdown
  console.log('\nCategory breakdown:');
  categoryOrder.forEach(cat => {
    const count = sortedNodes.filter(n => n.category === cat).length;
    if (count > 0) {
      console.log(`  ${categoryEmojis[cat]} ${categoryDisplayNames[cat]}: ${count}`);
    }
  });
}

// Run generation
generate();

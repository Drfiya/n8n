/**
 * Multi-Format Export Script
 *
 * Generates enhanced exports for:
 * - Notion-compatible CSV
 * - Enhanced Markdown with front matter and styling
 * - Google Sheets import-ready CSV
 */

const fs = require('fs');
const path = require('path');

const normalizedData = require('../data/normalized-nodes.json');

const categoryOrder = ['trigger', 'transform', 'input', 'output', 'organization'];
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
 * Escape CSV field
 */
function escapeCSV(str) {
  if (!str) return '';
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Generate Notion-compatible CSV
 * Notion expects specific column types
 */
function generateNotionCSV(nodes) {
  // Notion-friendly columns
  const header = [
    'Name',           // Title (primary)
    'Category',       // Select
    'Type',           // Select
    'Description',    // Text
    'Requires Auth',  // Checkbox (Yes/No for import)
    'Icon',           // Text (emoji)
    'Tags'            // Multi-select (category + type)
  ];

  const rows = nodes.map(node => {
    const tags = [node.categoryDisplay, node.nodeTypeDisplay];
    if (node.requiresCredentials) tags.push('Auth Required');
    if (!node.requiresCredentials) tags.push('No Auth');

    return [
      escapeCSV(node.name),
      escapeCSV(node.categoryDisplay),
      escapeCSV(node.nodeTypeDisplay),
      escapeCSV(node.description),
      node.requiresCredentials ? 'Yes' : 'No',
      node.categoryIcon,
      escapeCSV(tags.join(', '))
    ].join(',');
  });

  return [header.join(','), ...rows].join('\n');
}

/**
 * Generate Google Sheets-ready CSV with formulas reference
 */
function generateSheetsCSV(nodes) {
  const header = [
    'Icon',
    'Node Name',
    'Category',
    'Type',
    'Description',
    'Auth Required',
    'Icon File',
    'Category ID',
    'Is Trigger'
  ];

  const rows = nodes.map(node => [
    node.categoryIcon,
    escapeCSV(node.name),
    escapeCSV(node.categoryDisplay),
    escapeCSV(node.nodeTypeDisplay),
    escapeCSV(node.description),
    node.requiresCredentials ? 'TRUE' : 'FALSE',
    escapeCSV(node.iconFileName || ''),
    escapeCSV(node.category),
    node.nodeType === 'trigger' ? 'TRUE' : 'FALSE'
  ].join(','));

  return [header.join(','), ...rows].join('\n');
}

/**
 * Generate enhanced Markdown with YAML front matter
 */
function generateEnhancedMarkdown(nodes) {
  const lines = [];

  // YAML front matter
  lines.push('---');
  lines.push('title: "n8n Nodes Cheat Guide"');
  lines.push('description: "Complete reference guide for all native n8n workflow automation nodes"');
  lines.push(`date: "${new Date().toISOString().split('T')[0]}"`);
  lines.push('author: "Auto-generated from n8n repository"');
  lines.push(`total_nodes: ${nodes.length}`);
  lines.push('categories:');
  categoryOrder.forEach(cat => {
    const count = nodes.filter(n => n.category === cat).length;
    if (count > 0) {
      lines.push(`  - name: "${categoryDisplayNames[cat]}"`);
      lines.push(`    count: ${count}`);
      lines.push(`    icon: "${categoryEmojis[cat]}"`);
    }
  });
  lines.push('---');
  lines.push('');

  // Title and badges
  lines.push('# 📚 n8n Nodes Cheat Guide');
  lines.push('');
  lines.push('![Nodes](https://img.shields.io/badge/Nodes-434-blue)');
  lines.push('![Categories](https://img.shields.io/badge/Categories-5-green)');
  lines.push('![Native](https://img.shields.io/badge/Type-Native-orange)');
  lines.push('');

  // Quick stats
  lines.push('## 📊 Quick Stats');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Total Nodes | ${nodes.length} |`);
  lines.push(`| Trigger Nodes | ${nodes.filter(n => n.nodeType === 'trigger').length} |`);
  lines.push(`| Action Nodes | ${nodes.filter(n => n.nodeType === 'action').length} |`);
  lines.push(`| Auth Required | ${nodes.filter(n => n.requiresCredentials).length} |`);
  lines.push(`| No Auth Needed | ${nodes.filter(n => !n.requiresCredentials).length} |`);
  lines.push('');

  // Category overview
  lines.push('## 🗂️ Categories');
  lines.push('');
  categoryOrder.forEach(cat => {
    const count = nodes.filter(n => n.category === cat).length;
    if (count > 0) {
      const anchor = categoryDisplayNames[cat].toLowerCase().replace(/\s+/g, '-');
      lines.push(`- [${categoryEmojis[cat]} ${categoryDisplayNames[cat]}](#${anchor}) (${count} nodes)`);
    }
  });
  lines.push('');

  // Legend
  lines.push('## 📖 Legend');
  lines.push('');
  lines.push('| Symbol | Meaning |');
  lines.push('|--------|---------|');
  lines.push('| ⚡ | Trigger node (starts workflows) |');
  lines.push('| 🔄 | Data Transformation |');
  lines.push('| 📥 | Data Source (input) |');
  lines.push('| 📤 | Data Destination (output) |');
  lines.push('| 🗂️ | Flow Control |');
  lines.push('| ✓ | Requires authentication |');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Node tables by category
  categoryOrder.forEach(cat => {
    const categoryNodes = nodes.filter(n => n.category === cat);
    if (categoryNodes.length === 0) return;

    lines.push(`## ${categoryEmojis[cat]} ${categoryDisplayNames[cat]}`);
    lines.push('');
    lines.push(`> ${categoryNodes.length} nodes in this category`);
    lines.push('');

    // Split into triggers and actions if mixed
    const triggers = categoryNodes.filter(n => n.nodeType === 'trigger');
    const actions = categoryNodes.filter(n => n.nodeType === 'action');

    if (triggers.length > 0 && actions.length > 0) {
      lines.push('### Triggers');
      lines.push('');
      lines.push(generateTable(triggers));
      lines.push('');
      lines.push('### Actions');
      lines.push('');
      lines.push(generateTable(actions));
    } else {
      lines.push(generateTable(categoryNodes));
    }

    lines.push('');
    lines.push('[⬆ Back to top](#-n8n-nodes-cheat-guide)');
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  // Alphabetical index
  lines.push('## 🔤 Alphabetical Index');
  lines.push('');
  lines.push('<details>');
  lines.push('<summary>Click to expand full alphabetical list</summary>');
  lines.push('');

  const sortedNodes = [...nodes].sort((a, b) => a.name.localeCompare(b.name));
  let currentLetter = '';

  sortedNodes.forEach(node => {
    const firstLetter = node.name.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      lines.push(`\n**${currentLetter}**`);
    }
    const auth = node.requiresCredentials ? ' 🔐' : '';
    lines.push(`- ${node.categoryIcon} ${node.name}${auth}`);
  });

  lines.push('');
  lines.push('</details>');
  lines.push('');

  // Footer
  lines.push('---');
  lines.push('');
  lines.push('## 📝 About This Guide');
  lines.push('');
  lines.push('This cheat guide was automatically generated from the [n8n repository](https://github.com/n8n-io/n8n).');
  lines.push('');
  lines.push('**Source:** `packages/nodes-base/nodes/`');
  lines.push('');
  lines.push(`**Generated:** ${new Date().toISOString().split('T')[0]}`);
  lines.push('');
  lines.push('**License:** [Fair-code](https://github.com/n8n-io/n8n/blob/master/LICENSE.md)');

  return lines.join('\n');
}

function generateTable(nodes) {
  const lines = [];
  lines.push('| Node | Description | Auth |');
  lines.push('|------|-------------|:----:|');

  nodes.forEach(node => {
    const desc = node.description.length > 55
      ? node.description.substring(0, 52) + '...'
      : node.description;
    const auth = node.requiresCredentials ? '✓' : '';
    lines.push(`| ${node.name} | ${desc} | ${auth} |`);
  });

  return lines.join('\n');
}

/**
 * Generate Google Sheets setup instructions
 */
function generateSheetsGuide() {
  return `# Google Sheets Setup Guide

## Importing the Cheat Guide

### Step 1: Import CSV
1. Open Google Sheets
2. Go to **File > Import**
3. Select **Upload** and choose \`n8n-nodes-sheets.csv\`
4. Import settings:
   - Import location: **Create new spreadsheet**
   - Separator type: **Comma**
   - Convert text to numbers: **No**

### Step 2: Apply Formatting

#### Header Row
1. Select Row 1
2. **Format > Text > Bold**
3. **View > Freeze > 1 row**
4. Background color: \`#4285f4\` (Google Blue)
5. Text color: White

#### Column Widths
| Column | Width |
|--------|-------|
| A (Icon) | 40px |
| B (Name) | 200px |
| C (Category) | 150px |
| D (Type) | 80px |
| E (Description) | 300px |
| F (Auth) | 60px |

### Step 3: Add Filters
1. Select all data (Ctrl+A)
2. **Data > Create a filter**

### Step 4: Conditional Formatting

#### Color by Category
1. Select column C (Category)
2. **Format > Conditional formatting**
3. Add rules:

| Category | Background Color |
|----------|-----------------|
| Triggers | \`#fff2cc\` (Light Yellow) |
| Data Transformation | \`#d9ead3\` (Light Green) |
| Data Sources | \`#cfe2f3\` (Light Blue) |
| Data Destinations | \`#f4cccc\` (Light Red) |
| Flow Control | \`#d9d2e9\` (Light Purple) |

#### Highlight Auth Required
1. Select column F
2. Add rule: Text is exactly "TRUE" → Background \`#ea9999\`

### Step 5: Add Data Validation (Optional)

#### Category Dropdown
1. Select column C (excluding header)
2. **Data > Data validation**
3. Criteria: List of items
4. Values: \`Triggers,Data Transformation,Data Sources,Data Destinations,Flow Control\`

### Step 6: Create Dashboard Tab

Add a new sheet called "Dashboard" with these formulas:

\`\`\`
=COUNTA(Sheet1!B:B)-1                    // Total nodes
=COUNTIF(Sheet1!C:C,"Triggers")          // Trigger count
=COUNTIF(Sheet1!F:F,"TRUE")              // Auth required count
=COUNTIF(Sheet1!D:D,"Trigger")           // Trigger type count
\`\`\`

### Useful Formulas

\`\`\`
// Count nodes by category
=COUNTIF(C:C,"Data Transformation")

// Find nodes without auth
=FILTER(B:B,F:F="FALSE")

// Search for node by name
=FILTER(B:E,REGEXMATCH(B:B,"(?i)slack"))
\`\`\`

## Template Features

The imported sheet includes:
- **Icon** - Category emoji for quick visual reference
- **Node Name** - Official n8n node name
- **Category** - Functional category
- **Type** - Trigger or Action
- **Description** - Brief description
- **Auth Required** - TRUE/FALSE for filtering
- **Icon File** - Original icon filename
- **Category ID** - Machine-readable category
- **Is Trigger** - TRUE/FALSE boolean

## Tips

1. Use **Filter views** to save common queries
2. Create **Named ranges** for dashboard formulas
3. Share with "View only" to prevent accidental edits
4. Export to Excel if needed: **File > Download > .xlsx**
`;
}

/**
 * Main export function
 */
function exportAll() {
  console.log('Starting multi-format export...');

  // Sort nodes
  const sortedNodes = [...normalizedData.nodes].sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.name.localeCompare(b.name);
  });

  const outputDir = path.join(__dirname, '../output');

  // 1. Notion CSV
  console.log('\n1. Generating Notion-compatible CSV...');
  const notionCSV = generateNotionCSV(sortedNodes);
  fs.writeFileSync(path.join(outputDir, 'n8n-nodes-notion.csv'), notionCSV, 'utf-8');
  console.log('   Written: n8n-nodes-notion.csv');

  // 2. Google Sheets CSV
  console.log('\n2. Generating Google Sheets CSV...');
  const sheetsCSV = generateSheetsCSV(sortedNodes);
  fs.writeFileSync(path.join(outputDir, 'n8n-nodes-sheets.csv'), sheetsCSV, 'utf-8');
  console.log('   Written: n8n-nodes-sheets.csv');

  // 3. Enhanced Markdown
  console.log('\n3. Generating enhanced Markdown...');
  const enhancedMD = generateEnhancedMarkdown(sortedNodes);
  fs.writeFileSync(path.join(outputDir, 'n8n-nodes-cheat-guide-enhanced.md'), enhancedMD, 'utf-8');
  console.log('   Written: n8n-nodes-cheat-guide-enhanced.md');

  // 4. Google Sheets Guide
  console.log('\n4. Generating Google Sheets setup guide...');
  const sheetsGuide = generateSheetsGuide();
  fs.writeFileSync(path.join(outputDir, 'google-sheets-setup.md'), sheetsGuide, 'utf-8');
  console.log('   Written: google-sheets-setup.md');

  console.log('\n=== Export Complete ===');
  console.log(`Total nodes exported: ${sortedNodes.length}`);
  console.log('\nFiles generated:');
  console.log('  1. n8n-nodes-notion.csv      - Notion database import');
  console.log('  2. n8n-nodes-sheets.csv      - Google Sheets import');
  console.log('  3. n8n-nodes-cheat-guide-enhanced.md - Rich Markdown');
  console.log('  4. google-sheets-setup.md    - Sheets configuration guide');
}

// Run export
exportAll();

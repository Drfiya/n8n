/**
 * Icon Inventory Script
 *
 * Catalogs all icon references found in normalized data
 * Identifies patterns: URLs, file paths, icon names, formats
 */

const fs = require('fs');
const path = require('path');

const normalizedData = require('../data/normalized-nodes.json');

// Collect icon data
const iconStats = {
  totalNodes: normalizedData.nodes.length,
  withIcons: 0,
  withoutIcons: 0,
  withDarkMode: 0,
  byFormat: {},
  byExtension: {},
  uniqueIcons: new Set(),
  uniqueDarkIcons: new Set(),
  iconsByCategory: {},
  iconsByNode: []
};

normalizedData.nodes.forEach(node => {
  if (node.icon) {
    iconStats.withIcons++;

    // Extract format (file: prefix)
    const format = node.icon.startsWith('file:') ? 'file' : 'other';
    iconStats.byFormat[format] = (iconStats.byFormat[format] || 0) + 1;

    // Extract extension
    const ext = node.iconFileName ? path.extname(node.iconFileName).toLowerCase() : 'unknown';
    iconStats.byExtension[ext] = (iconStats.byExtension[ext] || 0) + 1;

    // Track unique icons
    iconStats.uniqueIcons.add(node.iconFileName);

    // Track dark mode icons
    if (node.hasLightDarkIcons) {
      iconStats.withDarkMode++;
      const darkFileName = node.iconDark ? node.iconDark.replace('file:', '') : null;
      if (darkFileName) iconStats.uniqueDarkIcons.add(darkFileName);
    }

    // Icons by category
    if (!iconStats.iconsByCategory[node.category]) {
      iconStats.iconsByCategory[node.category] = { total: 0, unique: new Set() };
    }
    iconStats.iconsByCategory[node.category].total++;
    iconStats.iconsByCategory[node.category].unique.add(node.iconFileName);

    // Store individual icon info
    iconStats.iconsByNode.push({
      nodeId: node.id,
      nodeName: node.name,
      category: node.category,
      icon: node.icon,
      iconDark: node.iconDark,
      iconFileName: node.iconFileName,
      hasLightDarkIcons: node.hasLightDarkIcons
    });
  } else {
    iconStats.withoutIcons++;
  }
});

// Build output
const inventory = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalNodes: iconStats.totalNodes,
    nodesWithIcons: iconStats.withIcons,
    nodesWithoutIcons: iconStats.withoutIcons,
    nodesWithDarkModeIcons: iconStats.withDarkMode,
    uniqueIconFiles: iconStats.uniqueIcons.size,
    uniqueDarkIconFiles: iconStats.uniqueDarkIcons.size
  },
  byFormat: iconStats.byFormat,
  byExtension: iconStats.byExtension,
  byCategory: Object.fromEntries(
    Object.entries(iconStats.iconsByCategory).map(([cat, data]) => [
      cat,
      { totalNodes: data.total, uniqueIcons: data.unique.size }
    ])
  ),
  uniqueIcons: Array.from(iconStats.uniqueIcons).sort(),
  uniqueDarkIcons: Array.from(iconStats.uniqueDarkIcons).sort(),
  nodeIconMapping: iconStats.iconsByNode
};

// Write output
const outputPath = path.join(__dirname, '../data/icon-inventory.json');
fs.writeFileSync(outputPath, JSON.stringify(inventory, null, 2));

console.log('Icon Inventory Generated');
console.log('========================');
console.log(`Output: ${outputPath}`);
console.log('');
console.log('=== Summary ===');
console.log(`Total nodes: ${inventory.summary.totalNodes}`);
console.log(`Nodes with icons: ${inventory.summary.nodesWithIcons}`);
console.log(`Nodes without icons: ${inventory.summary.nodesWithoutIcons}`);
console.log(`Nodes with dark mode icons: ${inventory.summary.nodesWithDarkModeIcons}`);
console.log(`Unique icon files: ${inventory.summary.uniqueIconFiles}`);
console.log(`Unique dark icon files: ${inventory.summary.uniqueDarkIconFiles}`);
console.log('');
console.log('=== By Format ===');
Object.entries(inventory.byFormat).forEach(([fmt, count]) => {
  console.log(`  ${fmt}: ${count}`);
});
console.log('');
console.log('=== By Extension ===');
Object.entries(inventory.byExtension)
  .sort((a, b) => b[1] - a[1])
  .forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count}`);
  });
console.log('');
console.log('=== By Category ===');
Object.entries(inventory.byCategory)
  .sort((a, b) => b[1].totalNodes - a[1].totalNodes)
  .forEach(([cat, data]) => {
    console.log(`  ${cat}: ${data.totalNodes} nodes, ${data.uniqueIcons} unique icons`);
  });

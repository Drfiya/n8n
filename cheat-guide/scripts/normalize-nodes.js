/**
 * Node Normalization Script
 *
 * Transforms raw-nodes.json into normalized-nodes.json with:
 * - Standardized categories from taxonomy
 * - Classification (native/community)
 * - Node type (trigger/action)
 * - Functional category (utility/integration)
 * - Normalized icon references
 */

const fs = require('fs');
const path = require('path');

// Load raw data and taxonomy
const rawData = require('../data/raw-nodes.json');
const taxonomy = require('../data/category-taxonomy.json');

// Category display name mapping
const categoryDisplayNames = {
  trigger: 'Triggers',
  transform: 'Data Transformation',
  input: 'Data Sources',
  output: 'Data Destinations',
  organization: 'Flow Control',
  schedule: 'Scheduling'
};

// Category icons
const categoryIcons = {
  trigger: '⚡',
  transform: '🔄',
  input: '📥',
  output: '📤',
  organization: '🗂️',
  schedule: '⏰'
};

/**
 * Normalize a single node
 */
function normalizeNode(rawNode) {
  // Determine primary category from first group
  const primaryGroup = rawNode.group[0] || 'transform';

  // Determine node type
  const nodeType = rawNode.isTrigger ? 'trigger' : 'action';

  // Determine functional category
  const hasCredentials = rawNode.credentials && rawNode.credentials.length > 0;
  const functionalCategory = hasCredentials ? 'integration' : 'utility';

  // Normalize icon reference
  let iconRef;
  let iconDarkRef = null;

  if (typeof rawNode.icon === 'string') {
    iconRef = rawNode.icon;
  } else if (rawNode.icon && typeof rawNode.icon === 'object') {
    iconRef = rawNode.icon.light;
    iconDarkRef = rawNode.icon.dark;
  } else {
    iconRef = null;
  }

  // Extract icon filename for easier reference
  const iconFileName = iconRef ? iconRef.replace('file:', '') : null;

  return {
    // Core identifiers
    id: rawNode.name,
    name: rawNode.displayName,
    description: rawNode.description,

    // Categories
    category: primaryGroup,
    categoryDisplay: categoryDisplayNames[primaryGroup] || primaryGroup,
    categoryIcon: categoryIcons[primaryGroup] || '📦',
    allGroups: rawNode.group,

    // Classification
    classification: 'native', // All nodes from nodes-base are native
    nodeType: nodeType,
    nodeTypeDisplay: nodeType === 'trigger' ? 'Trigger' : 'Action',
    functionalCategory: functionalCategory,
    functionalCategoryDisplay: functionalCategory === 'utility' ? 'Utility' : 'Integration',

    // Version info
    version: rawNode.version,
    isVersioned: rawNode.isVersioned,
    defaultVersion: rawNode.defaultVersion,

    // Icon info
    icon: iconRef,
    iconDark: iconDarkRef,
    iconFileName: iconFileName,
    hasLightDarkIcons: iconDarkRef !== null,

    // Credentials
    credentials: rawNode.credentials || [],
    requiresCredentials: hasCredentials,

    // Source info
    filePath: rawNode.filePath,
    nodeDirectory: rawNode.nodeDirectory
  };
}

/**
 * Main normalization process
 */
function normalize() {
  console.log('Starting normalization...');
  console.log(`Processing ${rawData.nodes.length} nodes`);

  const normalizedNodes = rawData.nodes.map(normalizeNode);

  // Calculate statistics
  const stats = {
    total: normalizedNodes.length,
    byCategory: {},
    byNodeType: { trigger: 0, action: 0 },
    byFunctionalCategory: { utility: 0, integration: 0 },
    byClassification: { native: 0, community: 0 },
    withDarkModeIcons: 0,
    versioned: 0
  };

  normalizedNodes.forEach(node => {
    // Category stats
    stats.byCategory[node.category] = (stats.byCategory[node.category] || 0) + 1;

    // Node type stats
    stats.byNodeType[node.nodeType]++;

    // Functional category stats
    stats.byFunctionalCategory[node.functionalCategory]++;

    // Classification stats
    stats.byClassification[node.classification]++;

    // Icon stats
    if (node.hasLightDarkIcons) stats.withDarkModeIcons++;

    // Version stats
    if (node.isVersioned) stats.versioned++;
  });

  // Sort nodes alphabetically by name
  normalizedNodes.sort((a, b) => a.name.localeCompare(b.name));

  const output = {
    metadata: {
      normalizedAt: new Date().toISOString(),
      sourceFile: 'raw-nodes.json',
      taxonomyVersion: taxonomy.version,
      totalNodes: normalizedNodes.length
    },
    statistics: stats,
    nodes: normalizedNodes
  };

  // Write output
  const outputPath = path.join(__dirname, '../data/normalized-nodes.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log('\nNormalization complete!');
  console.log(`Output written to: ${outputPath}`);
  console.log('\n=== Statistics ===');
  console.log(`Total nodes: ${stats.total}`);
  console.log('\nBy Category:');
  Object.entries(stats.byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${categoryDisplayNames[cat] || cat}: ${count}`));
  console.log('\nBy Node Type:');
  console.log(`  Triggers: ${stats.byNodeType.trigger}`);
  console.log(`  Actions: ${stats.byNodeType.action}`);
  console.log('\nBy Functional Category:');
  console.log(`  Utility: ${stats.byFunctionalCategory.utility}`);
  console.log(`  Integration: ${stats.byFunctionalCategory.integration}`);
  console.log('\nOther:');
  console.log(`  With dark mode icons: ${stats.withDarkModeIcons}`);
  console.log(`  Versioned nodes: ${stats.versioned}`);

  return output;
}

// Run normalization
normalize();

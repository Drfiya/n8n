const data = require('../data/raw-nodes.json');

const groups = {};
const nodeTypes = { trigger: 0, action: 0 };
const iconFormats = { string: 0, object: 0 };
const versionInfo = { versioned: 0, nonVersioned: 0 };
const credentialCounts = { withCredentials: 0, noCredentials: 0 };

data.nodes.forEach(node => {
  node.group.forEach(g => {
    groups[g] = (groups[g] || 0) + 1;
  });

  if (node.isTrigger) nodeTypes.trigger++;
  else nodeTypes.action++;

  if (typeof node.icon === 'string') iconFormats.string++;
  else if (node.icon) iconFormats.object++;

  if (node.isVersioned) versionInfo.versioned++;
  else versionInfo.nonVersioned++;

  if (node.credentials && node.credentials.length > 0) credentialCounts.withCredentials++;
  else credentialCounts.noCredentials++;
});

console.log('=== Group Distribution ===');
Object.entries(groups).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => console.log(`${k}: ${v}`));

console.log('\n=== Node Types ===');
console.log(JSON.stringify(nodeTypes, null, 2));

console.log('\n=== Icon Formats ===');
console.log(JSON.stringify(iconFormats, null, 2));

console.log('\n=== Version Info ===');
console.log(JSON.stringify(versionInfo, null, 2));

console.log('\n=== Credentials ===');
console.log(JSON.stringify(credentialCounts, null, 2));

// Sample nodes by directory to understand structure
const directories = {};
data.nodes.forEach(node => {
  const dir = node.nodeDirectory.split('/')[0];
  if (!directories[dir]) directories[dir] = [];
  directories[dir].push(node.displayName);
});

console.log('\n=== Total Unique Node Directories ===');
console.log(Object.keys(directories).length);

// Show some utility/core nodes (no credentials = likely core utilities)
console.log('\n=== Utility/Core Nodes (no credentials) ===');
const utilityNodes = data.nodes
  .filter(n => !n.credentials || n.credentials.length === 0)
  .map(n => n.displayName)
  .sort();
console.log(utilityNodes.join('\n'));

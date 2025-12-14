/**
 * n8n Node Metadata Extraction Script
 *
 * Extracts metadata from all n8n node definition files.
 * Run with: node scripts/extract-nodes.js
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const NODES_BASE_PATH = path.resolve(__dirname, '../../packages/nodes-base/nodes');
const OUTPUT_PATH = path.resolve(__dirname, '../data/raw-nodes.json');

/**
 * Check if a file is a version-specific implementation (not entry point)
 */
function isVersionImplementation(filePath) {
    // Match patterns like /V1/, /V2/, /v1/, /v2/ in path
    return /[\/\\][Vv]\d+[\/\\]/.test(filePath);
}

/**
 * Extract string value from a property assignment
 */
function extractStringValue(content, propertyName) {
    // Match: propertyName: 'value' or propertyName: "value"
    const regex = new RegExp(`${propertyName}:\\s*['"\`]([^'"\`]+)['"\`]`, 's');
    const match = content.match(regex);
    return match ? match[1] : null;
}

/**
 * Extract array value from a property assignment
 */
function extractArrayValue(content, propertyName) {
    // Match: propertyName: ['value1', 'value2']
    const regex = new RegExp(`${propertyName}:\\s*\\[([^\\]]+)\\]`, 's');
    const match = content.match(regex);
    if (!match) return null;

    // Extract string values from array
    const arrayContent = match[1];
    const values = arrayContent.match(/['"]([^'"]+)['"]/g);
    return values ? values.map(v => v.replace(/['"]/g, '')) : [];
}

/**
 * Extract numeric value from a property assignment
 */
function extractNumericValue(content, propertyName) {
    // Match: propertyName: 1.5 or propertyName: 2
    const regex = new RegExp(`${propertyName}:\\s*([\\d.]+)`, 's');
    const match = content.match(regex);
    return match ? parseFloat(match[1]) : null;
}

/**
 * Extract version value (can be number or array)
 */
function extractVersionValue(content) {
    // Try array first: version: [1, 2, 3]
    const arrayMatch = content.match(/version:\s*\[([\d.,\s]+)\]/s);
    if (arrayMatch) {
        return arrayMatch[1].split(',').map(v => parseFloat(v.trim()));
    }

    // Try single number: version: 1
    return extractNumericValue(content, 'version');
}

/**
 * Extract icon value (can be string or object)
 */
function extractIconValue(content) {
    // Try object format: icon: { light: 'file:x.svg', dark: 'file:y.svg' }
    const objectMatch = content.match(/icon:\s*\{\s*light:\s*['"]([^'"]+)['"]\s*,\s*dark:\s*['"]([^'"]+)['"]\s*\}/s);
    if (objectMatch) {
        return { light: objectMatch[1], dark: objectMatch[2] };
    }

    // Try string format: icon: 'file:x.svg'
    return extractStringValue(content, 'icon');
}

/**
 * Extract credentials array
 */
function extractCredentials(content) {
    // Match credentials array with name properties
    const credentialsMatch = content.match(/credentials:\s*\[([\s\S]*?)\]/);
    if (!credentialsMatch) return null;

    const credContent = credentialsMatch[1];
    const names = credContent.match(/name:\s*['"]([^'"]+)['"]/g);
    return names ? names.map(n => n.match(/['"]([^'"]+)['"]/)[1]) : [];
}

/**
 * Extract metadata from a node file
 */
function extractNodeMetadata(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(NODES_BASE_PATH, filePath).replace(/\\/g, '/');

    // Determine if it's a VersionedNodeType or regular INodeType
    const isVersioned = content.includes('extends VersionedNodeType') ||
                        content.includes('VersionedNodeType {');

    let descriptionBlock;

    if (isVersioned) {
        // Extract baseDescription for VersionedNodeType
        const baseDescMatch = content.match(/baseDescription[:\s]*(?:INodeTypeBaseDescription\s*=\s*)?\{([\s\S]*?)\};/);
        if (baseDescMatch) {
            descriptionBlock = baseDescMatch[1];
        }
    } else {
        // Extract description for regular INodeType
        const descMatch = content.match(/description[:\s]*(?:INodeTypeDescription\s*=\s*)?\{([\s\S]*?)\n\t\};|\n\s\s\};/);
        if (descMatch) {
            descriptionBlock = descMatch[1];
        }

        // Fallback: try to find description block more broadly
        if (!descriptionBlock) {
            const fallbackMatch = content.match(/description:\s*INodeTypeDescription\s*=\s*\{([\s\S]*?)\n\s+\};/);
            if (fallbackMatch) {
                descriptionBlock = fallbackMatch[1];
            }
        }
    }

    if (!descriptionBlock) {
        // Try one more pattern for simple nodes
        const simpleMatch = content.match(/description\s*=\s*\{([\s\S]*?)\n\t\};/);
        if (simpleMatch) {
            descriptionBlock = simpleMatch[1];
        }
    }

    if (!descriptionBlock) {
        console.warn(`Could not extract description from: ${relativePath}`);
        return null;
    }

    const displayName = extractStringValue(descriptionBlock, 'displayName');
    const name = extractStringValue(descriptionBlock, 'name');
    const description = extractStringValue(descriptionBlock, 'description');
    const group = extractArrayValue(descriptionBlock, 'group');
    const icon = extractIconValue(descriptionBlock);
    const version = extractVersionValue(descriptionBlock);
    const defaultVersion = extractNumericValue(descriptionBlock, 'defaultVersion');
    const credentials = extractCredentials(descriptionBlock);

    // Determine if it's a trigger
    const isTrigger = group ? group.includes('trigger') : false;

    // Get node directory for icon path resolution
    const nodeDir = path.dirname(relativePath);

    return {
        name: name || path.basename(filePath, '.node.ts').toLowerCase(),
        displayName: displayName || path.basename(filePath, '.node.ts'),
        description: description || '',
        group: group || [],
        icon: icon,
        version: version,
        defaultVersion: defaultVersion,
        credentials: credentials,
        isTrigger: isTrigger,
        isVersioned: isVersioned,
        filePath: `packages/nodes-base/nodes/${relativePath}`,
        nodeDirectory: nodeDir,
    };
}

/**
 * Main extraction function
 */
async function extractAllNodes() {
    console.log('Starting node metadata extraction...');
    console.log(`Scanning: ${NODES_BASE_PATH}\n`);

    // Find all .node.ts files
    const pattern = path.join(NODES_BASE_PATH, '**/*.node.ts').replace(/\\/g, '/');
    const allFiles = await glob(pattern);

    console.log(`Found ${allFiles.length} total .node.ts files`);

    // Filter to entry-point nodes only (exclude version implementations)
    const entryPointFiles = allFiles.filter(f => !isVersionImplementation(f));

    console.log(`Filtered to ${entryPointFiles.length} entry-point nodes\n`);

    const nodes = [];
    const errors = [];

    for (const filePath of entryPointFiles) {
        try {
            const metadata = extractNodeMetadata(filePath);
            if (metadata) {
                nodes.push(metadata);
            } else {
                errors.push({ file: filePath, error: 'Could not extract metadata' });
            }
        } catch (err) {
            errors.push({ file: filePath, error: err.message });
        }
    }

    // Sort by displayName
    nodes.sort((a, b) => a.displayName.localeCompare(b.displayName));

    // Write output
    const output = {
        extractedAt: new Date().toISOString(),
        totalNodes: nodes.length,
        triggerNodes: nodes.filter(n => n.isTrigger).length,
        actionNodes: nodes.filter(n => !n.isTrigger).length,
        versionedNodes: nodes.filter(n => n.isVersioned).length,
        nodes: nodes,
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

    console.log('=== Extraction Complete ===');
    console.log(`Total nodes extracted: ${nodes.length}`);
    console.log(`  - Trigger nodes: ${output.triggerNodes}`);
    console.log(`  - Action nodes: ${output.actionNodes}`);
    console.log(`  - Versioned nodes: ${output.versionedNodes}`);
    console.log(`\nOutput written to: ${OUTPUT_PATH}`);

    if (errors.length > 0) {
        console.log(`\nWarnings (${errors.length} files had issues):`);
        errors.slice(0, 10).forEach(e => {
            console.log(`  - ${path.basename(e.file)}: ${e.error}`);
        });
        if (errors.length > 10) {
            console.log(`  ... and ${errors.length - 10} more`);
        }
    }

    return output;
}

// Run extraction
extractAllNodes().catch(console.error);

/**
 * Validation Script
 *
 * Validates the generated cheat guide outputs for:
 * - Completeness: All nodes from normalized data appear in outputs
 * - Consistency: No empty fields, valid categories, no duplicates
 */

const fs = require('fs');
const path = require('path');

const normalizedData = require('../data/normalized-nodes.json');
const taxonomy = require('../data/category-taxonomy.json');

// Valid categories
const validCategories = ['trigger', 'transform', 'input', 'output', 'organization'];
const validNodeTypes = ['trigger', 'action'];

// Results container
const results = {
  timestamp: new Date().toISOString(),
  completeness: {
    passed: true,
    totalExpected: 0,
    totalInMarkdown: 0,
    totalInCSV: 0,
    missingFromMarkdown: [],
    missingFromCSV: [],
    extraInMarkdown: [],
    extraInCSV: []
  },
  consistency: {
    passed: true,
    issues: []
  },
  dataQuality: {
    passed: true,
    emptyFields: [],
    invalidCategories: [],
    duplicates: [],
    longDescriptions: []
  },
  summary: {
    totalChecks: 0,
    passedChecks: 0,
    failedChecks: 0,
    warnings: 0
  }
};

/**
 * Parse CSV file and extract node names
 */
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  const nodes = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const match = lines[i].match(/^[^,]*,"([^"]+)"/);
    if (match) {
      nodes.push(match[1]);
    }
  }

  return nodes;
}

/**
 * Parse Markdown file and extract node names from tables
 */
function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const nodes = [];

  // Match table rows: | icon | Name | ...
  const tableRowRegex = /\|\s*[^\|]+\s*\|\s*([^\|]+)\s*\|/g;
  let match;

  while ((match = tableRowRegex.exec(content)) !== null) {
    const name = match[1].trim();
    // Skip header rows and separators
    if (name && !name.includes('---') && name !== 'Node Name' && name !== 'Cat') {
      nodes.push(name);
    }
  }

  return nodes;
}

/**
 * Check completeness
 */
function validateCompleteness() {
  console.log('\n=== Completeness Validation ===\n');

  const expectedNodes = normalizedData.nodes.map(n => n.name);
  results.completeness.totalExpected = expectedNodes.length;

  // Check CSV
  const csvPath = path.join(__dirname, '../output/n8n-nodes-cheat-guide.csv');
  if (fs.existsSync(csvPath)) {
    const csvNodes = parseCSV(csvPath);
    results.completeness.totalInCSV = csvNodes.length;

    // Find missing
    expectedNodes.forEach(name => {
      if (!csvNodes.includes(name)) {
        results.completeness.missingFromCSV.push(name);
      }
    });

    // Find extra
    csvNodes.forEach(name => {
      if (!expectedNodes.includes(name)) {
        results.completeness.extraInCSV.push(name);
      }
    });

    console.log(`CSV: ${csvNodes.length}/${expectedNodes.length} nodes`);
    if (results.completeness.missingFromCSV.length > 0) {
      console.log(`  Missing: ${results.completeness.missingFromCSV.length}`);
      results.completeness.passed = false;
    }
  }

  // Check Markdown
  const mdPath = path.join(__dirname, '../output/n8n-nodes-cheat-guide.md');
  if (fs.existsSync(mdPath)) {
    const mdNodes = parseMarkdown(mdPath);
    results.completeness.totalInMarkdown = mdNodes.length;

    // Find missing
    expectedNodes.forEach(name => {
      if (!mdNodes.includes(name)) {
        results.completeness.missingFromMarkdown.push(name);
      }
    });

    console.log(`Markdown: ${mdNodes.length}/${expectedNodes.length} nodes`);
    if (results.completeness.missingFromMarkdown.length > 0) {
      console.log(`  Missing: ${results.completeness.missingFromMarkdown.length}`);
      results.completeness.passed = false;
    }
  }

  results.summary.totalChecks += 2;
  if (results.completeness.passed) {
    results.summary.passedChecks += 2;
    console.log('\n✓ Completeness: PASSED');
  } else {
    results.summary.failedChecks += 2;
    console.log('\n✗ Completeness: FAILED');
  }
}

/**
 * Check data consistency
 */
function validateConsistency() {
  console.log('\n=== Consistency Validation ===\n');

  normalizedData.nodes.forEach(node => {
    // Check for empty required fields
    if (!node.name || node.name.trim() === '') {
      results.dataQuality.emptyFields.push({ node: node.id, field: 'name' });
    }
    if (!node.description || node.description.trim() === '') {
      results.dataQuality.emptyFields.push({ node: node.id, field: 'description' });
    }
    if (!node.category) {
      results.dataQuality.emptyFields.push({ node: node.id, field: 'category' });
    }

    // Check for valid category
    if (node.category && !validCategories.includes(node.category)) {
      results.dataQuality.invalidCategories.push({
        node: node.name,
        category: node.category
      });
    }

    // Check for valid node type
    if (node.nodeType && !validNodeTypes.includes(node.nodeType)) {
      results.consistency.issues.push({
        type: 'invalid_node_type',
        node: node.name,
        value: node.nodeType
      });
    }

    // Check for very long descriptions (might cause display issues)
    if (node.description && node.description.length > 200) {
      results.dataQuality.longDescriptions.push({
        node: node.name,
        length: node.description.length
      });
    }
  });

  // Check for duplicates
  const names = normalizedData.nodes.map(n => n.name);
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicates.length > 0) {
    results.dataQuality.duplicates = [...new Set(duplicates)];
  }

  // Check for duplicate IDs
  const ids = normalizedData.nodes.map(n => n.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    results.consistency.issues.push({
      type: 'duplicate_ids',
      ids: [...new Set(duplicateIds)]
    });
  }

  // Report results
  console.log(`Empty fields: ${results.dataQuality.emptyFields.length}`);
  console.log(`Invalid categories: ${results.dataQuality.invalidCategories.length}`);
  console.log(`Duplicate names: ${results.dataQuality.duplicates.length}`);
  console.log(`Long descriptions (>200 chars): ${results.dataQuality.longDescriptions.length}`);
  console.log(`Other consistency issues: ${results.consistency.issues.length}`);

  results.summary.totalChecks += 5;

  if (results.dataQuality.emptyFields.length === 0) results.summary.passedChecks++;
  else results.summary.failedChecks++;

  if (results.dataQuality.invalidCategories.length === 0) results.summary.passedChecks++;
  else results.summary.failedChecks++;

  if (results.dataQuality.duplicates.length === 0) results.summary.passedChecks++;
  else results.summary.failedChecks++;

  if (results.consistency.issues.length === 0) results.summary.passedChecks++;
  else results.summary.failedChecks++;

  // Long descriptions are warnings, not failures
  if (results.dataQuality.longDescriptions.length > 0) {
    results.summary.warnings += results.dataQuality.longDescriptions.length;
  }
  results.summary.passedChecks++; // Long descriptions don't fail

  const hasIssues = results.dataQuality.emptyFields.length > 0 ||
                    results.dataQuality.invalidCategories.length > 0 ||
                    results.dataQuality.duplicates.length > 0 ||
                    results.consistency.issues.length > 0;

  if (hasIssues) {
    results.dataQuality.passed = false;
    results.consistency.passed = false;
    console.log('\n✗ Consistency: FAILED');
  } else {
    console.log('\n✓ Consistency: PASSED');
  }
}

/**
 * Additional quality checks
 */
function validateQuality() {
  console.log('\n=== Quality Checks ===\n');

  const checks = [];

  // Check category distribution
  const categoryDist = {};
  normalizedData.nodes.forEach(n => {
    categoryDist[n.category] = (categoryDist[n.category] || 0) + 1;
  });

  console.log('Category distribution:');
  Object.entries(categoryDist).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
    checks.push({ check: `category_${cat}`, count });
  });

  // Check trigger vs action distribution
  const typeDist = { trigger: 0, action: 0 };
  normalizedData.nodes.forEach(n => {
    typeDist[n.nodeType]++;
  });

  console.log('\nNode type distribution:');
  console.log(`  Triggers: ${typeDist.trigger}`);
  console.log(`  Actions: ${typeDist.action}`);

  // Check credentials distribution
  const credDist = { required: 0, notRequired: 0 };
  normalizedData.nodes.forEach(n => {
    if (n.requiresCredentials) credDist.required++;
    else credDist.notRequired++;
  });

  console.log('\nCredentials:');
  console.log(`  Required: ${credDist.required}`);
  console.log(`  Not required: ${credDist.notRequired}`);

  // Verify trigger count matches trigger category
  if (typeDist.trigger === categoryDist.trigger) {
    console.log('\n✓ Trigger count matches trigger category');
    results.summary.passedChecks++;
  } else {
    console.log(`\n⚠ Trigger mismatch: type=${typeDist.trigger}, category=${categoryDist.trigger}`);
    results.summary.warnings++;
  }
  results.summary.totalChecks++;
}

/**
 * Generate validation report
 */
function generateReport() {
  console.log('\n=== Generating Report ===\n');

  // Ensure validation directory exists
  const validationDir = path.join(__dirname, '../validation');
  if (!fs.existsSync(validationDir)) {
    fs.mkdirSync(validationDir, { recursive: true });
  }

  // Write JSON report
  const jsonPath = path.join(validationDir, 'validation-report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`JSON report: ${jsonPath}`);

  // Generate Markdown report
  const mdReport = generateMarkdownReport();
  const mdPath = path.join(validationDir, 'validation-report.md');
  fs.writeFileSync(mdPath, mdReport);
  console.log(`Markdown report: ${mdPath}`);
}

/**
 * Generate Markdown validation report
 */
function generateMarkdownReport() {
  const lines = [];

  lines.push('# Validation Report');
  lines.push('');
  lines.push(`> Generated: ${results.timestamp}`);
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Total Checks | ${results.summary.totalChecks} |`);
  lines.push(`| Passed | ${results.summary.passedChecks} |`);
  lines.push(`| Failed | ${results.summary.failedChecks} |`);
  lines.push(`| Warnings | ${results.summary.warnings} |`);
  lines.push('');

  const overallStatus = results.summary.failedChecks === 0 ? '✅ PASSED' : '❌ FAILED';
  lines.push(`**Overall Status:** ${overallStatus}`);
  lines.push('');

  // Completeness
  lines.push('## Completeness');
  lines.push('');
  lines.push(`- Expected nodes: ${results.completeness.totalExpected}`);
  lines.push(`- In CSV: ${results.completeness.totalInCSV}`);
  lines.push(`- In Markdown: ${results.completeness.totalInMarkdown}`);
  lines.push('');

  if (results.completeness.missingFromCSV.length > 0) {
    lines.push('### Missing from CSV');
    results.completeness.missingFromCSV.forEach(n => lines.push(`- ${n}`));
    lines.push('');
  }

  if (results.completeness.missingFromMarkdown.length > 0) {
    lines.push('### Missing from Markdown');
    results.completeness.missingFromMarkdown.forEach(n => lines.push(`- ${n}`));
    lines.push('');
  }

  // Consistency
  lines.push('## Consistency');
  lines.push('');

  if (results.dataQuality.emptyFields.length > 0) {
    lines.push('### Empty Fields');
    results.dataQuality.emptyFields.forEach(e =>
      lines.push(`- ${e.node}: missing ${e.field}`)
    );
    lines.push('');
  }

  if (results.dataQuality.invalidCategories.length > 0) {
    lines.push('### Invalid Categories');
    results.dataQuality.invalidCategories.forEach(e =>
      lines.push(`- ${e.node}: "${e.category}"`)
    );
    lines.push('');
  }

  if (results.dataQuality.duplicates.length > 0) {
    lines.push('### Duplicate Names');
    results.dataQuality.duplicates.forEach(d => lines.push(`- ${d}`));
    lines.push('');
  }

  // Warnings
  if (results.dataQuality.longDescriptions.length > 0) {
    lines.push('## Warnings');
    lines.push('');
    lines.push('### Long Descriptions (>200 chars)');
    results.dataQuality.longDescriptions.forEach(d =>
      lines.push(`- ${d.node}: ${d.length} chars`)
    );
    lines.push('');
  }

  // Conclusion
  lines.push('## Conclusion');
  lines.push('');
  if (results.summary.failedChecks === 0) {
    lines.push('All validation checks passed. The cheat guide is ready for use.');
  } else {
    lines.push('Some validation checks failed. Please review the issues above.');
  }

  return lines.join('\n');
}

/**
 * Main validation function
 */
function validate() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║     Cheat Guide Validation           ║');
  console.log('╚══════════════════════════════════════╝');

  validateCompleteness();
  validateConsistency();
  validateQuality();
  generateReport();

  // Final summary
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║           VALIDATION SUMMARY         ║');
  console.log('╚══════════════════════════════════════╝');
  console.log(`\nTotal checks: ${results.summary.totalChecks}`);
  console.log(`Passed: ${results.summary.passedChecks}`);
  console.log(`Failed: ${results.summary.failedChecks}`);
  console.log(`Warnings: ${results.summary.warnings}`);

  if (results.summary.failedChecks === 0) {
    console.log('\n✅ VALIDATION PASSED');
    process.exit(0);
  } else {
    console.log('\n❌ VALIDATION FAILED');
    process.exit(1);
  }
}

// Run validation
validate();

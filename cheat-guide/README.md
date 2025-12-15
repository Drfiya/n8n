# n8n Nodes Cheat Guide

A comprehensive reference guide for all 434 native n8n workflow automation nodes.

## Quick Start

The ready-to-use cheat guides are in the `output/` folder:

| File | Description |
|------|-------------|
| [`n8n-nodes-cheat-guide.md`](output/n8n-nodes-cheat-guide.md) | Full categorized guide |
| [`n8n-nodes-quick-reference.md`](output/n8n-nodes-quick-reference.md) | Compact single-table |
| [`n8n-nodes-cheat-guide-enhanced.md`](output/n8n-nodes-cheat-guide-enhanced.md) | Rich Markdown with YAML front matter |
| [`n8n-nodes-cheat-guide.csv`](output/n8n-nodes-cheat-guide.csv) | Basic CSV export |
| [`n8n-nodes-notion.csv`](output/n8n-nodes-notion.csv) | Notion database import |
| [`n8n-nodes-sheets.csv`](output/n8n-nodes-sheets.csv) | Google Sheets import |

## Node Statistics

| Category | Count | Icon |
|----------|------:|:----:|
| Triggers | 105 | ⚡ |
| Data Transformation | 121 | 🔄 |
| Data Sources | 107 | 📥 |
| Data Destinations | 96 | 📤 |
| Flow Control | 5 | 🗂️ |
| **Total** | **434** | |

## Importing to External Tools

### Notion

1. Open Notion and create a new database
2. Click `...` → `Import` → `CSV`
3. Select `output/n8n-nodes-notion.csv`
4. Map columns as needed

### Google Sheets

1. Open Google Sheets
2. `File` → `Import` → `Upload`
3. Select `output/n8n-nodes-sheets.csv`
4. Follow [`output/google-sheets-setup.md`](output/google-sheets-setup.md) for formatting

## Regenerating the Guide

If n8n adds new nodes, you can regenerate the cheat guide:

```bash
# Install dependencies (first time only)
cd cheat-guide
npm install

# Run the full pipeline
node scripts/extract-nodes.js      # Extract from source
node scripts/normalize-nodes.js    # Normalize data
node scripts/generate-output.js    # Generate outputs
node scripts/validate-output.js    # Validate results
node scripts/export-formats.js     # Export all formats
```

## Project Structure

```
cheat-guide/
├── README.md                 # This file
├── CHANGELOG.md              # Project history
├── discovery.md              # Phase 1 analysis report
├── scripts/                  # Generation scripts
│   ├── extract-nodes.js      # Extracts metadata from source
│   ├── normalize-nodes.js    # Normalizes and categorizes
│   ├── generate-output.js    # Generates Markdown/CSV
│   ├── validate-output.js    # Validates completeness
│   ├── export-formats.js     # Multi-format export
│   ├── analyze-data.js       # Data analysis helper
│   └── icon-inventory.js     # Icon cataloging
├── data/                     # Intermediate data files
│   ├── raw-nodes.json        # Raw extracted data
│   ├── normalized-nodes.json # Processed data
│   ├── category-taxonomy.json
│   ├── icon-inventory.json
│   └── ...
├── output/                   # Final deliverables
│   ├── *.md                  # Markdown guides
│   └── *.csv                 # CSV exports
└── validation/               # Quality reports
    ├── validation-report.json
    └── validation-report.md
```

## Data Sources

All node metadata is extracted from:
```
packages/nodes-base/nodes/
```

The extraction script parses `INodeTypeDescription` from each `.node.ts` file.

## License

This cheat guide is generated from the [n8n repository](https://github.com/n8n-io/n8n) which is licensed under [Fair-code](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

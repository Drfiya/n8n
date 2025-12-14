# **n8n Nodes Cheat Guide — Sprint/Build Plan**

---

## **Phase 1: Discovery & Scoping**

---

### **Step 1.1: Repository Structure Discovery**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Map the n8n MCP repository structure to locate all node definition files and understand the schema used for node metadata |
| **Inputs** | n8n MCP GitHub repository URL |
| **Outputs** | `repo-structure-map.md` — document listing: (1) root directory layout, (2) path patterns for node definitions, (3) file types containing node metadata (.json, .ts, etc.), (4) sample of 3–5 node files with key fields annotated |
| **Type** | Planning-only / Data extraction |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Limited to directory traversal and reading 3–5 sample files; no bulk extraction |
| **Stopping condition** | Document includes confirmed paths to node definitions and annotated sample files |

---

### **Step 1.2: Node Metadata Schema Analysis**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Define the canonical fields available per node in the MCP source (name, description, category, icon, type, etc.) |
| **Inputs** | `repo-structure-map.md`, 5–10 representative node definition files |
| **Outputs** | `node-metadata-schema.json` — JSON Schema documenting all extractable fields with types, optionality, and example values |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Analyzes small sample set; produces single schema artifact |
| **Stopping condition** | Schema covers all fields needed for cheat guide columns; validated against 5+ node files |

---

### **Step 1.3: Node Inventory Enumeration**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Generate a complete list of all node identifiers (file paths or unique keys) without extracting full metadata |
| **Inputs** | `repo-structure-map.md` |
| **Outputs** | `node-inventory.txt` — plain-text list of all \~543 node identifiers (one per line) |
| **Type** | Data extraction |
| **Execution Location** | Claude Code (scripted file listing) or External script |
| **Context-safe rationale** | Output is identifier-only; no metadata loaded into context |
| **Stopping condition** | Line count matches expected node count (±5%); spot-check 10 random entries |

---

### **Step 1.4: Batch Segmentation Plan**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Divide the node inventory into extraction batches of 25–30 nodes each |
| **Inputs** | `node-inventory.txt` |
| **Outputs** | `batch-manifest.json` — array of batch objects: `{ batchId, startIndex, endIndex, nodeIds[], status: "pending" }` |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Operates on list of identifiers only; no node content loaded |
| **Stopping condition** | All nodes assigned to exactly one batch; batch count × batch size ≥ total nodes |

---

## **Phase 2: Data Extraction**

---

### **Step 2.1: Extraction Script Template**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Create a reusable script/prompt template for extracting metadata from one batch of nodes |
| **Inputs** | `node-metadata-schema.json`, `batch-manifest.json` (structure only) |
| **Outputs** | `extraction-template.md` — prompt template with placeholders: `{{batchId}}`, `{{nodeIds}}`, expected output format |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Template creation only; no data processed |
| **Stopping condition** | Template tested manually on 1 sample batch (Step 2.2) |

---

### **Step 2.2: Pilot Batch Extraction (Batch 001\)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Validate extraction workflow on first batch; refine template if needed |
| **Inputs** | `extraction-template.md`, `batch-manifest.json` (batch 001), MCP repo access |
| **Outputs** | `raw/batch-001.json` — array of node metadata objects per schema |
| **Type** | Data extraction |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Single batch of 25–30 nodes fits comfortably in context |
| **Stopping condition** | JSON validates against schema; all batch nodes present; manual review of 5 entries |

---

### **Step 2.3–2.N: Batch Extraction (Batches 002–N)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Extract metadata for remaining batches using validated template |
| **Inputs** | `extraction-template.md`, `batch-manifest.json` (target batch), MCP repo access |
| **Outputs** | `raw/batch-{NNN}.json` per batch |
| **Type** | Data extraction |
| **Execution Location** | Claude Code (one session per batch) |
| **Context-safe rationale** | Each batch is independent; prior batches not loaded |
| **Stopping condition** | Batch JSON validates; batch status updated to `"complete"` in manifest |

**Note:** Repeat Step 2.3 for each batch. Update `batch-manifest.json` after each to track progress.

---

## **Phase 3: Normalization & Categorization**

---

### **Step 3.1: Category Taxonomy Definition**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Define the canonical category list for the cheat guide (may consolidate or rename MCP categories) |
| **Inputs** | Extracted category values from 3–5 batch files (sample), n8n official documentation (reference) |
| **Outputs** | `category-taxonomy.json` — `{ categoryId, displayName, description, mappingRules[] }` |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Small sample analysis; single artifact output |
| **Stopping condition** | Taxonomy covers all observed categories; mapping rules handle edge cases |

---

### **Step 3.2: Native vs. Community Classification Rules**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Define logic for classifying nodes as native or community |
| **Inputs** | `repo-structure-map.md`, sample node files, n8n documentation |
| **Outputs** | `classification-rules.md` — documented heuristics (e.g., path pattern, metadata flag, author field) |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Rule definition only; no bulk processing |
| **Stopping condition** | Rules tested against 10+ known native and 10+ known community nodes |

---

### **Step 3.3: Normalization Script Template**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Create a reusable script/prompt for normalizing raw batch JSON into final schema |
| **Inputs** | `node-metadata-schema.json`, `category-taxonomy.json`, `classification-rules.md` |
| **Outputs** | `normalization-template.md` — prompt template for transforming `raw/batch-{NNN}.json` → `normalized/batch-{NNN}.json` |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Template only |
| **Stopping condition** | Template validated on batch 001 |

---

### **Step 3.4: Pilot Batch Normalization (Batch 001\)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Normalize first batch; validate output schema |
| **Inputs** | `raw/batch-001.json`, `normalization-template.md` |
| **Outputs** | `normalized/batch-001.json` — nodes with: `name`, `category` (from taxonomy), `iconRef`, `description`, `nodeType` (native/community) |
| **Type** | Transformation |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Single batch in context |
| **Stopping condition** | Output validates; manual review confirms accuracy |

---

### **Step 3.5–3.N: Batch Normalization (Batches 002–N)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Normalize remaining batches |
| **Inputs** | `raw/batch-{NNN}.json`, `normalization-template.md` |
| **Outputs** | `normalized/batch-{NNN}.json` |
| **Type** | Transformation |
| **Execution Location** | Claude Code (one session per batch) |
| **Context-safe rationale** | Independent batches |
| **Stopping condition** | All batches normalized; manifest updated |

---

## **Phase 4: Icon Strategy & Asset Mapping**

---

### **Step 4.1: Icon Reference Inventory**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Catalog all icon references found in normalized data |
| **Inputs** | 3–5 normalized batch files (sample) |
| **Outputs** | `icon-inventory.json` — unique icon references with counts |
| **Type** | Data extraction |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Aggregates small field across sample |
| **Stopping condition** | Inventory created; patterns identified (URLs, file paths, icon names) |

---

### **Step 4.2: Icon Strategy Document**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Define how icons will be represented in final output (URLs, emoji fallbacks, reference codes) |
| **Inputs** | `icon-inventory.json`, target output formats |
| **Outputs** | `icon-strategy.md` — rules for icon rendering per format (Markdown, CSV, Notion) |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Strategy document only |
| **Stopping condition** | Strategy addresses all icon types in inventory; format-specific rules documented |

---

## **Phase 5: Cheat Guide Generation**

---

### **Step 5.1: Output Schema Definition**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Define final table schema and column specifications |
| **Inputs** | Project requirements, `icon-strategy.md` |
| **Outputs** | `cheat-guide-schema.json` — columns: `nodeName`, `category`, `icon`, `description`, `nodeType`; includes formatting rules per column |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Schema definition only |
| **Stopping condition** | Schema approved; sample row rendered in each target format |

---

### **Step 5.2: Generation Template**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Create prompt template for generating cheat guide content from normalized batch |
| **Inputs** | `cheat-guide-schema.json`, `icon-strategy.md`, sample normalized batch |
| **Outputs** | `generation-template.md` — prompt for transforming `normalized/batch-{NNN}.json` → formatted output |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Template only |
| **Stopping condition** | Template tested on batch 001 |

---

### **Step 5.3: Pilot Batch Generation (Batch 001\)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Generate cheat guide section for first batch |
| **Inputs** | `normalized/batch-001.json`, `generation-template.md` |
| **Outputs** | `output/batch-001.md` (Markdown table), `output/batch-001.csv` |
| **Type** | Documentation generation |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Single batch |
| **Stopping condition** | Outputs render correctly; manual review passes |

---

### **Step 5.4–5.N: Batch Generation (Batches 002–N)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Generate cheat guide sections for remaining batches |
| **Inputs** | `normalized/batch-{NNN}.json`, `generation-template.md` |
| **Outputs** | `output/batch-{NNN}.md`, `output/batch-{NNN}.csv` |
| **Type** | Documentation generation |
| **Execution Location** | Claude Code (one session per batch) |
| **Context-safe rationale** | Independent batches |
| **Stopping condition** | All batches generated; manifest updated |

---

## **Phase 6: Assembly & Validation**

---

### **Step 6.1: Batch Assembly Script**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Create script to concatenate batch outputs into single files |
| **Inputs** | `batch-manifest.json`, output file naming convention |
| **Outputs** | `assembly-script.sh` or `assembly-script.py` |
| **Type** | Planning-only |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Script creation only |
| **Stopping condition** | Script tested on 3 batch files |

---

### **Step 6.2: Full Assembly Execution**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Assemble all batch outputs into complete cheat guide files |
| **Inputs** | All `output/batch-{NNN}.*` files, `assembly-script.*` |
| **Outputs** | `final/n8n-nodes-cheat-guide.md`, `final/n8n-nodes-cheat-guide.csv` |
| **Type** | Transformation |
| **Execution Location** | External script (or Claude Code if script is simple) |
| **Context-safe rationale** | Script execution; no large files loaded into context |
| **Stopping condition** | Final files exist; row count \= sum of batch row counts |

---

### **Step 6.3: Completeness Validation**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Verify all nodes from inventory appear in final output |
| **Inputs** | `node-inventory.txt`, `final/n8n-nodes-cheat-guide.csv` |
| **Outputs** | `validation/completeness-report.md` — lists any missing nodes |
| **Type** | Validation |
| **Execution Location** | Claude Code or External script |
| **Context-safe rationale** | Comparison of two lists; no content analysis |
| **Stopping condition** | Missing count \= 0, or missing nodes documented for follow-up |

---

### **Step 6.4: Consistency Validation**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Check for data quality issues (empty fields, invalid categories, duplicate entries) |
| **Inputs** | `final/n8n-nodes-cheat-guide.csv`, `category-taxonomy.json` |
| **Outputs** | `validation/consistency-report.md` — lists issues by type with affected rows |
| **Type** | Validation |
| **Execution Location** | Claude Code or External script |
| **Context-safe rationale** | Field-level checks; can sample if needed |
| **Stopping condition** | All issues logged; critical issues \= 0 or remediation plan created |

---

### **Step 6.5: Issue Remediation (if needed)**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Fix identified issues from validation reports |
| **Inputs** | Validation reports, affected batch files |
| **Outputs** | Updated batch files; re-run assembly |
| **Type** | Transformation |
| **Execution Location** | Claude Code (targeted fixes per batch) |
| **Context-safe rationale** | Fixes scoped to specific batches/rows |
| **Stopping condition** | Re-validation passes |

---

## **Phase 7: Multi-Format Export**

---

### **Step 7.1: Markdown Enhancement**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Add front matter, table of contents, and category sections to Markdown output |
| **Inputs** | `final/n8n-nodes-cheat-guide.md`, `category-taxonomy.json` |
| **Outputs** | `final/n8n-nodes-cheat-guide-enhanced.md` — with TOC, category headers, metadata |
| **Type** | Documentation generation |
| **Execution Location** | Claude Code |
| **Context-safe rationale** | Structure additions; content already exists |
| **Stopping condition** | TOC links work; category sections render correctly |

---

### **Step 7.2: Notion Import Preparation**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Prepare CSV formatted for Notion database import |
| **Inputs** | `final/n8n-nodes-cheat-guide.csv`, Notion import requirements |
| **Outputs** | `final/n8n-nodes-notion-import.csv` — with Notion-compatible column headers and data types |
| **Type** | Transformation |
| **Execution Location** | Claude Code or Spreadsheet |
| **Context-safe rationale** | Header/format adjustments only |
| **Stopping condition** | Test import to Notion succeeds |

---

### **Step 7.3: Google Sheets Template**

| Attribute | Detail |
| ----- | ----- |
| **Goal** | Create a formatted Google Sheets template with conditional formatting, filters |
| **Inputs** | `final/n8n-nodes-cheat-guide.csv`, desired formatting rules |
| **Outputs** | `sheets-setup-instructions.md` — step-by-step guide; optionally `sheets-template.xlsx` |
| **Type** | Documentation generation |
| **Execution Location** | Claude Code (instructions) / Spreadsheet (template) |
| **Context-safe rationale** | Instructions or small template file |
| **Stopping condition** | Instructions tested; template imports correctly |

---

## **Artifact Summary Table**

| Artifact | Phase | Format | Purpose |
| ----- | ----- | ----- | ----- |
| `repo-structure-map.md` | 1 | Markdown | Repository navigation guide |
| `node-metadata-schema.json` | 1 | JSON | Field definitions for extraction |
| `node-inventory.txt` | 1 | Text | Complete node ID list |
| `batch-manifest.json` | 1 | JSON | Batch tracking and status |
| `extraction-template.md` | 2 | Markdown | Reusable extraction prompt |
| `raw/batch-{NNN}.json` | 2 | JSON | Raw extracted metadata |
| `category-taxonomy.json` | 3 | JSON | Canonical category definitions |
| `classification-rules.md` | 3 | Markdown | Native/community logic |
| `normalization-template.md` | 3 | Markdown | Reusable normalization prompt |
| `normalized/batch-{NNN}.json` | 3 | JSON | Cleaned/standardized metadata |
| `icon-inventory.json` | 4 | JSON | Icon reference catalog |
| `icon-strategy.md` | 4 | Markdown | Icon rendering rules |
| `cheat-guide-schema.json` | 5 | JSON | Final output column definitions |
| `generation-template.md` | 5 | Markdown | Reusable generation prompt |
| `output/batch-{NNN}.md` | 5 | Markdown | Batch cheat guide sections |
| `output/batch-{NNN}.csv` | 5 | CSV | Batch data export |
| `assembly-script.*` | 6 | Script | Concatenation automation |
| `final/n8n-nodes-cheat-guide.md` | 6 | Markdown | Complete cheat guide |
| `final/n8n-nodes-cheat-guide.csv` | 6 | CSV | Complete data export |
| `validation/completeness-report.md` | 6 | Markdown | Missing node report |
| `validation/consistency-report.md` | 6 | Markdown | Data quality report |
| `final/n8n-nodes-cheat-guide-enhanced.md` | 7 | Markdown | Publication-ready guide |
| `final/n8n-nodes-notion-import.csv` | 7 | CSV | Notion-ready import |
| `sheets-setup-instructions.md` | 7 | Markdown | Sheets configuration guide |

---

## **Execution Checklist**

Use this checklist to track progress across sessions:

```
[ ] Phase 1: Discovery & Scoping
    [ ] 1.1 Repository Structure Discovery
    [ ] 1.2 Node Metadata Schema Analysis
    [ ] 1.3 Node Inventory Enumeration
    [ ] 1.4 Batch Segmentation Plan

[ ] Phase 2: Data Extraction
    [ ] 2.1 Extraction Script Template
    [ ] 2.2 Pilot Batch Extraction (001)
    [ ] 2.3–2.N Batch Extraction (track in manifest)

[ ] Phase 3: Normalization & Categorization
    [ ] 3.1 Category Taxonomy Definition
    [ ] 3.2 Native vs. Community Classification Rules
    [ ] 3.3 Normalization Script Template
    [ ] 3.4 Pilot Batch Normalization (001)
    [ ] 3.5–3.N Batch Normalization (track in manifest)

[ ] Phase 4: Icon Strategy
    [ ] 4.1 Icon Reference Inventory
    [ ] 4.2 Icon Strategy Document

[ ] Phase 5: Cheat Guide Generation
    [ ] 5.1 Output Schema Definition
    [ ] 5.2 Generation Template
    [ ] 5.3 Pilot Batch Generation (001)
    [ ] 5.4–5.N Batch Generation (track in manifest)

[ ] Phase 6: Assembly & Validation
    [ ] 6.1 Batch Assembly Script
    [ ] 6.2 Full Assembly Execution
    [ ] 6.3 Completeness Validation
    [ ] 6.4 Consistency Validation
    [ ] 6.5 Issue Remediation (if needed)

[ ] Phase 7: Multi-Format Export
    [ ] 7.1 Markdown Enhancement
    [ ] 7.2 Notion Import Preparation
    [ ] 7.3 Google Sheets Template
```

---

## **Session Handoff Protocol**

At the end of each Claude Code session:

1. **Save all artifacts** to designated directories  
2. **Update `batch-manifest.json`** with completed batch statuses  
3. **Create `session-{N}-summary.md`** containing:  
   * Steps completed this session  
   * Artifacts produced  
   * Next step to execute  
   * Any blockers or decisions needed  
4. **Begin next session** by reading latest `session-{N}-summary.md` and `batch-manifest.json`


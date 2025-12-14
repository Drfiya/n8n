# Icon Strategy Document

This document defines how icons will be represented in the cheat guide output formats.

## Icon Inventory Summary

| Metric | Count |
|--------|-------|
| Total nodes | 434 |
| Nodes with icons | 422 |
| Nodes without icons | 12 |
| Nodes with dark mode icons | 50 |
| Unique icon files | 335 |
| Unique dark icon files | 41 |

### Icon Formats

| Format | Count | Notes |
|--------|-------|-------|
| SVG | 307 | Vector graphics, scalable |
| PNG | 65 | Raster graphics |
| None | 12 | Missing icons (fallback needed) |

### Nodes Without Icons

These nodes require fallback icons:
- AWS Cognito
- Azure Cosmos DB
- Azure Storage
- BambooHr
- Customer Datastore (n8n training)
- Customer Messenger (n8n training)
- GitHub
- Jina AI
- Microsoft Entra ID
- Microsoft SharePoint
- Mistral AI
- Perplexity

## Output Format Strategies

### 1. Markdown Output

**Strategy**: Use emoji fallbacks with icon file references in comments

```markdown
| Icon | Node Name | Category |
|------|-----------|----------|
| 🔌 | Action Network | Data Transformation |
| ⚡ | ActiveCampaign Trigger | Triggers |
```

**Icon Mapping**:
| Category | Emoji |
|----------|-------|
| Triggers | ⚡ |
| Data Transformation | 🔄 |
| Data Sources | 📥 |
| Data Destinations | 📤 |
| Flow Control | 🗂️ |
| Scheduling | ⏰ |

**Node Type Indicators**:
| Type | Emoji |
|------|-------|
| Trigger | ⚡ |
| Action | ▶️ |
| Utility | 🛠️ |
| Integration | 🔌 |

### 2. CSV Output

**Strategy**: Include icon filename for reference, allow manual icon embedding later

```csv
"Node Name","Category","Icon File","Has Dark Mode"
"Action Network","Data Transformation","actionNetwork.svg","No"
"ActiveCampaign","Data Transformation","activeCampaign.svg","Yes"
```

**Columns**:
- `iconFileName`: The icon file name (e.g., `slack.svg`)
- `iconPath`: Full relative path from n8n repo root
- `hasDarkModeIcon`: Boolean indicating dark mode variant exists

### 3. Notion Import

**Strategy**: Use icon column with URL references or emoji fallbacks

**Option A - Emoji Icons** (Recommended for simplicity):
- Use category emoji as icon
- Simple, works immediately

**Option B - URL Icons** (Requires hosting):
- Host SVG/PNG icons on CDN
- Reference URL in icon column
- Better visual fidelity but requires setup

**Recommendation**: Start with Option A (emoji), upgrade to Option B later if needed

### 4. Google Sheets

**Strategy**: Use IMAGE() formula with hosted icons or conditional formatting with emojis

**Option A - Emoji Column**:
```
=IF(B2="Triggers","⚡",IF(B2="Data Transformation","🔄","📦"))
```

**Option B - IMAGE() with URLs** (Requires hosting):
```
=IMAGE("https://cdn.example.com/icons/" & D2)
```

**Conditional Formatting**:
- Color-code rows by category
- Highlight trigger vs action nodes

## Icon URL Strategy (Future)

If URL-based icons are needed:

### Source Locations
Icons are located in the n8n repository at:
```
packages/nodes-base/nodes/{NodeDirectory}/{iconFileName}
```

### Hosting Options

1. **GitHub Raw URLs** (Simple, may have rate limits):
   ```
   https://raw.githubusercontent.com/n8n-io/n8n/master/packages/nodes-base/nodes/Slack/slack.svg
   ```

2. **CDN Hosting** (Better performance):
   - Upload icons to Cloudflare, AWS S3, or similar
   - Use consistent URL pattern

3. **n8n Official** (If available):
   - Check if n8n provides official icon CDN

### URL Template
```
{baseUrl}/nodes/{nodeDirectory}/{iconFileName}
```

## Fallback Strategy

For nodes without icons, use:

1. **Category Emoji**: Primary fallback based on node category
2. **Generic Icon**: 📦 for unknown/missing
3. **First Letter**: Capital letter in colored circle (for Notion)

### Fallback Mapping

| Node | Suggested Fallback |
|------|-------------------|
| AWS Cognito | 🔐 (auth) |
| Azure Cosmos DB | 🗄️ (database) |
| Azure Storage | 💾 (storage) |
| BambooHr | 👤 (HR) |
| Customer Datastore | 📊 (data) |
| Customer Messenger | 💬 (messaging) |
| GitHub | 🐙 (github) |
| Jina AI | 🤖 (AI) |
| Microsoft Entra ID | 🔐 (auth) |
| Microsoft SharePoint | 📁 (files) |
| Mistral AI | 🤖 (AI) |
| Perplexity | 🔍 (search/AI) |

## Implementation Priority

1. **Phase 5 (Output Generation)**: Use emoji-based icons
2. **Phase 7 (Enhanced Export)**: Consider URL-based icons for Notion/Sheets
3. **Future**: Explore n8n official icon CDN or self-hosting

## Dark Mode Considerations

- 50 nodes have dark mode icon variants
- CSV will include `hasDarkModeIcon` column for reference
- Markdown/Notion can use light icons (most common viewing context)
- Google Sheets: Use light icons by default

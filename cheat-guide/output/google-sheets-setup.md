# Google Sheets Setup Guide

## Importing the Cheat Guide

### Step 1: Import CSV
1. Open Google Sheets
2. Go to **File > Import**
3. Select **Upload** and choose `n8n-nodes-sheets.csv`
4. Import settings:
   - Import location: **Create new spreadsheet**
   - Separator type: **Comma**
   - Convert text to numbers: **No**

### Step 2: Apply Formatting

#### Header Row
1. Select Row 1
2. **Format > Text > Bold**
3. **View > Freeze > 1 row**
4. Background color: `#4285f4` (Google Blue)
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
| Triggers | `#fff2cc` (Light Yellow) |
| Data Transformation | `#d9ead3` (Light Green) |
| Data Sources | `#cfe2f3` (Light Blue) |
| Data Destinations | `#f4cccc` (Light Red) |
| Flow Control | `#d9d2e9` (Light Purple) |

#### Highlight Auth Required
1. Select column F
2. Add rule: Text is exactly "TRUE" → Background `#ea9999`

### Step 5: Add Data Validation (Optional)

#### Category Dropdown
1. Select column C (excluding header)
2. **Data > Data validation**
3. Criteria: List of items
4. Values: `Triggers,Data Transformation,Data Sources,Data Destinations,Flow Control`

### Step 6: Create Dashboard Tab

Add a new sheet called "Dashboard" with these formulas:

```
=COUNTA(Sheet1!B:B)-1                    // Total nodes
=COUNTIF(Sheet1!C:C,"Triggers")          // Trigger count
=COUNTIF(Sheet1!F:F,"TRUE")              // Auth required count
=COUNTIF(Sheet1!D:D,"Trigger")           // Trigger type count
```

### Useful Formulas

```
// Count nodes by category
=COUNTIF(C:C,"Data Transformation")

// Find nodes without auth
=FILTER(B:B,F:F="FALSE")

// Search for node by name
=FILTER(B:E,REGEXMATCH(B:B,"(?i)slack"))
```

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

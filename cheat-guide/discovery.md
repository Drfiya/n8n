# Phase 1: Discovery Report

**Date**: 2025-12-14
**Status**: Complete

---

## 1. Repository Structure

### Node Location
All nodes are located in:
```
packages/nodes-base/nodes/
```

### File Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `{NodeName}/{NodeName}.node.ts` | Standard action node | `Slack/Slack.node.ts` |
| `{NodeName}/{NodeName}Trigger.node.ts` | Trigger node | `Slack/SlackTrigger.node.ts` |
| `{NodeName}/V{N}/{NodeName}V{N}.node.ts` | Versioned implementation | `Airtable/v2/AirtableV2.node.ts` |
| `{NodeName}/v{n}/{NodeName}V{n}.node.ts` | Versioned (lowercase) | `Discord/v2/DiscordV2.node.ts` |

### Node Counts

| Metric | Count |
|--------|-------|
| Total `.node.ts` files | 526 |
| Registered in package.json | 435 |
| Difference (version implementations) | 91 |

The difference is due to:
- Versioned nodes (V1, V2, V3 implementations are separate files but register as one node)
- Some nodes are entry points that reference version-specific implementations

---

## 2. Node Implementation Patterns

### Pattern A: Direct Implementation (INodeType)
Used for: Single-version nodes, most trigger nodes

```typescript
export class Code implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Code',
        name: 'code',
        icon: 'file:code.svg',
        group: ['transform'],
        version: [1, 2],
        defaultVersion: 2,
        description: 'Run custom JavaScript or Python code',
        defaults: { name: 'Code' },
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        properties: [...],
    };

    async execute(this: IExecuteFunctions) { ... }
}
```

### Pattern B: Versioned Node (VersionedNodeType)
Used for: Nodes with significant version differences

```typescript
export class Slack extends VersionedNodeType {
    constructor() {
        const baseDescription: INodeTypeBaseDescription = {
            displayName: 'Slack',
            name: 'slack',
            icon: 'file:slack.svg',
            group: ['output'],
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume Slack API',
            defaultVersion: 2.4,
        };

        const nodeVersions: IVersionedNodeType['nodeVersions'] = {
            1: new SlackV1(baseDescription),
            2: new SlackV2(baseDescription),
            2.1: new SlackV2(baseDescription),
            // ...
        };

        super(nodeVersions, baseDescription);
    }
}
```

### Pattern C: Trigger Node
Used for: Webhook triggers, polling triggers

```typescript
export class SlackTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Slack Trigger',
        name: 'slackTrigger',
        icon: 'file:slack.svg',
        group: ['trigger'],  // <-- Key identifier
        version: 1,
        description: 'Handle Slack events via webhooks',
        defaults: { name: 'Slack Trigger' },
        inputs: [],          // <-- No inputs for triggers
        outputs: [NodeConnectionTypes.Main],
        webhooks: [...],     // <-- Webhook configuration
        credentials: [...],
        properties: [...],
    };

    webhookMethods = { ... };
    async webhook(this: IWebhookFunctions) { ... }
}
```

---

## 3. Metadata Schema (INodeTypeDescription)

### Core Fields (Always Present)

| Field | Type | Description |
|-------|------|-------------|
| `displayName` | `string` | Human-readable name shown in UI |
| `name` | `string` | Internal identifier (kebab-case) |
| `description` | `string` | Brief description of node purpose |
| `group` | `string[]` | Category: `['trigger']`, `['transform']`, `['output']`, etc. |
| `version` | `number \| number[]` | Version number(s) |
| `defaults` | `{ name: string, ... }` | Default values when node is added |
| `inputs` | Various | Input connection types |
| `outputs` | Various | Output connection types |
| `properties` | `INodeProperties[]` | Node parameters/configuration |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `icon` | `string \| { light: string, dark: string }` | Icon reference |
| `defaultVersion` | `number` | Default version when multiple exist |
| `subtitle` | `string` | Dynamic subtitle expression |
| `credentials` | `{ name: string, required: boolean }[]` | Required credentials |
| `webhooks` | `WebhookDescription[]` | Webhook configuration (triggers) |
| `polling` | `boolean` | Whether it's a polling trigger |
| `eventTriggerDescription` | `string` | Description for trigger panel |
| `activationMessage` | `string` | Message shown on activation |
| `triggerPanel` | `object` | Trigger panel configuration |
| `supportsCORS` | `boolean` | CORS support flag |
| `parameterPane` | `string` | Parameter pane style ('wide') |

### Icon Formats

1. **SVG file reference**: `'file:slack.svg'`
2. **Light/dark variants**: `{ light: 'file:webhook.svg', dark: 'file:webhook.dark.svg' }`
3. **Font Awesome**: `'fa:envelope'` (legacy, rarely used)

Icons are located in the same directory as the node file.

---

## 4. Group Categories

Based on sample analysis, the following groups are used:

| Group | Description | Example Nodes |
|-------|-------------|---------------|
| `trigger` | Event triggers | SlackTrigger, Webhook, ScheduleTrigger |
| `transform` | Data transformation | Code, Set, Merge |
| `output` | External service actions | Slack, Gmail, HttpRequest |
| `input` | Data input nodes | ReadBinaryFile, HttpRequest |

---

## 5. Extraction Strategy

### Recommended Approach

1. **Use glob pattern** to find all entry-point nodes:
   ```
   packages/nodes-base/nodes/**/*.node.ts
   ```

2. **Filter out version implementations** (files in `V{N}/` or `v{n}/` subdirectories)

3. **For each node file**:
   - Parse TypeScript to extract `description` object
   - For `VersionedNodeType`, extract `baseDescription`
   - For `INodeType`, extract `description` property

4. **Metadata to extract per node**:
   ```typescript
   {
     name: string,           // Internal identifier
     displayName: string,    // UI name
     description: string,    // Description text
     group: string[],        // Categories
     icon: string | object,  // Icon reference
     version: number | number[],
     defaultVersion?: number,
     credentials?: string[], // Credential type names
     isTrigger: boolean,     // group.includes('trigger')
     filePath: string,       // Source file location
   }
   ```

### Files to Process

Entry-point nodes (excluding version subdirectories):
- Approximately **435 nodes** (matches package.json registration)

---

## 6. Sample Extracted Data

### Sample 1: Slack (VersionedNodeType)
```json
{
  "name": "slack",
  "displayName": "Slack",
  "description": "Consume Slack API",
  "group": ["output"],
  "icon": "file:slack.svg",
  "defaultVersion": 2.4,
  "isTrigger": false,
  "filePath": "packages/nodes-base/nodes/Slack/Slack.node.ts"
}
```

### Sample 2: SlackTrigger (INodeType - Trigger)
```json
{
  "name": "slackTrigger",
  "displayName": "Slack Trigger",
  "description": "Handle Slack events via webhooks",
  "group": ["trigger"],
  "icon": "file:slack.svg",
  "version": 1,
  "credentials": ["slackApi"],
  "isTrigger": true,
  "filePath": "packages/nodes-base/nodes/Slack/SlackTrigger.node.ts"
}
```

### Sample 3: Code (INodeType)
```json
{
  "name": "code",
  "displayName": "Code",
  "description": "Run custom JavaScript or Python code",
  "group": ["transform"],
  "icon": "file:code.svg",
  "version": [1, 2],
  "defaultVersion": 2,
  "isTrigger": false,
  "filePath": "packages/nodes-base/nodes/Code/Code.node.ts"
}
```

### Sample 4: Webhook (INodeType - Trigger with versions)
```json
{
  "name": "webhook",
  "displayName": "Webhook",
  "description": "Starts the workflow when a webhook is called",
  "group": ["trigger"],
  "icon": { "light": "file:webhook.svg", "dark": "file:webhook.dark.svg" },
  "version": [1, 1.1, 2, 2.1],
  "defaultVersion": 2.1,
  "isTrigger": true,
  "filePath": "packages/nodes-base/nodes/Webhook/Webhook.node.ts"
}
```

### Sample 5: HttpRequest (VersionedNodeType)
```json
{
  "name": "httpRequest",
  "displayName": "HTTP Request",
  "description": "Makes an HTTP request and returns the response data",
  "group": ["output"],
  "icon": { "light": "file:httprequest.svg", "dark": "file:httprequest.dark.svg" },
  "defaultVersion": 4.3,
  "isTrigger": false,
  "filePath": "packages/nodes-base/nodes/HttpRequest/HttpRequest.node.ts"
}
```

---

## 7. Next Steps

Proceed to **Phase 2: Automated Extraction**:
1. Create TypeScript extraction script
2. Use AST parsing or regex to extract description objects
3. Generate `data/raw-nodes.json` with all node metadata

---

## Appendix: Key Source Files

| File | Purpose |
|------|---------|
| `packages/nodes-base/nodes/` | All node implementations |
| `packages/nodes-base/package.json` | Node registration (n8n.nodes array) |
| `packages/nodes-base/AGENTS.md` | Node development guidelines |
| `packages/workflow/src/Interfaces.ts` | TypeScript interfaces (INodeType, etc.) |

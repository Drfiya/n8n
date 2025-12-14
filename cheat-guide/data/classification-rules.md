# Classification Rules

This document defines the heuristics for classifying n8n nodes in the cheat guide.

## 1. Native vs Community Classification

### Native Nodes
- **Definition**: Nodes that ship with n8n core
- **Location**: `packages/nodes-base/nodes/`
- **Identification Rule**: All nodes extracted from `packages/nodes-base` are native

### Community Nodes
- **Definition**: Nodes created and maintained by the n8n community
- **Location**: External npm packages (not in n8n monorepo)
- **Identification Rule**: Nodes installed from external packages

> **Note**: All 434 nodes in this extraction are from `packages/nodes-base` and are therefore **native** nodes.

## 2. Node Type Classification

### Trigger Nodes
- **Rule**: `isTrigger === true` OR group contains `"trigger"`
- **Behavior**: Initiates workflow execution
- **Examples**: Webhook, Schedule Trigger, Email Trigger (IMAP)

### Action Nodes
- **Rule**: `isTrigger === false` AND group does not contain `"trigger"`
- **Behavior**: Performs operations within a running workflow
- **Examples**: HTTP Request, Set, Code, Slack

## 3. Functional Category Classification

### Utility Nodes
- **Rule**: `credentials === null` OR `credentials.length === 0`
- **Behavior**: Core functionality without external service dependencies
- **Count**: 121 nodes
- **Examples**: Set, Filter, Code, Merge, If, Switch

### Integration Nodes
- **Rule**: `credentials !== null` AND `credentials.length > 0`
- **Behavior**: Connect to external services/APIs
- **Count**: 313 nodes
- **Examples**: Slack, Gmail, GitHub, Airtable

## 4. Primary Category Mapping

| Source Group | Category ID | Display Name |
|--------------|-------------|--------------|
| trigger | trigger | Triggers |
| transform | transform | Data Transformation |
| input | input | Data Sources |
| output | output | Data Destinations |
| organization | organization | Flow Control |
| schedule | schedule | Scheduling |

### Multiple Group Handling
- If a node has multiple groups, use the **first** group as the primary category
- Store all groups for reference if needed

## 5. Icon Classification

### Standard Icons
- **Rule**: `typeof icon === 'string'`
- **Format**: `file:filename.svg` or `file:filename.png`
- **Count**: 372 nodes

### Dark Mode Icons
- **Rule**: `typeof icon === 'object'`
- **Format**: `{ light: "file:name.svg", dark: "file:name.dark.svg" }`
- **Count**: 50 nodes

## 6. Versioned Nodes

### Versioned
- **Rule**: `isVersioned === true`
- **Behavior**: Multiple versions available, user can choose
- **Count**: 43 nodes

### Non-Versioned
- **Rule**: `isVersioned === false`
- **Behavior**: Single version only
- **Count**: 391 nodes

## Validation Checklist

To validate classification:

1. [x] All nodes in `packages/nodes-base` marked as native
2. [x] Trigger nodes identified by `isTrigger` field
3. [x] Utility nodes identified by absence of credentials
4. [x] Category derived from first group value
5. [x] Icon format properly detected (string vs object)
6. [x] Version status captured

---
title: "n8n Nodes Cheat Guide"
description: "Complete reference guide for all native n8n workflow automation nodes"
date: "2025-12-14"
author: "Auto-generated from n8n repository"
total_nodes: 434
categories:
  - name: "Triggers"
    count: 105
    icon: "⚡"
  - name: "Data Transformation"
    count: 121
    icon: "🔄"
  - name: "Data Sources"
    count: 107
    icon: "📥"
  - name: "Data Destinations"
    count: 96
    icon: "📤"
  - name: "Flow Control"
    count: 5
    icon: "🗂️"
---

# 📚 n8n Nodes Cheat Guide

![Nodes](https://img.shields.io/badge/Nodes-434-blue)
![Categories](https://img.shields.io/badge/Categories-5-green)
![Native](https://img.shields.io/badge/Type-Native-orange)

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Total Nodes | 434 |
| Trigger Nodes | 105 |
| Action Nodes | 329 |
| Auth Required | 314 |
| No Auth Needed | 120 |

## 🗂️ Categories

- [⚡ Triggers](#triggers) (105 nodes)
- [🔄 Data Transformation](#data-transformation) (121 nodes)
- [📥 Data Sources](#data-sources) (107 nodes)
- [📤 Data Destinations](#data-destinations) (96 nodes)
- [🗂️ Flow Control](#flow-control) (5 nodes)

## 📖 Legend

| Symbol | Meaning |
|--------|---------|
| ⚡ | Trigger node (starts workflows) |
| 🔄 | Data Transformation |
| 📥 | Data Source (input) |
| 📤 | Data Destination (output) |
| 🗂️ | Flow Control |
| ✓ | Requires authentication |

---

## ⚡ Triggers

> 105 nodes in this category

| Node | Description | Auth |
|------|-------------|:----:|
| ActiveCampaign Trigger | Handle ActiveCampaign events via webhooks | ✓ |
| Acuity Scheduling Trigger | Handle Acuity Scheduling events via webhooks | ✓ |
| Affinity Trigger | Handle Affinity events via webhooks | ✓ |
| Airtable Trigger | Starts the workflow when Airtable events occur | ✓ |
| AMQP Trigger | Listens to AMQP 1.0 Messages | ✓ |
| Asana Trigger | Starts the workflow when Asana events occur. | ✓ |
| Autopilot Trigger | Handle Autopilot events via webhooks | ✓ |
| AWS SNS Trigger | Handle AWS SNS events via webhooks |  |
| Bitbucket Trigger | Handle Bitbucket events via webhooks | ✓ |
| Box Trigger | Starts the workflow when Box events occur | ✓ |
| Brevo Trigger | Starts the workflow when Brevo events occur | ✓ |
| Cal.com Trigger | Handle Cal.com events via webhooks | ✓ |
| Calendly Trigger | Starts the workflow when Calendly events occur | ✓ |
| Chargebee Trigger | Starts the workflow when Chargebee events occur |  |
| ClickUp Trigger | Handle ClickUp events via webhooks (Beta) | ✓ |
| Clockify Trigger | Listens to Clockify events | ✓ |
| ConvertKit Trigger | Handle ConvertKit events via webhooks | ✓ |
| Copper Trigger | Handle Copper events via webhooks | ✓ |
| Cron | Triggers the workflow at a specific time |  |
| Customer.io Trigger | Starts the workflow on a Customer.io update (Beta) | ✓ |
| Email Trigger (IMAP) | Triggers the workflow when a new email is received |  |
| Emelia Trigger | Handle Emelia campaign activity events via webhooks | ✓ |
| Error Trigger | Triggers the workflow when another workflow has an e... |  |
| Eventbrite Trigger | Handle Eventbrite events via webhooks | ✓ |
| Execute Workflow Trigger | Helpers for calling other n8n workflows. Used for de... |  |
| Facebook Lead Ads Trigger | Handle Facebook Lead Ads events via webhooks | ✓ |
| Facebook Trigger | Starts the workflow when Facebook events occur | ✓ |
| Figma Trigger (Beta) | Starts the workflow when Figma events occur | ✓ |
| Flow Trigger | Handle Flow events via webhooks | ✓ |
| Form.io Trigger | Handle form.io events via webhooks | ✓ |
| Formstack Trigger | Starts the workflow on a Formstack form submission. | ✓ |
| GetResponse Trigger | Starts the workflow when GetResponse events occur | ✓ |
| Github Trigger | Starts the workflow when Github events occur | ✓ |
| GitLab Trigger | Starts the workflow when GitLab events occur | ✓ |
| Gmail Trigger | Fetches emails from Gmail and starts the workflow on... | ✓ |
| Google Business Profile Trigger | Fetches reviews from Google Business Profile and sta... | ✓ |
| Google Calendar Trigger | Starts the workflow when Google Calendar events occur | ✓ |
| Google Drive Trigger | Starts the workflow when Google Drive events occur | ✓ |
| Google Sheets Trigger | Starts the workflow when Google Sheets events occur | ✓ |
| Gumroad Trigger | Handle Gumroad events via webhooks | ✓ |
| Help Scout Trigger | Starts the workflow when Help Scout events occur | ✓ |
| HubSpot Trigger | Starts the workflow when HubSpot events occur | ✓ |
| Interval | Triggers the workflow in a given interval |  |
| Invoice Ninja Trigger | Starts the workflow when Invoice Ninja events occur | ✓ |
| Jira Trigger | Starts the workflow when Jira events occur | ✓ |
| Jotform Trigger | Handle Jotform events via webhooks | ✓ |
| Kafka Trigger | Consume messages from a Kafka topic | ✓ |
| Keap Trigger | Starts the workflow when Infusionsoft events occur | ✓ |
| KoBoToolbox Trigger | Process KoBoToolbox submissions | ✓ |
| Lemlist Trigger | Handle Lemlist events via webhooks | ✓ |
| Linear Trigger | Starts the workflow when Linear events occur | ✓ |
| Local File Trigger | Triggers a workflow on file system changes |  |
| LoneScale Trigger | Trigger LoneScale Workflow | ✓ |
| Mailchimp Trigger | Handle Mailchimp events via webhooks | ✓ |
| MailerLite Trigger | Starts the workflow when MailerLite events occur |  |
| Mailjet Trigger | Handle Mailjet events via webhooks | ✓ |
| Manual Trigger | Runs the flow on clicking a button in n8n |  |
| Mautic Trigger | Handle Mautic events via webhooks | ✓ |
| Microsoft OneDrive Trigger | Trigger for Microsoft OneDrive API. | ✓ |
| Microsoft Outlook Trigger | Fetches emails from Microsoft Outlook and starts the... | ✓ |
| Microsoft Teams Trigger | Triggers workflows in n8n based on events from Micro... | ✓ |
| MQTT Trigger | Listens to MQTT events | ✓ |
| n8n Form Trigger | Generate webforms in n8n and pass their responses to... |  |
| n8n Trigger | Handle events and perform actions on your n8n instance |  |
| Netlify Trigger | Handle netlify events via webhooks | ✓ |
| Notion Trigger | Starts the workflow when Notion events occur | ✓ |
| Onfleet Trigger | Starts the workflow when Onfleet events occur | ✓ |
| PayPal Trigger | Handle PayPal events via webhooks | ✓ |
| Pipedrive Trigger | Starts the workflow when Pipedrive events occur | ✓ |
| Postgres Trigger | Listens to Postgres messages | ✓ |
| Postmark Trigger | Starts the workflow when Postmark events occur | ✓ |
| Pushcut Trigger | Starts the workflow when Pushcut events occur | ✓ |
| RabbitMQ Trigger | Listens to RabbitMQ messages | ✓ |
| Redis Trigger | Subscribe to redis channel | ✓ |
| RSS Feed Trigger | Starts a workflow when an RSS feed is updated |  |
| Salesforce Trigger | Fetches data from Salesforce and starts the workflow... | ✓ |
| Schedule Trigger | Triggers the workflow on a given schedule |  |
| SeaTable Trigger | Starts the workflow when SeaTable events occur |  |
| Shopify Trigger | Handle Shopify events via webhooks | ✓ |
| Simulate Trigger | Simulate a trigger node |  |
| Slack Trigger | Handle Slack events via webhooks | ✓ |
| SSE Trigger | Triggers the workflow when Server-Sent Events occur |  |
| Strava Trigger | Starts the workflow when Strava events occur | ✓ |
| Stripe Trigger | Handle Stripe events via webhooks | ✓ |
| SurveyMonkey Trigger | Starts the workflow when Survey Monkey events occur | ✓ |
| Taiga Trigger | Handle Taiga events via webhook | ✓ |
| Telegram Trigger | Starts the workflow on a Telegram update | ✓ |
| TheHive 5 Trigger | Starts the workflow when TheHive events occur |  |
| TheHive Trigger | Starts the workflow when TheHive events occur |  |
| Toggl Trigger | Starts the workflow when Toggl events occur | ✓ |
| Trello Trigger | Starts the workflow when Trello events occur | ✓ |
| Twilio Trigger | Starts the workflow on a Twilio update | ✓ |
| Typeform Trigger | Starts the workflow on a Typeform form submission | ✓ |
| Venafi TLS Protect Cloud Trigger | Starts the workflow when Venafi events occur | ✓ |
| Venafi TLS Protect Datacenter Trigger | Starts the workflow when Venafi events occur | ✓ |
| Webex by Cisco Trigger | Starts the workflow when Cisco Webex events occur. | ✓ |
| Webflow Trigger | Handle Webflow events via webhooks |  |
| Webhook | Starts the workflow when a webhook is called |  |
| WhatsApp Trigger | Handle WhatsApp events via webhooks | ✓ |
| Wise Trigger | Handle Wise events via webhooks | ✓ |
| WooCommerce Trigger | Handle WooCommerce events via webhooks | ✓ |
| Workable Trigger | Starts the workflow when Workable events occur | ✓ |
| Workflow Trigger | Triggers based on various lifecycle events, like whe... |  |
| Wufoo Trigger | Handle Wufoo events via webhooks | ✓ |
| Zendesk Trigger | Handle Zendesk events via webhooks | ✓ |

[⬆ Back to top](#-n8n-nodes-cheat-guide)

---

## 🔄 Data Transformation

> 121 nodes in this category

| Node | Description | Auth |
|------|-------------|:----:|
| Action Network | Consume the Action Network API | ✓ |
| ActiveCampaign | Create and edit data in ActiveCampaign | ✓ |
| Adalo | Consume Adalo API | ✓ |
| Aggregate | Combine a field from many items into a list in a sin... |  |
| Agile CRM | Consume Agile CRM API | ✓ |
| AI Transform | Modify data based on instructions written in plain e... |  |
| Airtop | Scrape and control any site with Airtop | ✓ |
| AMQP Sender | Sends a raw-message via AMQP 1.0, executed once per ... | ✓ |
| APITemplate.io | Consume the APITemplate.io API | ✓ |
| AWS DynamoDB | Consume the AWS DynamoDB API |  |
| Azure Cosmos DB | Interact with Azure Cosmos DB API | ✓ |
| Azure Storage | Interact with Azure Storage API | ✓ |
| BambooHr | Consume BambooHR API | ✓ |
| Bitwarden | Consume the Bitwarden API | ✓ |
| Brevo | Consume Brevo API | ✓ |
| Bubble | Consume the Bubble Data API | ✓ |
| Clockify | Consume Clockify REST API | ✓ |
| Code | Run custom JavaScript or Python code |  |
| Compare Datasets | Compare two inputs for changes |  |
| Compression | Compress and decompress files |  |
| Convert to/from binary data | Move data between binary and JSON properties |  |
| Copper | Consume the Copper API | ✓ |
| Cortex | Apply the Cortex analyzer/responder on the given entity | ✓ |
| Crypto | Provide cryptographic utilities |  |
| Customer Datastore (n8n training) | Dummy node used for n8n training |  |
| Customer Messenger (n8n training) | Dummy node used for n8n training |  |
| Date & Time | Allows you to manipulate date and time values |  |
| Dropcontact | Find B2B emails and enrich contacts | ✓ |
| Edit Image | Edits an image like blur, resize or adding border an... |  |
| Elastic Security | Consume the Elastic Security API | ✓ |
| Elasticsearch | Consume the Elasticsearch API | ✓ |
| Execute Command | Executes a command on the host |  |
| Execute Sub-workflow | Execute another workflow |  |
| Facebook Graph API | Interacts with Facebook using the Graph API | ✓ |
| Filter | Remove items matching a condition |  |
| Freshservice | Consume the Freshservice API | ✓ |
| Freshworks CRM | Consume the Freshworks CRM API | ✓ |
| Function | Run custom function code which gets executed once an... |  |
| Function Item | Run custom function code which gets executed once pe... |  |
| Git | Control git. | ✓ |
| Gmail | Consume the Gmail API |  |
| Gong | Interact with Gong API | ✓ |
| Google Ads | Use the Google Ads API | ✓ |
| Google Analytics | Use the Google Analytics API |  |
| Google Cloud Storage | Use the Google Cloud Storage API | ✓ |
| Google Perspective | Consume Google Perspective API | ✓ |
| GoToWebinar | Consume the GoToWebinar API | ✓ |
| Grafana | Consume the Grafana API | ✓ |
| Hacker News | Consume Hacker News API |  |
| HighLevel | Consume HighLevel API |  |
| HTML | Work with HTML |  |
| HTML Extract | Extracts data from HTML |  |
| If | Route items to different branches (true/false) |  |
| Jina AI | Interact with Jina AI API | ✓ |
| JWT | JWT | ✓ |
| Kafka | Sends messages to a Kafka topic | ✓ |
| KoBoToolbox | Work with KoBoToolbox forms and submissions | ✓ |
| Ldap | Interact with LDAP servers | ✓ |
| Lemlist | Consume the Lemlist API |  |
| Limit | Restrict the number of items |  |
| LoneScale | Create List, add / delete items | ✓ |
| Mailcheck | Consume Mailcheck API | ✓ |
| Marketstack | Consume Marketstack API | ✓ |
| Merge | Merges data of multiple streams once data from both ... |  |
| Metabase | Use the Metabase API | ✓ |
| Microsoft Entra ID | Interact with Microsoft Entra ID API | ✓ |
| Microsoft Graph Security | Consume the Microsoft Graph Security API | ✓ |
| Microsoft Outlook | Consume Microsoft Outlook API |  |
| Microsoft SharePoint | Interact with Microsoft SharePoint API | ✓ |
| MISP | Consume the MISP API | ✓ |
| Mistral AI | Consume Mistral AI API | ✓ |
| Mocean | Send SMS and voice messages via Mocean | ✓ |
| Monica CRM | Consume the Monica CRM API | ✓ |
| MSG91 | Sends transactional SMS via MSG91 | ✓ |
| n8n | Handle events and perform actions on your n8n instance | ✓ |
| NASA | Retrieve data from the NASA API | ✓ |
| Netlify | Consume Netlify API | ✓ |
| Odoo | Consume Odoo API | ✓ |
| Okta | Use the Okta API | ✓ |
| One Simple API | A toolbox of no-code utilities | ✓ |
| OpenAI | Consume Open AI | ✓ |
| Perplexity | Interact with the Perplexity API to generate AI resp... | ✓ |
| Pipedrive | Create and edit data in Pipedrive | ✓ |
| Plivo | Send SMS/MMS messages or make phone calls | ✓ |
| PostBin | Consume PostBin API |  |
| QuickBooks Online | Consume the QuickBooks Online API | ✓ |
| RabbitMQ | Sends messages to a RabbitMQ topic | ✓ |
| Raindrop | Consume the Raindrop API | ✓ |
| Reddit | Consume the Reddit API | ✓ |
| Remove Duplicates | Delete items with matching field values |  |
| Rename Keys | Update item field names |  |
| Respond to Webhook | Returns data for Webhook | ✓ |
| Rundeck | Manage Rundeck API | ✓ |
| SecurityScorecard | Consume SecurityScorecard API | ✓ |
| SendGrid | Consume SendGrid API | ✓ |
| seven | Send SMS and make text-to-speech calls | ✓ |
| SIGNL4 | Consume SIGNL4 API | ✓ |
| Sort | Change items order |  |
| Split Out | Turn a list inside item(s) into separate items |  |
| Splunk | Consume the Splunk Enterprise API |  |
| Spreadsheet File | Reads and writes data from a spreadsheet file like C... |  |
| Stackby | Read, write, and delete data in Stackby | ✓ |
| Stripe | Consume the Stripe API | ✓ |
| Summarize | Sum, count, max, etc. across items |  |
| Switch | Route items depending on defined expression or rules |  |
| Taiga | Consume Taiga API | ✓ |
| Tapfiliate | Consume Tapfiliate API | ✓ |
| TheHive | Consume TheHive API | ✓ |
| TheHive 5 | Consume TheHive 5 API | ✓ |
| TOTP | Generate a time-based one-time password | ✓ |
| Trello | Create, change and delete boards and cards | ✓ |
| Twake | Consume Twake API | ✓ |
| Twilio | Send SMS and WhatsApp messages or make phone calls | ✓ |
| Unleashed Software | Consume Unleashed Software API | ✓ |
| urlscan.io | Provides various utilities for monitoring websites l... | ✓ |
| Webex by Cisco | Consume the Cisco Webex API | ✓ |
| Webflow | Consume the Webflow API |  |
| Wekan | Consume Wekan API | ✓ |
| Wise | Consume the Wise API | ✓ |
| XML | Convert data from and to XML |  |
| Zoho CRM | Consume Zoho CRM API | ✓ |

[⬆ Back to top](#-n8n-nodes-cheat-guide)

---

## 📥 Data Sources

> 107 nodes in this category

| Node | Description | Auth |
|------|-------------|:----:|
| Airtable | Read, update, write and delete data from Airtable |  |
| Asana | Consume Asana REST API | ✓ |
| Autopilot | Consume Autopilot API | ✓ |
| Box | Consume Box API | ✓ |
| Chargebee | Retrieve data from Chargebee API | ✓ |
| Cloudflare | Consume Cloudflare API | ✓ |
| Contentful | Consume Contentful API | ✓ |
| Convert to File | Convert JSON data to binary data |  |
| ConvertKit | Consume ConvertKit API | ✓ |
| CrateDB | Add and update data in CrateDB | ✓ |
| Data table | Permanently save data across workflow executions in ... |  |
| DeepL | Translate data using DeepL | ✓ |
| DHL | Consume DHL API | ✓ |
| Discourse | Consume Discourse API | ✓ |
| Disqus | Access data on Disqus | ✓ |
| Dropbox | Access data on Dropbox | ✓ |
| Emelia | Consume the Emelia API | ✓ |
| Execution Data | Add execution data for search |  |
| Extract from File | Convert binary data to JSON |  |
| FileMaker | Retrieve data from the FileMaker data API | ✓ |
| FTP | Transfer files via FTP or SFTP | ✓ |
| GetResponse | Consume GetResponse API | ✓ |
| Ghost | Consume Ghost API | ✓ |
| GitHub | Consume GitHub API | ✓ |
| GitLab | Retrieve data from GitLab API | ✓ |
| Google BigQuery | Consume Google BigQuery API |  |
| Google Books | Read data from Google Books | ✓ |
| Google Business Profile | Consume Google Business Profile API | ✓ |
| Google Calendar | Consume Google Calendar API | ✓ |
| Google Chat | Consume Google Chat API | ✓ |
| Google Cloud Firestore | Interact with Google Firebase - Cloud Firestore API | ✓ |
| Google Cloud Natural Language | Consume Google Cloud Natural Language API | ✓ |
| Google Cloud Realtime Database | Interact with Google Firebase - Realtime Database API | ✓ |
| Google Contacts | Consume Google Contacts API | ✓ |
| Google Docs | Consume Google Docs API. | ✓ |
| Google Drive | Access data on Google Drive |  |
| Google Sheets | Read, update and write data to Google Sheets |  |
| Google Slides | Consume the Google Slides API | ✓ |
| Google Tasks | Consume Google Tasks API | ✓ |
| Google Translate | Translate data using Google Translate | ✓ |
| Google Workspace Admin | Consume Google Workspace Admin API | ✓ |
| Gotify | Consume Gotify API | ✓ |
| GraphQL | Makes a GraphQL request and returns the received data | ✓ |
| Grist | Consume the Grist API | ✓ |
| HaloPSA | Consume HaloPSA API | ✓ |
| Harvest | Access data on Harvest | ✓ |
| Help Scout | Consume Help Scout API | ✓ |
| iCalendar | Create iCalendar file |  |
| Item Lists | Helper for working with lists of items and transform... |  |
| Iterable | Consume Iterable API | ✓ |
| Keap | Consume Keap API | ✓ |
| Line | Consume Line API | ✓ |
| LinkedIn | Consume LinkedIn API | ✓ |
| Magento 2 | Consume Magento API | ✓ |
| MailerLite | Consume MailerLite API |  |
| Microsoft Dynamics CRM | Consume Microsoft Dynamics CRM API | ✓ |
| Microsoft Excel 365 | Consume Microsoft Excel API |  |
| Microsoft OneDrive | Consume Microsoft OneDrive API | ✓ |
| Microsoft SQL | Get, add and update data in Microsoft SQL | ✓ |
| Microsoft Teams | Consume Microsoft Teams API |  |
| Microsoft To Do | Consume Microsoft To Do API. | ✓ |
| Mindee | Consume Mindee API | ✓ |
| MongoDB | Find, insert and update documents in MongoDB | ✓ |
| MQTT | Push messages to MQTT | ✓ |
| MySQL | Get, add and update data in MySQL |  |
| n8n Form | Generate webforms in n8n and pass their responses to... |  |
| Nextcloud | Access data on Nextcloud | ✓ |
| NocoDB | Read, update, write and delete data from NocoDB | ✓ |
| Npm | Consume NPM registry API | ✓ |
| Onfleet | Consume Onfleet API | ✓ |
| OpenWeatherMap | Gets current and future weather information | ✓ |
| Oracle Database | Get, add and update data in Oracle database | ✓ |
| Phantombuster | Consume Phantombuster API | ✓ |
| Philips Hue | Consume Philips Hue API | ✓ |
| Postgres | Get, add and update data in Postgres |  |
| PostHog | Consume PostHog API | ✓ |
| Pushbullet | Consume Pushbullet API | ✓ |
| Pushcut | Consume Pushcut API | ✓ |
| Pushover | Consume Pushover API | ✓ |
| QuestDB | Get, add and update data in QuestDB | ✓ |
| Quick Base | Integrate with the Quick Base RESTful API | ✓ |
| Read Binary File | Reads a binary file from disk |  |
| Read Binary Files | Reads binary files from disk |  |
| Read PDF | Reads a PDF and extracts its content |  |
| Read/Write Files from Disk | Read or write files from the computer that runs n8n |  |
| Redis | Get, send and update data in Redis | ✓ |
| RSS Read | Reads data from an RSS Feed |  |
| Sendy | Consume Sendy API | ✓ |
| Set | Add or edit fields on an input item and optionally r... |  |
| Snowflake | Get, add and update data in Snowflake | ✓ |
| Spotify | Access public song data via the Spotify API | ✓ |
| SSH | Execute commands via SSH | ✓ |
| Start | Starts the workflow execution from this node |  |
| Sticky Note | Make your workflow easier to understand |  |
| Stop and Error | Throw an error in the workflow |  |
| Strapi | Consume Strapi API | ✓ |
| Strava | Consume Strava API | ✓ |
| Supabase | Add, get, delete and update data in a table | ✓ |
| TimescaleDB | Add and update data in TimescaleDB | ✓ |
| Twist | Consume Twist API | ✓ |
| Venafi TLS Protect Cloud | Consume Venafi TLS Protect Cloud API | ✓ |
| Venafi TLS Protect Datacenter | Consume Venafi TLS Protect Datacenter | ✓ |
| Vonage | Consume Vonage API | ✓ |
| Yourls | Consume Yourls API | ✓ |
| YouTube | Consume YouTube API | ✓ |
| Zammad | Consume the Zammad API | ✓ |
| Zoom | Consume Zoom API | ✓ |

[⬆ Back to top](#-n8n-nodes-cheat-guide)

---

## 📤 Data Destinations

> 96 nodes in this category

| Node | Description | Auth |
|------|-------------|:----:|
| Affinity | Consume Affinity API | ✓ |
| AWS Certificate Manager | Sends data to AWS Certificate Manager |  |
| AWS Cognito | Sends data to AWS Cognito | ✓ |
| AWS Comprehend | Sends data to Amazon Comprehend |  |
| AWS ELB | Sends data to AWS ELB API |  |
| AWS IAM | Interacts with Amazon IAM | ✓ |
| AWS Lambda | Invoke functions on AWS Lambda |  |
| AWS Rekognition | Sends data to AWS Rekognition |  |
| AWS SES | Sends data to AWS SES |  |
| AWS SNS | Sends data to AWS SNS |  |
| AWS SQS | Sends messages to AWS SQS |  |
| AWS Textract | Sends data to Amazon Textract |  |
| AWS Transcribe | Sends data to AWS Transcribe | ✓ |
| AwsS3 | Sends data to AWS S3 |  |
| Bannerbear | Consume Bannerbear API | ✓ |
| Baserow | Consume the Baserow API | ✓ |
| Beeminder | Consume Beeminder API | ✓ |
| Bitly | Consume Bitly API | ✓ |
| Brandfetch | Consume Brandfetch API | ✓ |
| CircleCI | Consume CircleCI API | ✓ |
| Clearbit | Consume Clearbit API | ✓ |
| ClickUp | Consume ClickUp API (Beta) | ✓ |
| Cockpit | Consume Cockpit API | ✓ |
| Coda | Consume Coda API | ✓ |
| CoinGecko | Consume CoinGecko API |  |
| Customer.io | Consume Customer.io API | ✓ |
| DebugHelper | Causes problems intentionally and generates useful d... |  |
| Demio | Consume the Demio API | ✓ |
| Discord | Sends data to Discord |  |
| Drift | Consume Drift API | ✓ |
| E-goi | Consume E-goi API | ✓ |
| E2E Test | Dummy node used for e2e testing |  |
| ERPNext | Consume ERPNext API | ✓ |
| Flow | Consume Flow API | ✓ |
| Freshdesk | Consume Freshdesk API | ✓ |
| Home Assistant | Consume Home Assistant API | ✓ |
| HTTP Request | Makes an HTTP request and returns the response data |  |
| HubSpot | Consume HubSpot API |  |
| Humantic AI | Consume Humantic AI API | ✓ |
| Hunter | Consume Hunter API | ✓ |
| Intercom | Consume Intercom API | ✓ |
| Invoice Ninja | Consume Invoice Ninja API | ✓ |
| Jenkins | Consume Jenkins API | ✓ |
| Jira Software | Consume Jira Software API | ✓ |
| Linear | Consume Linear API | ✓ |
| LingvaNex | Consume LingvaNex API | ✓ |
| Mailchimp | Consume Mailchimp API | ✓ |
| Mailgun | Sends an email via Mailgun | ✓ |
| Mailjet | Consume Mailjet API | ✓ |
| Mandrill | Consume Mandrill API | ✓ |
| Markdown | Convert data between Markdown and HTML |  |
| Matrix | Consume Matrix API | ✓ |
| Mattermost | Sends data to Mattermost |  |
| Mautic | Consume Mautic API | ✓ |
| Medium | Consume Medium API | ✓ |
| MessageBird | Sends SMS via MessageBird | ✓ |
| Monday.com | Consume Monday.com API | ✓ |
| Netscaler ADC | Consume Netscaler ADC API | ✓ |
| Notion | Consume Notion API |  |
| OpenThesaurus | Get synonmns for German words using the OpenThesauru... |  |
| Orbit | Consume Orbit API | ✓ |
| Oura | Consume Oura API | ✓ |
| Paddle | Consume Paddle API | ✓ |
| PagerDuty | Consume PagerDuty API | ✓ |
| PayPal | Consume PayPal API | ✓ |
| Peekalink | Consume the Peekalink API | ✓ |
| ProfitWell | Consume ProfitWell API | ✓ |
| QuickChart | Create a chart via QuickChart |  |
| RocketChat | Consume RocketChat API | ✓ |
| S3 | Sends data to any S3-compatible service | ✓ |
| Salesforce | Consume Salesforce API | ✓ |
| Salesmate | Consume Salesmate API | ✓ |
| SeaTable | Read, update, write and delete data from SeaTable |  |
| Segment | Consume Segment API | ✓ |
| Send Email | Sends an email using SMTP protocol |  |
| Sentry.io | Consume Sentry.io API | ✓ |
| ServiceNow | Consume ServiceNow API | ✓ |
| Shopify | Consume Shopify API | ✓ |
| Slack | Consume Slack API |  |
| Storyblok | Consume Storyblok API | ✓ |
| SyncroMSP | Manage contacts, tickets and more from Syncro MSP |  |
| Telegram | Sends data to Telegram | ✓ |
| Todoist | Consume Todoist API |  |
| TravisCI | Consume TravisCI API | ✓ |
| Uplead | Consume Uplead API | ✓ |
| uProc | Consume uProc API | ✓ |
| UptimeRobot | Consume UptimeRobot API | ✓ |
| Vero | Consume Vero API | ✓ |
| WhatsApp Business Cloud | Access WhatsApp API |  |
| WooCommerce | Consume WooCommerce API | ✓ |
| Wordpress | Consume Wordpress API | ✓ |
| Write Binary File | Writes a binary file to disk |  |
| X (Formerly Twitter) | Consume the X API |  |
| Xero | Consume Xero API | ✓ |
| Zendesk | Consume Zendesk API | ✓ |
| Zulip | Consume Zulip API | ✓ |

[⬆ Back to top](#-n8n-nodes-cheat-guide)

---

## 🗂️ Flow Control

> 5 nodes in this category

| Node | Description | Auth |
|------|-------------|:----:|
| No Operation, do nothing | No Operation |  |
| Simulate | Simulate a node |  |
| Split In Batches | Split data into batches and iterate over each batch |  |
| Track Time Saved | Dynamically track time saved based on the workflow’s... |  |
| Wait | Wait before continue with execution |  |

[⬆ Back to top](#-n8n-nodes-cheat-guide)

---

## 🔤 Alphabetical Index

<details>
<summary>Click to expand full alphabetical list</summary>


**A**
- 🔄 Action Network 🔐
- 🔄 ActiveCampaign 🔐
- ⚡ ActiveCampaign Trigger 🔐
- ⚡ Acuity Scheduling Trigger 🔐
- 🔄 Adalo 🔐
- 📤 Affinity 🔐
- ⚡ Affinity Trigger 🔐
- 🔄 Aggregate
- 🔄 Agile CRM 🔐
- 🔄 AI Transform
- 📥 Airtable
- ⚡ Airtable Trigger 🔐
- 🔄 Airtop 🔐
- 🔄 AMQP Sender 🔐
- ⚡ AMQP Trigger 🔐
- 🔄 APITemplate.io 🔐
- 📥 Asana 🔐
- ⚡ Asana Trigger 🔐
- 📥 Autopilot 🔐
- ⚡ Autopilot Trigger 🔐
- 📤 AWS Certificate Manager
- 📤 AWS Cognito 🔐
- 📤 AWS Comprehend
- 🔄 AWS DynamoDB
- 📤 AWS ELB
- 📤 AWS IAM 🔐
- 📤 AWS Lambda
- 📤 AWS Rekognition
- 📤 AWS SES
- 📤 AWS SNS
- ⚡ AWS SNS Trigger
- 📤 AWS SQS
- 📤 AWS Textract
- 📤 AWS Transcribe 🔐
- 📤 AwsS3
- 🔄 Azure Cosmos DB 🔐
- 🔄 Azure Storage 🔐

**B**
- 🔄 BambooHr 🔐
- 📤 Bannerbear 🔐
- 📤 Baserow 🔐
- 📤 Beeminder 🔐
- ⚡ Bitbucket Trigger 🔐
- 📤 Bitly 🔐
- 🔄 Bitwarden 🔐
- 📥 Box 🔐
- ⚡ Box Trigger 🔐
- 📤 Brandfetch 🔐
- 🔄 Brevo 🔐
- ⚡ Brevo Trigger 🔐
- 🔄 Bubble 🔐

**C**
- ⚡ Cal.com Trigger 🔐
- ⚡ Calendly Trigger 🔐
- 📥 Chargebee 🔐
- ⚡ Chargebee Trigger
- 📤 CircleCI 🔐
- 📤 Clearbit 🔐
- 📤 ClickUp 🔐
- ⚡ ClickUp Trigger 🔐
- 🔄 Clockify 🔐
- ⚡ Clockify Trigger 🔐
- 📥 Cloudflare 🔐
- 📤 Cockpit 🔐
- 📤 Coda 🔐
- 🔄 Code
- 📤 CoinGecko
- 🔄 Compare Datasets
- 🔄 Compression
- 📥 Contentful 🔐
- 📥 Convert to File
- 🔄 Convert to/from binary data
- 📥 ConvertKit 🔐
- ⚡ ConvertKit Trigger 🔐
- 🔄 Copper 🔐
- ⚡ Copper Trigger 🔐
- 🔄 Cortex 🔐
- 📥 CrateDB 🔐
- ⚡ Cron
- 🔄 Crypto
- 🔄 Customer Datastore (n8n training)
- 🔄 Customer Messenger (n8n training)
- 📤 Customer.io 🔐
- ⚡ Customer.io Trigger 🔐

**D**
- 📥 Data table
- 🔄 Date & Time
- 📤 DebugHelper
- 📥 DeepL 🔐
- 📤 Demio 🔐
- 📥 DHL 🔐
- 📤 Discord
- 📥 Discourse 🔐
- 📥 Disqus 🔐
- 📤 Drift 🔐
- 📥 Dropbox 🔐
- 🔄 Dropcontact 🔐

**E**
- 📤 E-goi 🔐
- 📤 E2E Test
- 🔄 Edit Image
- 🔄 Elastic Security 🔐
- 🔄 Elasticsearch 🔐
- ⚡ Email Trigger (IMAP)
- 📥 Emelia 🔐
- ⚡ Emelia Trigger 🔐
- 📤 ERPNext 🔐
- ⚡ Error Trigger
- ⚡ Eventbrite Trigger 🔐
- 🔄 Execute Command
- 🔄 Execute Sub-workflow
- ⚡ Execute Workflow Trigger
- 📥 Execution Data
- 📥 Extract from File

**F**
- 🔄 Facebook Graph API 🔐
- ⚡ Facebook Lead Ads Trigger 🔐
- ⚡ Facebook Trigger 🔐
- ⚡ Figma Trigger (Beta) 🔐
- 📥 FileMaker 🔐
- 🔄 Filter
- 📤 Flow 🔐
- ⚡ Flow Trigger 🔐
- ⚡ Form.io Trigger 🔐
- ⚡ Formstack Trigger 🔐
- 📤 Freshdesk 🔐
- 🔄 Freshservice 🔐
- 🔄 Freshworks CRM 🔐
- 📥 FTP 🔐
- 🔄 Function
- 🔄 Function Item

**G**
- 📥 GetResponse 🔐
- ⚡ GetResponse Trigger 🔐
- 📥 Ghost 🔐
- 🔄 Git 🔐
- 📥 GitHub 🔐
- ⚡ Github Trigger 🔐
- 📥 GitLab 🔐
- ⚡ GitLab Trigger 🔐
- 🔄 Gmail
- ⚡ Gmail Trigger 🔐
- 🔄 Gong 🔐
- 🔄 Google Ads 🔐
- 🔄 Google Analytics
- 📥 Google BigQuery
- 📥 Google Books 🔐
- 📥 Google Business Profile 🔐
- ⚡ Google Business Profile Trigger 🔐
- 📥 Google Calendar 🔐
- ⚡ Google Calendar Trigger 🔐
- 📥 Google Chat 🔐
- 📥 Google Cloud Firestore 🔐
- 📥 Google Cloud Natural Language 🔐
- 📥 Google Cloud Realtime Database 🔐
- 🔄 Google Cloud Storage 🔐
- 📥 Google Contacts 🔐
- 📥 Google Docs 🔐
- 📥 Google Drive
- ⚡ Google Drive Trigger 🔐
- 🔄 Google Perspective 🔐
- 📥 Google Sheets
- ⚡ Google Sheets Trigger 🔐
- 📥 Google Slides 🔐
- 📥 Google Tasks 🔐
- 📥 Google Translate 🔐
- 📥 Google Workspace Admin 🔐
- 📥 Gotify 🔐
- 🔄 GoToWebinar 🔐
- 🔄 Grafana 🔐
- 📥 GraphQL 🔐
- 📥 Grist 🔐
- ⚡ Gumroad Trigger 🔐

**H**
- 🔄 Hacker News
- 📥 HaloPSA 🔐
- 📥 Harvest 🔐
- 📥 Help Scout 🔐
- ⚡ Help Scout Trigger 🔐
- 🔄 HighLevel
- 📤 Home Assistant 🔐
- 🔄 HTML
- 🔄 HTML Extract
- 📤 HTTP Request
- 📤 HubSpot
- ⚡ HubSpot Trigger 🔐
- 📤 Humantic AI 🔐
- 📤 Hunter 🔐

**I**
- 📥 iCalendar
- 🔄 If
- 📤 Intercom 🔐
- ⚡ Interval
- 📤 Invoice Ninja 🔐
- ⚡ Invoice Ninja Trigger 🔐
- 📥 Item Lists
- 📥 Iterable 🔐

**J**
- 📤 Jenkins 🔐
- 🔄 Jina AI 🔐
- 📤 Jira Software 🔐
- ⚡ Jira Trigger 🔐
- ⚡ Jotform Trigger 🔐
- 🔄 JWT 🔐

**K**
- 🔄 Kafka 🔐
- ⚡ Kafka Trigger 🔐
- 📥 Keap 🔐
- ⚡ Keap Trigger 🔐
- 🔄 KoBoToolbox 🔐
- ⚡ KoBoToolbox Trigger 🔐

**L**
- 🔄 Ldap 🔐
- 🔄 Lemlist
- ⚡ Lemlist Trigger 🔐
- 🔄 Limit
- 📥 Line 🔐
- 📤 Linear 🔐
- ⚡ Linear Trigger 🔐
- 📤 LingvaNex 🔐
- 📥 LinkedIn 🔐
- ⚡ Local File Trigger
- 🔄 LoneScale 🔐
- ⚡ LoneScale Trigger 🔐

**M**
- 📥 Magento 2 🔐
- 🔄 Mailcheck 🔐
- 📤 Mailchimp 🔐
- ⚡ Mailchimp Trigger 🔐
- 📥 MailerLite
- ⚡ MailerLite Trigger
- 📤 Mailgun 🔐
- 📤 Mailjet 🔐
- ⚡ Mailjet Trigger 🔐
- 📤 Mandrill 🔐
- ⚡ Manual Trigger
- 📤 Markdown
- 🔄 Marketstack 🔐
- 📤 Matrix 🔐
- 📤 Mattermost
- 📤 Mautic 🔐
- ⚡ Mautic Trigger 🔐
- 📤 Medium 🔐
- 🔄 Merge
- 📤 MessageBird 🔐
- 🔄 Metabase 🔐
- 📥 Microsoft Dynamics CRM 🔐
- 🔄 Microsoft Entra ID 🔐
- 📥 Microsoft Excel 365
- 🔄 Microsoft Graph Security 🔐
- 📥 Microsoft OneDrive 🔐
- ⚡ Microsoft OneDrive Trigger 🔐
- 🔄 Microsoft Outlook
- ⚡ Microsoft Outlook Trigger 🔐
- 🔄 Microsoft SharePoint 🔐
- 📥 Microsoft SQL 🔐
- 📥 Microsoft Teams
- ⚡ Microsoft Teams Trigger 🔐
- 📥 Microsoft To Do 🔐
- 📥 Mindee 🔐
- 🔄 MISP 🔐
- 🔄 Mistral AI 🔐
- 🔄 Mocean 🔐
- 📤 Monday.com 🔐
- 📥 MongoDB 🔐
- 🔄 Monica CRM 🔐
- 📥 MQTT 🔐
- ⚡ MQTT Trigger 🔐
- 🔄 MSG91 🔐
- 📥 MySQL

**N**
- 🔄 n8n 🔐
- 📥 n8n Form
- ⚡ n8n Form Trigger
- ⚡ n8n Trigger
- 🔄 NASA 🔐
- 🔄 Netlify 🔐
- ⚡ Netlify Trigger 🔐
- 📤 Netscaler ADC 🔐
- 📥 Nextcloud 🔐
- 🗂️ No Operation, do nothing
- 📥 NocoDB 🔐
- 📤 Notion
- ⚡ Notion Trigger 🔐
- 📥 Npm 🔐

**O**
- 🔄 Odoo 🔐
- 🔄 Okta 🔐
- 🔄 One Simple API 🔐
- 📥 Onfleet 🔐
- ⚡ Onfleet Trigger 🔐
- 🔄 OpenAI 🔐
- 📤 OpenThesaurus
- 📥 OpenWeatherMap 🔐
- 📥 Oracle Database 🔐
- 📤 Orbit 🔐
- 📤 Oura 🔐

**P**
- 📤 Paddle 🔐
- 📤 PagerDuty 🔐
- 📤 PayPal 🔐
- ⚡ PayPal Trigger 🔐
- 📤 Peekalink 🔐
- 🔄 Perplexity 🔐
- 📥 Phantombuster 🔐
- 📥 Philips Hue 🔐
- 🔄 Pipedrive 🔐
- ⚡ Pipedrive Trigger 🔐
- 🔄 Plivo 🔐
- 🔄 PostBin
- 📥 Postgres
- ⚡ Postgres Trigger 🔐
- 📥 PostHog 🔐
- ⚡ Postmark Trigger 🔐
- 📤 ProfitWell 🔐
- 📥 Pushbullet 🔐
- 📥 Pushcut 🔐
- ⚡ Pushcut Trigger 🔐
- 📥 Pushover 🔐

**Q**
- 📥 QuestDB 🔐
- 📥 Quick Base 🔐
- 🔄 QuickBooks Online 🔐
- 📤 QuickChart

**R**
- 🔄 RabbitMQ 🔐
- ⚡ RabbitMQ Trigger 🔐
- 🔄 Raindrop 🔐
- 📥 Read Binary File
- 📥 Read Binary Files
- 📥 Read PDF
- 📥 Read/Write Files from Disk
- 🔄 Reddit 🔐
- 📥 Redis 🔐
- ⚡ Redis Trigger 🔐
- 🔄 Remove Duplicates
- 🔄 Rename Keys
- 🔄 Respond to Webhook 🔐
- 📤 RocketChat 🔐
- ⚡ RSS Feed Trigger
- 📥 RSS Read
- 🔄 Rundeck 🔐

**S**
- 📤 S3 🔐
- 📤 Salesforce 🔐
- ⚡ Salesforce Trigger 🔐
- 📤 Salesmate 🔐
- ⚡ Schedule Trigger
- 📤 SeaTable
- ⚡ SeaTable Trigger
- 🔄 SecurityScorecard 🔐
- 📤 Segment 🔐
- 📤 Send Email
- 🔄 SendGrid 🔐
- 📥 Sendy 🔐
- 📤 Sentry.io 🔐
- 📤 ServiceNow 🔐
- 📥 Set
- 🔄 seven 🔐
- 📤 Shopify 🔐
- ⚡ Shopify Trigger 🔐
- 🔄 SIGNL4 🔐
- 🗂️ Simulate
- ⚡ Simulate Trigger
- 📤 Slack
- ⚡ Slack Trigger 🔐
- 📥 Snowflake 🔐
- 🔄 Sort
- 🗂️ Split In Batches
- 🔄 Split Out
- 🔄 Splunk
- 📥 Spotify 🔐
- 🔄 Spreadsheet File
- ⚡ SSE Trigger
- 📥 SSH 🔐
- 🔄 Stackby 🔐
- 📥 Start
- 📥 Sticky Note
- 📥 Stop and Error
- 📤 Storyblok 🔐
- 📥 Strapi 🔐
- 📥 Strava 🔐
- ⚡ Strava Trigger 🔐
- 🔄 Stripe 🔐
- ⚡ Stripe Trigger 🔐
- 🔄 Summarize
- 📥 Supabase 🔐
- ⚡ SurveyMonkey Trigger 🔐
- 🔄 Switch
- 📤 SyncroMSP

**T**
- 🔄 Taiga 🔐
- ⚡ Taiga Trigger 🔐
- 🔄 Tapfiliate 🔐
- 📤 Telegram 🔐
- ⚡ Telegram Trigger 🔐
- 🔄 TheHive 🔐
- 🔄 TheHive 5 🔐
- ⚡ TheHive 5 Trigger
- ⚡ TheHive Trigger
- 📥 TimescaleDB 🔐
- 📤 Todoist
- ⚡ Toggl Trigger 🔐
- 🔄 TOTP 🔐
- 🗂️ Track Time Saved
- 📤 TravisCI 🔐
- 🔄 Trello 🔐
- ⚡ Trello Trigger 🔐
- 🔄 Twake 🔐
- 🔄 Twilio 🔐
- ⚡ Twilio Trigger 🔐
- 📥 Twist 🔐
- ⚡ Typeform Trigger 🔐

**U**
- 🔄 Unleashed Software 🔐
- 📤 Uplead 🔐
- 📤 uProc 🔐
- 📤 UptimeRobot 🔐
- 🔄 urlscan.io 🔐

**V**
- 📥 Venafi TLS Protect Cloud 🔐
- ⚡ Venafi TLS Protect Cloud Trigger 🔐
- 📥 Venafi TLS Protect Datacenter 🔐
- ⚡ Venafi TLS Protect Datacenter Trigger 🔐
- 📤 Vero 🔐
- 📥 Vonage 🔐

**W**
- 🗂️ Wait
- 🔄 Webex by Cisco 🔐
- ⚡ Webex by Cisco Trigger 🔐
- 🔄 Webflow
- ⚡ Webflow Trigger
- ⚡ Webhook
- 🔄 Wekan 🔐
- 📤 WhatsApp Business Cloud
- ⚡ WhatsApp Trigger 🔐
- 🔄 Wise 🔐
- ⚡ Wise Trigger 🔐
- 📤 WooCommerce 🔐
- ⚡ WooCommerce Trigger 🔐
- 📤 Wordpress 🔐
- ⚡ Workable Trigger 🔐
- ⚡ Workflow Trigger
- 📤 Write Binary File
- ⚡ Wufoo Trigger 🔐

**X**
- 📤 X (Formerly Twitter)
- 📤 Xero 🔐
- 🔄 XML

**Y**
- 📥 Yourls 🔐
- 📥 YouTube 🔐

**Z**
- 📥 Zammad 🔐
- 📤 Zendesk 🔐
- ⚡ Zendesk Trigger 🔐
- 🔄 Zoho CRM 🔐
- 📥 Zoom 🔐
- 📤 Zulip 🔐

</details>

---

## 📝 About This Guide

This cheat guide was automatically generated from the [n8n repository](https://github.com/n8n-io/n8n).

**Source:** `packages/nodes-base/nodes/`

**Generated:** 2025-12-14

**License:** [Fair-code](https://github.com/n8n-io/n8n/blob/master/LICENSE.md)
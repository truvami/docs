---
sidebar_label: REST API
title: REST API
---

## Overview

Truvami offers a REST API to access and manage your resources. The API can be accessed using the following base URLs:

-   **Production:** `https://api.truvami.com`
-   **Staging:** `https://api.dev.truvami.com`

All API responses are in **JSON** format.

---

## Authentication

Authentication is handled via API keys. Each request must include an `X-Api-Key` header.

```
X-Api-Key: <YOUR_API_KEY>
```

The API key that is used to authenticate the request.
If you do not have an API key, please contact us at hey@truvami.com.

---

## Code Examples

Here are some basic examples of how to make a request to the API.

### cURL

```bash
curl -X GET "https://api.truvami.com/v1/devices" \
     -H "X-Api-Key: <YOUR_API_KEY>"
```

### JavaScript (Fetch)

```javascript
const apiKey = '<YOUR_API_KEY>';
const url = 'https://api.truvami.com/v1/devices';

fetch(url, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## Scopes

API keys are associated with scopes, which determine which endpoints can be accessed. When requesting an API key, please specify the required scopes.

The following scopes are available:

| Scope                 | Description                                       |
| --------------------- | ------------------------------------------------- |
| `devices:read`        | Retrieve device information.                      |
| `devices:write`       | Update device information.                        |
| `uplinks:read`        | Retrieve uplink information.                      |
| `groups:read`         | Retrieve group information.                       |
| `groups:write`        | Update group information.                         |
| `gateways:read`       | Retrieve gateway information.                     |
| `gateways:write`      | Update gateway information.                       |
| `events:read`         | Retrieve event information.                       |
| `geofences:read`      | Retrieve geofence information.                    |
| `geofences:write`     | Create, update, and delete geofences.             |
| `alerts:read`         | Retrieve alert configuration information.         |
| `alerts:write`        | Create, update, and delete alert configurations.  |

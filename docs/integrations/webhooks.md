---
sidebar_label: Webhooks
title: Webhooks
---

## Overview

Truvami can forward decoded device messages to a custom webhook endpoint. This allows you to easily integrate truvami data into your own applications and services. All messages are sent as **JSON** in the body of a `POST` request.

You can create and manage your webhook integrations directly from the truvami dashboard.

## Custom Headers

To enhance security and provide more context, you can add custom HTTP headers to the webhook requests. This is configured in the truvami dashboard when you set up your webhook integration.

A common use case for custom headers is authentication. For example, you can add an `Authorization` header with a secret token to ensure that the requests are coming from truvami and not from an unauthorized source.

**Example:**
```
Authorization: Bearer your-secret-token
```

## Data Format

The data format is similar to the [Kafka integration](./kafka.md), with a `type` field indicating the message type and a `data` object containing the payload.

### Uplink

This is the most common message type, representing an uplink from a device.

**Example Payload:**
```json
{
  "data": {
    "port": 151,
    "uuid": "a51e653a-aeda-4e21-9393-b96a6e9b4578",
    "device": "10CE45FFFE00CDAF",
    "bestSnr": -0.5,
    "payload": "4c050145020a88",
    "bestRssi": -115,
    "customer": "68c36380-8e99-11ee-85b1-85699efa31ac",
    "worstSnr": -0.5,
    "confirmed": false,
    "createdAt": "2025-09-02T10:26:16Z",
    "deletedAt": null,
    "dutyCycle": null,
    "updatedAt": null,
    "worstRssi": -115,
    "averageSnr": -0.5,
    "receivedAt": "2025-09-02T10:26:20Z",
    "averageRssi": -115,
    "uplinkCounter": 85487,
    "consumedAirtime": 0,
    "downlinkCounter": 3709,
    "spreadingFactor": 7
  },
  "type": "uplink"
}
```

Other message types like `event`, `position`, `batteryStatus`, and `rotationStatus` follow the same structure as the Kafka integration.

## Filtering

When you configure a webhook integration in the truvami dashboard, you can apply filters to control which messages are sent to your endpoint.

- **Message Type**: You can select which message types you want to receive (e.g., `uplink`, `position`, `event`).
- **Port Filtering**: If you select the `uplink` message type, you can further filter messages by the LoRaWAN port number. This is useful for routing data from different sensors or applications on the same device.

## Use Case Example: Movement Detection

Webhooks can be used to build powerful real-time notification systems. For example, you can get notified whenever a device detects movement.

1.  **Enable Position Forwarding**: In your webhook integration settings, enable forwarding for the `position` message type.
2.  **Set up your Endpoint**: Create a webhook endpoint that receives the `position` messages.
3.  **Check for Movement**: In your endpoint's code, inspect the incoming JSON payload and check if the `moving` field inside the `data` object is `true`.
4.  **Trigger an Alarm**: If `moving` is `true`, you can trigger an action, such as sending an alert to a security system, logging the event, or sending a notification to your phone.

This provides a simple yet effective way to implement a basic alarm system based on device movement.

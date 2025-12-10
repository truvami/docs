---
sidebar_label: Alerts
sidebar_position: 10
---

# Alerts

Monitor and manage your alert system from this central dashboard.  
Alerts notify you when devices trigger specific events such as low battery, geofence transitions, device inactivity, or configuration changes.

## Overview

The **Alerts** page contains:

- A summary section with:
  - **Alert Configurations** – manage alert rules and conditions  
  - **Alert Targets** – manage destinations where alerts will be delivered (e.g., email, webhook)
- A searchable table listing all alerts triggered by your devices

### Search

Use the *Search by DevEUI* field to filter alerts belonging to a specific device.

### Column Selector

The column selector allows you to show or hide individual table columns for a personalized view.

### Table Columns

| Column | Description |
|--------|-------------|
| **DevEUI** | Unique identifier of the device that triggered the alert. |
| **Triggered At** | Timestamp of when the alert event occurred. |
| **Status** | Indicates whether the alert is active or has been cleared. |
| **References** | Additional contextual information, if available. |
| **Uplink** | Link to the uplink associated with the alert, when applicable. |
| **Config UUID** | Identifier of the alert configuration rule that triggered the alert. |
| **Target UUID** | Identifier of the alert delivery target. |
| **Alert ID** | The unique internal alert identifier. |
| **Uplink ID** | Identifier of the uplink event related to this alert. |

---

# Alert Configurations

Manage the rules that define *when* alerts are triggered.

The Alert Configurations page displays:

- A list of all available configuration rules
- Event type associated with each rule
- Scope (Customer-level or otherwise)
- Current status (Enabled/Disabled)
- Creation timestamp

A **Create Configuration** button allows adding new alert rules.

---

# Create Alert Configuration

Set up a new alert that will trigger based on device activity.

The creation wizard includes four steps:

## Step 1 — Basic Information

### Alert Name  
A short, descriptive title for the alert rule.

### Description (optional)  
Additional information about the purpose of this alert.

### Event Type  
Choose the event that should trigger the alert.  
Event types are grouped into categories, including:

- **Device Status**
  - Device Active
  - Device Inactive

- **Battery & Power**
  - Battery Low
  - Duty Cycle

- **Geofence & Location**
  - Geofence Entered
  - Geofence Exited
  - Geofence Stayed In

- **Rotation States**
  - Pouring
  - Mixing
  - Error
  - Undefined

- **Configuration Changes**
  - Config Change
  - Firmware Change

- **Resets & Maintenance**
  - Manual Reset
  - Automatic Reset

- **Schedules & Downlinks**
  - Downlink Scheduled
  - Config Downlink Scheduled
  - Buzzer Downlink Scheduled
  - Turnoff Downlink Scheduled
  - Accuracy Downlink Scheduled
  - Erase Downlink Scheduled

- **User Interactions**
  - Button Press

## Step 2 — Alert Scope

Choose what the alert should monitor:

- **Single Device** – targets one specific device  
- **Device Group** – applies to a group  
- **All Devices** – applies fleet-wide

(Additional steps follow based on the selected scope.)

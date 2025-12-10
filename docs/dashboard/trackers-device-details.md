---
sidebar_label: Trackers - Device Details
sidebar_position: 4
---

# Device Details

The **Device Details** page provides a complete overview of a specific tracker, including its identity, recent activity,
location history, uplinks, configuration, battery information, and linked alert rules.  
This view is opened by clicking a device entry in the **Trackers** list.

<br></br>

## Header Section

At the top of the page, key information about the device is displayed:

- **Device name**  
- **DevEUI**  
- **Device type** (e.g., Tag S)  
- **Battery status** (percentage, color-coded)  
- **Firmware version**  
- **Hardware version**  

An edit icon next to the device name allows renaming the device.

To the right, additional information is shown:

- **Last known position** (address, timestamp)  
- **Assigned group** (if any)  

A **Back to Trackers** button is available for navigation.

<br></br>

## Date Range Selector

A date/time selector in the top-right corner allows filtering the displayed timeline and positions.  
Users can select:

- custom start/end date  
- predefined ranges (e.g., Today, Yesterday)

This filter updates both the timeline and the positions table.

<br></br>

## Timeline

The **Timeline** section on the left provides a sequential list of location fixes for the selected time range.

Each entry includes:

- **Label number** (#1, #2, …)  
- **Timestamp**  
- **Distance** from the previous fix (e.g., 1m, 12m, 243m)  

Selecting a timeline entry updates the map to focus on that specific location.

At the bottom, a small details card shows:

- **Coordinates**  
- **Address resolution status**  
- **Fix source** (Altitude, WiFi, GNSS, Stationary)  
- **TraceId**  
- **Accuracy level** (e.g., Medium / ≤ 50 m)

<br></br>

---
sidebar_label: Uplinks
sidebar_position: 8
---

# Uplinks

The **Uplinks** page provides detailed visibility into all messages sent by devices to the LoRaWAN network.  
This view is essential for diagnostics, radio performance analysis, and validating that devices are sending data as expected.

Users can filter uplinks, inspect radio metrics, open individual uplink details, and decode payloads.

<br></br>

## Uplinks Table Overview

Each row in the uplinks table represents a single uplink message.  
Columns include:

- **Timestamp** – when the uplink was received  
- **DevEUI** – unique identifier of the sending device  
- **Port** – LoRaWAN Port value  
- **Payload** – raw payload bytes (hex-encoded)  
- **Best RSSI** – strongest received signal strength  
- **Best SNR** – highest signal-to-noise ratio  
- **Uplink counter** – frame counter value  
- **Spreading Factor** – SF used during transmission  
- **Confirmed** – whether the uplink was confirmed or not  

Clicking any uplink row opens the detailed uplink page.

<br></br>

## Filter Controls

At the top of the page, users can apply multiple filters:

### **Filter by Port**
Filters uplinks by LoRaWAN FPort.  
Selected ports appear as removable tags.

### **Filter by DevEUI**
Filters uplinks by device identifier.  
Pressing **Enter** is required after typing a DevEUI or port value to apply the filter.

Multiple filters may be active simultaneously.

<br></br>

## Date Range Selector

The date range selector allows filtering uplinks by a custom time interval.  
Clicking the date field opens:

- a monthly calendar  
- navigational arrows for switching months  
- **Start time** and **End time** pickers  

This enables precise filtering down to the minute.

<br></br>

## Quick Range Presets

Preset options allow fast filtering without using the calendar:

- **Today**  
- **Yesterday**  
- **Last week**  
- **Last month**  
- **Last 3 months**

Selecting a preset automatically reloads the uplinks list for the chosen period.

<br></br>

## Opening an Uplink Details Page

Clicking an uplink entry opens a dedicated detail page containing extensive information about that specific uplink.

This view includes:

- **Port**  
- **Best RSSI**  
- **Timestamp**  
- **Confirmed/Not confirmed**  
- **DevEUI** (with link to the device details)  
- **Spreading Factor**  
- **Counters** (uplink / downlink)  
- **Consumed airtime**  

A **Back to Uplinks** button allows returning to the list view.

<br></br>

# Uplink Details Page

## Summary Section

The top section of the uplink detail page displays key metadata:

- **Payload** (raw hex string)  
- **DevEUI** (link to the related tracker page)  
- **Spreading Factor**  
- **Consumed airtime**  
- **Best RSSI**  
- **Best SNR**  
- **Uplink counter**  
- **Downlink counter**  

<br></br>

## Positions

If location information is available, the **Positions** section displays:

- **Coordinate source** (e.g., LoRa)  
- **Latitude and longitude**  
- A **map** showing the resolved position  

Maps support zooming, panning, and marker inspection.

<br></br>

## Decoder

The **Decoder** section shows the payload decoded into structured JSON format.  
This section is used for understanding device data, telemetry values, battery status, configuration changes, and more.

An example decoded payload may look like:

```json
{
  "data": {
    "dutycycle": false,
    "configId": 0,
    "configChange": false,
    "lowBattery": false,
    "battery": "3.771v"
  },
  "traceId": "example-trace-id",
  "warnings": null
}
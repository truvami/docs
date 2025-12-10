---
sidebar_label: Settings
sidebar_position: 9
---

# Settings

The **Settings** page allows users to customize preferences that affect how data is displayed throughout the Truvami Dashboard.  
These options influence only the individual user’s interface and do not modify device behavior or global application settings.

<br></br>

## Default Time Format

The **Default time format** option lets users choose how timestamps appear across the dashboard, including:

- positions  
- uplinks  
- events  
- device details  
- timeline entries  

Selecting a preferred format ensures consistency when viewing or exporting data.

### Available Time Formats

The dropdown list includes multiple international and region-specific formats, such as:

- `21.09.2023 13:29`  
- `21.09.2023 13:29:00`  
- `2023-09-21 13:29`  
- `2023-09-21 13:29:00`  
- `09/21/2023 1:29 PM`  
- `Sep 21, 2023 1:29 PM`  
- `Sep 21, 2023 13:29`

Choosing one updates all timestamps instantly across the interface.

<br></br>

## Position Sources

This section allows users to enable or disable specific location sources.  
Changing these settings affects which types of position fixes are displayed, but **does not disable device-side positioning features**.

Disabling some sources may reduce the number of available positions or lower accuracy.

### Available Position Sources

#### **GNSS (Active) – Enabled**
Uses an onboard amplifier to improve signal strength and positioning accuracy.

Best for:
- outdoor environments  
- applications requiring high-precision GNSS  

#### **GNSS (Passive) – Enabled**
Relies directly on satellite signals without amplification.  
Suitable for short-range or power-sensitive applications.

#### **WiFi – Enabled**
Provides location based on Wi-Fi access point scans.  
Less accurate than GNSS but useful in indoor environments or urban areas.

#### **LoRa – Disabled (by default)**
Uses LoRaWAN gateway triangulation.  
Accuracy may vary significantly depending on gateway positions and density.

When enabled, LoRa-based positions become visible in:

- timelines  
- maps  
- positions tables  
- device history

<br></br>

## Notes

- All settings on this page are **user-specific preferences**.  
- Device-generated positions remain unchanged; only **visibility and display format** are affected.  
- Changes take effect immediately and persist across sessions.

<br></br>

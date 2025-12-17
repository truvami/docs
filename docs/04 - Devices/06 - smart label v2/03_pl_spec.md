---
sidebar_label v2: Payload Format 
---

# Payload Format of Smart Label v2

### Uplinks

| Port | Name                                                                   |   Type   | Description                                                                                                           |
|------|------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------|
| 150  | [Settings](#setting-uplink)                                            | Uplink | Contains a list of TLV values, like heartbeat or other current settings.                       |
| 180  | [GNSS-NG Localization Message Steady](#gnss-message-format)            | Uplink | One or two GNSS-NG localization messages are sent after a successful GNSS-NG scan.       |
| 190  | [Wi-Fi Localization Message](#wi-fi-message-format)                    | Uplink | A single Wi-Fi localization message is sent after a successful Wi-Fi scan.     |
| 200  | [BLE Localization Message](#ble-message-format)                        | Uplink | A single BLE localization message is sent after a successful Wi-Fi scan.     |


### Downlinks
| Port | Name                                                                   |   Type   | Description                                                                                                           |
|------|------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------|
| 150  | [Settings](#setting-downlink)                                          | Downlink | Contains a list of setter, getter and/or runner commands, in TLV format.                                              |
| 155  | [Getter](#getter-downlink)                                             | Downlink | Contains a list of TLV IDs. The device will then send the data associated with speicified TLV IDs. |
| 160  | [Action](#action-downlink)                                             | Downlink | Contains a list of TLVs with actions, like device reset and others. |


### TLV list of IDs

|  # | Name                             | Tag  | Size | Format | Default |
|----|----------------------------------|------|------|------|--------|
|  1 | Device flags                     | 0x10 |    1 | -    | -      |
|  2 | Heartbeat interval               | 0x14 |    1 | -    | -      |
|  3 | Asset tracking Intervals         | 0x18 |    2 | -    | -      |
|  4 | Acceleration sensitivity         | 0x1C |    2 | -    | -      |
|  5 | Movement detection plan          | 0x20 |    5 | -    | -      |
|  6 | Battery                          | 0x28 |    3 | -    | -      |
|  7 | Reset data                       | 0x30 | 0x00 | -    | -      |
|  8 | Scan Counts                      | 0x4B | 0x00 | -    | -      |
|  9 | ADR                              | 0x4E | 0x00 | -    | -      |
| 10 | Advertisement BLE duration FWU   | 0x24 |    2 | -    | -      |
| 11 | Heartbeat TLV list               | 0x24 |    2 | -    | -      |
| 12 | Firmware hash                    | 0x2C | 0x00 | -    | -      |
| 13 | Localization action              | 0x30 | 0x00 | -    | -      |
| 14 | Reset device action              | 0x30 | 0x00 | -    | -      |
| 15 | Clear stored buffer              | 0x30 | 0x00 | -    | -      |


### Configurable Parameters

The following table lists the default values and limits of the configurable parameters.
The parameters are modifiable via settings downlinks.

| Configuration Name         | Default Value | Minimum | Maximum     | Unit                       | Description                                                                                                                        |
|----------------------------|---------------|---------|-------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| MOVING_INTERVAL            | 300           | 120     | 65535       | seconds                    | Localization scan interval if the device is in motion.                                                                             |
| STEADY_INTERVAL            | 7200          | 120     | 65535       | seconds                    | Localization scan interval if the device is **not** in motion.                                                                     |
| HEARTBEAT_INTERVAL         | 6             | 1       | 255         | hours                      | Heartbeat message interval.                                                                                                        |
| BLE_FWU_ENABLED            | 1             | 0       | 1           | -                          | BLE firmware update over the air enabled.                                                                                          |
| ADVERTISEMENT_FWU_INTERVAL | 30            | 5       | 255         | seconds                    | Time period during which the device opens the BLE advertisement for firmware updates.                                              |
| GNSS_ENABLE                | 1             | 0       | 1           | -                          | GNSS scans enabled.                                                                                                                |
| WIFI_ENABLE                | 1             | 0       | 1           | -                          | Wi-Fi scans enabled.                                                                                                               |
| ACCELERATION_ENABLE        | 1             | 0       | 1           | -                          | If enabled, localization scans are triggered if the device is in motion (based on the acceleration sensor data).                   |
| ACCELERATION_SENSITIVITY   | 300           | 0       | 16000       | milli-g                    | Acceleration sensor threshold.                                                                                                     |
| ACCELERATION_DELAY         | 1500          | 1000    | 65535       | milliseconds               | The device must remain in motion for at least the specified time to trigger a localization scan.                                   |





## Nonfunctional Requirements

### LoRaWan 1.0.4 Compliant

The software needs to compliant with LoRaWan 1.0.4 Standard and fullfill the certification process

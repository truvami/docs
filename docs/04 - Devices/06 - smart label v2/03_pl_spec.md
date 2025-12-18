---
sidebar_label v2: Payload Format 
---

# Payload Format of Smart Label v2 - [draft]

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

|  # | Name                             | Tag  | Size | Format | Description | Range | Default |
|----|----------------------------------|------|------|------- |-------------|-------|---------|
|  1 | Device flags                     | 0x10 |    1 | uint8_t (bitfield) | bit 0: GNSS_ENABLE<br/>bit 1: WIFI_ENABLE<br/>bit 2: BLE_ENABLE<br/>bit 3: MOVEMENT_ENABLE<br/>bit 4: BLE_FWU_ENABLED<br/>    | 0 - 1 | 1<br/>1<br/>1<br/>1<br/>1 |
|  2 | Heartbeat interval               | 0x14 |    1 | uint8_t | Hours | 1 - 255 | 24 |
|  3 | Asset tracking Intervals         | 0x18 |    4 | uint16_t </br> uint16_t</br> | Moving: Minutes</br> Steady: Minutes  | ??</br>?? | 15 </br> 60|
|  4 | Acceleration sensitivity         | 0x1C |    2 | uint16_t | mG  | 1 - 16000 | 50      |
|  5 | Movement detection plan          | 0x20 |    5 | uint8_t</br> uint8_t</br> uint8_t</br> uint8_t</br>uint8_t</br>   | slice_time_seconds</br> window_slice_count </br> window_slice_required </br> start_move_win_count </br> stop_move_win_count </br>| 1 - 255</br> 1 - 255</br> 1 - 255</br> 1 - 255</br> 1 - 255</br> | 1</br>5</br>3</br>3</br>4    |
|  6 | Battery                          | 0x24 |    3 | uint8_t</br> uint16_t | Percentage</br> Voltage | 0-100</br> (hw dependent)    | |
|  7 | Reset data                       | 0x28 |    3 | uint8_t</br> uint16_t | Reason</br>Count |   |   |
|  8 | Scan Counts                      | 0x2C |    6 | uint16_t</br> uint16_t</br> uint16_t | GNSS scan count</br>WiFi scan count</br>BLE scan count</br> |     |
|  9 | ADR                              | 0x30 |    1 | uint8_t | 0: DR5 (EU868 SF7)<br/> 1: DR4 (EU868 SF8)<br/>2: DR3 (EU868 SF9, US915 SF7)<br/>3: DR2 (EU868 SF10, US915 SF8)<br/>4: DR1 (EU868 SF11, US915 SF9)<br/>5: DR0 (EU868 SF12)<br/>6: DR1-3 array (EU868 SF9-11, US915 SF7-9) <br/>7: ADR (SF7-12) for EU868     | 0 - 7 |2 |
| 10 | Advertisement BLE duration FWU   | 0x34 |    1 | uint8_t | Minutes  | 1 - 255 |   5 |
| 11 | Heartbeat TLV list               | 0x38 |  1-n | uint8_t * n  | TLVs IDs list  | * | 0x24 0x2C |
| 12 | FW & HW Version                  | 0x3C |    4 | uint32_t | CRC32 of the current FW | |
| 12 | Firmware CRC32                   | 0x3C |    4 | uint8_t</br>uint8_t</br>uint8_t</br>uint8_t</br> | FW ver major</br>FW ver minor</br>FW ver patch</br>HW version</br> | | |
| 13 | Localization action              | 0x40 |    0 | -    | Triggers the localization   | |
| 14 | Reset device action              | 0x44 |    0 | -    | Resets thed evice      | |
| 15 | Clear stored buffer              | 0x48 |    0 | -    | Clears the stored buffer  | |


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

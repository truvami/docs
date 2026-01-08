---
sidebar_label v2: Payload Format 
---

# Payload Format of Smart Label v2 - [draft - Anything is subject to change] 

### Uplinks

| Port | Name                                                                   |   Type   | Description                                                                                                           |
|------|------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------|
| 150  | [Settings](#setting-uplink)                                            | Uplink | Contains a list of TLV values, like heartbeat or other current settings.                       |
| 180  | [GNSS-NG Localization Message](#gnss-message-format)                   | Uplink | One or two GNSS-NG localization messages are sent after a successful GNSS-NG scan.       |
| 190  | [Wi-Fi Localization Message](#wi-fi-message-format)                    | Uplink | A single Wi-Fi localization message is sent after a successful Wi-Fi scan.     |
| 200  | [BLE Localization Message](#ble-message-format)                        | Uplink | A single BLE localization message is sent after a successful BLE scan.     |
| 201  | [BLE Localization Message (compact)](#ble-message-format)              | Uplink | A single compact BLE localization message is sent after a successful BLE scan.     |


### Downlinks
| Port | Name                                                                   |   Type   | Description                                                                                                           |
|------|------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------|
| 150  | [Settings](#setting-downlink)                                          | Downlink | Contains a list of setter, getter and/or runner commands, in TLV format.                                              |
| 155  | [Getter/Action](#getter-downlink)                                      | Downlink | Contains a list of TLV IDs. The device will then send the data associated with speicified TLV IDs, or execute the Action. |


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
| 13 | Clear stored buffer              | 0x40 |    0 | -    | Clears the stored buffer  | |
| 14 | Localization action              | 0x44 |    0 | -    | Triggers the localization   | |
| 15 | Reset device action              | 0x48 |    0 | -    | Resets thed evice      | |

# Uplinks format
## Wi-Fi Localization Message - port 190

### Wi-Fi format summary by Tag
|  Tag |  Seq  |  Timestamp  |   (RSSI+MAC)*n  |   Description |
|------|-------|-------------|-----------------|---------------|
| 0x10 |       |             |        X        |  (Moving) WiFi   |
| 0x14 |       |      X      |        X        |  (Moving) ts + WiFi   |
| 0x18 |       |             |        X        |  (Steady) WiFi      |
| 0x1C |       |      X      |        X        |  (Steady) ts + Wifi   |
| 0x80 |   X   |             |        X        |  (Moving) seq + WiFi  |
| 0x84 |   X   |      X      |        X        |  (Moving) seq + ts + WiFi |
| 0x88 |   X   |             |        X        |  (Steady) seq + WiFi |
| 0x8C |   X   |      X      |        X        |  (Steady) seq + ts + WiFi |

## BLE Localization Message - port 200

### BLE format summary by Tag, full MAC addr
|  Tag |  Seq  |  Timestamp  |   (RSSI+MAC)*n  |   Description |
|------|-------|-------------|-----------------|---------------|
| 0x10 |       |             |        X        |  (Moving) BLE   |
| 0x14 |       |      X      |        X        |  (Moving) ts + BLE   |
| 0x18 |       |             |        X        |  (Steady) BLE      |
| 0x1C |       |      X      |        X        |  (Steady) ts + BLE   |
| 0x80 |   X   |             |        X        |  (Moving) seq + BLE  |
| 0x84 |   X   |      X      |        X        |  (Moving) seq + ts + BLE |
| 0x88 |   X   |             |        X        |  (Steady) seq + BLE |
| 0x8C |   X   |      X      |        X        |  (Steady) seq + ts + BLE |

## BLE Localization Message (compact) - port 201
### BLE format summary by Tag, compact MAC addr
|  Tag |  Seq  |  Timestamp  |   Compact BLE Data  |   Description |
|------|-------|-------------|-----------------|---------------|
| 0x10 |       |             |        X        |  (Moving) BLE   |
| 0x14 |       |      X      |        X        |  (Moving) ts + BLE   |
| 0x18 |       |             |        X        |  (Steady) BLE      |
| 0x1C |       |      X      |        X        |  (Steady) ts + BLE   |
| 0x80 |   X   |             |        X        |  (Moving) seq + BLE  |
| 0x84 |   X   |      X      |        X        |  (Moving) seq + ts + BLE |
| 0x88 |   X   |             |        X        |  (Steady) seq + BLE |
| 0x8C |   X   |      X      |        X        |  (Steady) seq + ts + BLE |

### Compact BLE data format
|  Size: |  Variable Heat/Tail (1)  | 1    | 6  |   1  |    1-5    |     |   1  |    1-5    |
|--------|--------------------------|------|----|------|-----------|-----|------|-----------|
| Field: |   -5 to 5                | RSSI | Full MAC| RSSI | Short MAC | ... | RSSI | Short MAC |

When the Heat/Tail value is negative it tells how many bytes are different from the beggining of the full MAC.</br>
When it's positive it tells how many bytes are different from the end of the full MAC

Ex: Head/Tail is -2:</br>
Full MAC: AA BB CC DD EE FF GG</br>
Short MAC: HH II </br>
-> Short MAC expands to: HH II CC DD EE FF GG 


Ex: Head/Tail is 2:</br>
Full MAC: AA BB CC DD EE FF GG</br>
Short MAC: HH II </br>
-> Short MAC expands to: AA BB CC DD HH II



# Detailed payload format:
### Wi-Fi, moving with no timestamp
|  Size: |  Tag (1)  | 1    | 6  |     | 1    | 6   |
|--------|-----------|------|----|-----|------|-----|
| Field: |   0x10    | RSSI | MAC| ... | RSSI | MAC |

### Wi-Fi, moving with timestamp
|  Size: |  Tag (1)  |      4    | 1    | 6   |     |   1  | 6   |
|--------|-----------|-----------|------|-----|-----|------| --- |
| Field: |    0x14   | Timestamp | RSSI | MAC | ... | RSSI | MAC |

### Wi-Fi, steady with no timestamp
|  Size: |  Tag (1)  | 1    | 6  |     | 1    | 6   |
|--------|-----------|------|----|-----|------|-----|
| Field: |   0x18    | RSSI | MAC| ... | RSSI | MAC |

### Wi-Fi, steady with timestamp
|  Size: |  Tag (1)  |      4    | 1    |  6  |     |   1  |  6  |
|--------|-----------|-----------|------|-----|-----|------|-----|
| Field: |    0x1C   | Timestamp | RSSI | MAC | ... | RSSI | MAC |

### Wi-Fi, packet sequence, moving with no timestamp
|  Size: |  Tag (1)  |  2   |  1   |  6  |     |  1   |  6  |
|--------|-----------|------|------|-----|-----|------|-----|
| Field: |   0x80    | Seq  | RSSI | MAC | ... | RSSI | MAC |

### Wi-Fi, packet sequence, moving with timestamp
|  Size: |  Tag (1)  |  2   |      4    | 1    | 6  |     | 1    | 6   |
|--------|-----------|------|-----------|----|-----|------|-----|------|
| Field: |    0x84   | Seq  | Timestamp | RSSI | MAC| ... | RSSI | MAC |

### Wi-Fi, packet sequence, steady with no timestamp
|  Size: |  Tag (1)  |  2   | 1    |  6  |     |  1  | 6   |
|--------|-----------|------|------|-----|-----|-----| ---- |
| Field: |   0x88    | Seq  | RSSI | MAC | ... | RSSI | MAC |

### Wi-Fi, packet sequence, steady with timestamp
|  Size: |  Tag (1)  |  2  |    4      |   1  |  6  |     |  1   |  6  |
|--------|-----------|-----|-----------|------|-----|-----|------|-----|
| Field: |    0x8C   | Seq | Timestamp | RSSI | MAC | ... | RSSI | MAC |




## Nonfunctional Requirements

### LoRaWan 1.0.4 Compliant

The software needs to compliant with LoRaWan 1.0.4 Standard and fullfill the certification process

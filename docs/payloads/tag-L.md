---
sidebar_label: tag L
---

# Payload Format of tag L

## WiFi Packet (Uplink, Port 5)

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0    | 1    | Status[6:2] + Moving flag[0] (moving = 1) | uint8       |
| 1-6  | 6    | MAC1                                      | 6 x uint8   |
| 7    | 1    | RSSI1                                     | int8        |
| …    |      |                                           |             |
|      | 6    | MACN                                      | 6 x uint8   |
|      | 1    | RSSIN                                     | int8        |


## GPS Location (Uplink, Port 1)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | Status[6:2] + Moving flag[0] (moving = 1) | uint8                    |
| 1-4  | 4    | Latitude                                  | int32, 1/1’000’000 deg   |
| 5-8  | 4    | Longitude                                 | int32, 1/1’000’000 deg   |
| 9-10 | 2    | Altitude                                  | uint16, 1/10 meter      |
| 11   | 1    | Year                                      | uint8, year after 2000   |
| 12   | 1    | Month                                     | uint8, [1..12]           |
| 13   | 1    | Day                                       | uint8, [1..31]           |
| 14   | 1    | Hour                                      | [0..23]                  |
| 15   | 1    | Minute                                    | [0..59]                  |
| 16   | 1    | Second                                    | [0..59]                  |


## GPS No Location (Uplink, Port 2)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | Status[6:2] + Moving flag[0] (moving = 1) | uint8                    |


## Battery Packet (Uplink, Port 15)

| Byte | Size | Description                                 | Format                   |
|------|------|---------------------------------------------|--------------------------|
| 0    | 1    | Status[6:2] + Low battery flag[0] (low = 1) | uint8                    |
| 1-2  | 2    | Battery voltage                             | uint16, mV               |


## Status[6:2]

Status is only sent after a Config Downlink as an acknowledgement in the next Uplink. 4 bit [6:3] conf_change_id plus 1 bit [2] for success (=1) or failure (=0). conf_change_id counter resets after reaching 15 (1111).

## Current Config/Status Packet (Uplink, Port 4)

| Byte  | Size | Description                                 | Format     |
|-------|------|---------------------------------------------|------------|
| 0-3   | 4    | Localization interval while moving, IM      | uint32, s  |
| 4-7   | 4    | Localization interval while steady, IS      | uint32, s  |
| 8-11  | 4    | Heartbeat invterval, IH                     | uint32, s  |
| 12-13 | 2    | GPS timeout while waiting for fix           | uint16, s  |
| 14-15 | 2    | Accelerometer wakeup threshold              | uint16, mg |
| 16-17 | 2    | Accelerometer delay                         | uint16, ms |
| 18    | 1    | Device state (moving = 1, steady = 2)       | uint8      |
| 19-21 | 3    | Firmware version (major,;minor; patch)      | 3 x uint8  |
| 22-23 | 2    | Hardware version (type; revision)           | 2 x uint8  |
| 24-27 | 4    | Battery “keep-alive” message interval, IB   | uint32, s  |


## Button Alarm Packet (Uplink, Port 6)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | In case of a button-press 0x01 is sent | uint8                    |


## Set Config Packet (Downlink, Port 128)

| Byte  | Size | Description                                 | Format      |
|-------|------|---------------------------------------------|-------------|
| 0     | 1    | BLE (disable = 0, enable = 1)               | uint8       |
| 1     | 1    | GPS (disable = 0, enable = 1)               | uint8       |
| 2     | 1    | WiFi (disable = 0, enable = 1)              | uint8       |
| 3-6   | 4    | Localization interval while moving, IM      | uint32, s   |
| 7-10  | 4    | Localization interval while steady, IS      | uint32, s   |
| 11-14 | 4    | Hearbeat interval, IH                       | uint32, s   |
| 15-16 | 2    | GPS timeout while waiting for fix           | uint16, s   |
| 17-18 | 2    | Accelerometer wakeup threshold              | uint16, mg  |
| 19-20 | 2    | Accelerometer delay                         | uint16, ms  |
| 21-24 | 4    | Battery “keep-alive” message interval, IB   | uint32, s   |


## Buzzer Packet (Downlink, Port 129)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | Time to buzz (buzzer off = 0) | uint8, s                    |

## Off Packet (Downlink, Port 130)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | Power off = 0 | uint8                    |


## GPS Accuracy Booster (Downlink, Port 131)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | Accuracy enhancement | uint8, s [0..59]                   |

## BLE config (Downlink, Port 132)
> *requires firmware version v2.1.1 or higher

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 2    | Scan interval                             | uint16, s                   |
| 2    | 1    | Scan time                                 | uint8, s   |
| 3    | 1    | Max beacons                               | uint8                     |
| 4    | 1    | Min. RSSI value                           | int8               |
| 5    | 10   | Eddystone Namespace                       | 10x uint8              |

Payloads use big endian data encoding.

`Min RSSI value` is a signed integer and uses two’s complement for encoding.

If `Min RSSI value` is 0, there is no filtering applied for RSSI.

If `Max beacons` is 0, there will be no limit of how many beacons will be sent.

If `Scan time` is 0, there is no scanning performed on the device.

## BLE scan (Uplink, Port 3)
> *requires firmware version v2.1.1 or higher

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0    | 2    | Scan pointer                              | uint16       |
| 2    | 1    | Total messages                            | uint8       |
| 3    | 1    | #Message                                  | uint8       |
| 4-9  | 6    | MAC1                                      | 6 x uint8   |
| 10   | 1    | RSSI1                                     | int8        |
| …    |      |                                           |             |
|      | 6    | MACN                                      | 6 x uint8   |
|      | 1    | RSSIN                                     | int8        |

If there are more than 6 BLE Beacons the messages will be split into multiple uplinks. 

The `Total messages` indicate how many uplinks are expected. 

and the `#Message` indicates the current message out of all the uplinks.

`Scan pointer` is incremented with every measurement.


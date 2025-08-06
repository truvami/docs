---
sidebar_label: Payload Format
---

# Payload Format of tag L

<br></br>
## Uplinks
<br></br>

### BLE scan (Uplink, Port 3) 
Depending on the number of detected BLE Beacon(s), the payload size varies between 11 - 46 bytes (1-6 APs). 
If there are more than 6 BLE Beacons the messages will be split into multiple uplinks. 

The `Total messages` indicate how many uplinks are expected. 

and the `#Message` indicates the current message out of all the uplinks.

`Scan pointer` is incremented with every measurement.


| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-1  | 2    |<details> <summary>Scan Pointer</summary> A 16-bit unsigned integer incremented with each measurement to uniquely identify the scan. </details>                | uint16      |
| 2    | 1    |<details> <summary>Total messages</summary> A single unsigned byte indicating the total number of uplink messages expected for this scan. </details>           | uint8       | 
| 3    | 1    | <details> <summary>#Message</summary> The current message number in the sequence of uplinks. </details>        | uint8       |
|4-9   | 6    | Mac1                                      | 6 x uint8   |
| 10   | 1    | Rssi1                                     | int8        |
|      |      | …                                         |             |
|      | 6    |<details> <summary>MacN</summary> MAC address of the detected BLE beacon(s), represented as six unsigned bytes. </details>                                    | 6 x uint8   |
|      | 1    |<details> <summary>RssiN</summary> Signal strength (RSSI) of the respective BLE beacon, represented as a signed byte. </details>                                     | int8        |

### Current Config/Status Packet (Uplink, Port 4)

| Byte  | Size | Description                                 | Format     |
|-------|------|---------------------------------------------|------------|
| 0-3   | 4    |   <details> <summary>Localization interval while moving, IM</summary> 32-bit unsigned integer for localization interval during motion (in seconds). </details>    | uint32, s  |
| 4-7   | 4    |   <details> <summary>Localization interval while steady, IS</summary> 32-bit unsigned integer for localization interval while stationary (in seconds). </details>    | uint32, s  |
| 8-11  | 4    |   <details> <summary>Config/Status interval, IC  </summary> 32-bit unsigned integer for the interval between configuration updates (in seconds). </details>    | uint32, s  |
| 12-13 | 2    |   <details> <summary>GPS timeout while waiting for fix</summary> Maximum wait time for a GNSS fix in seconds, represented as a 16-bit unsigned integer. If timeout is exceeded without a successful fix, it will stop the module and not send an uplink. </details>    | uint16, s  |
| 14-15 | 2    |   <details> <summary>Accelerometer wakeup threshold</summary> The threshold for triggering the accelerometer, measured in mg. </details>    | uint16, mg |
| 16-17 | 2    |   <details> <summary>Accelerometer delay</summary> Delay after accelerometer trigger, in milliseconds. For a successful trigger the accelerometer must be triggered for this amount of time. Threshold break is examined between the first trigger and after delay expired. </details>   | uint16, ms |
| 18    | 1    |   <details> <summary>Device state (moving = 1, steady = 2)</summary> Device movement state (1 for moving, 2 for steady). </details>    | uint8      |
| 19-21 | 3    |   <details> <summary>Firmware version (major,;minor; patch)</summary> Three bytes representing major, minor, and patch versions. </details>   | 3 x uint8  |
| 22-23 | 2    |   <details> <summary>Hardware version (type; revision)</summary> Two bytes representing hardware type and revision. </details>   | 2 x uint8  |
| 24-27 | 4    |   <details> <summary>Battery “keep-alive” message interval, IB</summary> Interval for battery status messages in seconds. </details>  | uint32, s  |
| 28-29 | 2    |   <details> <summary>Batch size</summary> Number of messages batched together; every nth message is confirmed. If the confirmation is unsuccessful, it will deem the batch not delivered and will retry to deliver the batch later. </details>  | uint16     |
| 30-31 | 2    |   <details> <summary>Buffer size</summary> Maximum buffer size for storing data, in entries. Max 8128 entries. </details>  | uint16     |

### Status[6:2]

Status is only sent after a Config Downlink as an acknowledgement in the next Uplink. 4 bit [6:3] conf_change_id plus 1 bit [2] for success (=1) or failure (=0). conf_change_id counter resets after reaching 15 (1111).

### WiFi Packet (Uplink, Port 5)
Depending on the number of detected WiFi Access Points (AP), the payload size varies between 8 - 50 bytes (1-7 APs). 

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0    | 1    |  <details> <summary>Status[6:2] + Moving flag[0] (moving = 1)</summary> Status flags, including moving flag and configuration information. </details>| uint8       |
| 1-6  | 6    | MAC1                        | 6 x uint8   |
| 7    | 1    | Rssi1                       | int8        |
| …    |      |                                           |             |
|      | 6    | <details> <summary>MACN</summary> MAC address of detected WiFi Access Points. </details>| 6 x uint8   |
|      | 1    | <details> <summary>RSSIN</summary> Signal strength (RSSI) of respective WiFi Access Points. </details>| int8        |

### Button Alarm Packet (Uplink, Port 6)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    |  <details> <summary>In case of a button-press 0x01 is sent</summary> Sends 0x01 upon button press and it also triggers a location acquisition. </details>   | uint8                    |

Upon button press, trigger a location acquisition process. (if it is not running already!) 

### WiFi with timestamp (Uplink, Port 7)
Depending on the number of detected WiFi Access Points (AP), the payload size varies between 12 - 47 bytes (1-6 APs). 

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-3  | 4    |  <details> <summary>Unix TS</summary> 32-bit unsigned integer representing the timestamp of the scan. </details>                                  | uint32      |
| 4    | 1    |  <details> <summary>Status[6:2] + Moving flag[0] (moving = 1)</summary> Status flags and movement indicator. </details> | uint8       |
|5-10  | 6    | Mac1                                      | 6 x uint8   |
| 11   |  1   | Rssi1                                     | int8        |
|   …  |      | …                                         |             |
|      | 6    |   <details> <summary>MacN</summary> MAC address of detected WiFi Access Points. </details>                                    | 6 x uint8   |
|      | 1    |  <details> <summary>RssiN</summary> Signal strength (RSSI) of respective WiFi Access Points. </details>                                    | int8        |


### BLE current config (Uplink, Port 8) 

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-1  | 2    |  <details> <summary>Scan interval</summary> BLE scanning interval in seconds. </details>                            | uint16, s   |
| 2    | 1    |   <details> <summary>Scan time</summary> Duration of BLE scan in seconds (range 0–180). </details>                               | uint8, s [0..180] |
| 3    | 1    |   <details> <summary>Max beacons</summary> Maximum number of beacons to report. </details>                             | uint8       |
| 4    | 1    |   <details> <summary>Min. Rssi value</summary> Minimum RSSI for filtering beacons. </details>                         | int8        |
| 5-14 | 10   |  <details> <summary>Advertising name/eddystone namespace filter</summary> Filter criteria for beacon names or namespaces. </details>          | 10 x ASCII or <br />10 x uint8 |
| 15-16 |  2   |  <details> <summary>Accelerometer trigger hold timer</summary> Hold time for the accelerometer trigger in seconds. </details>        | uint16, s   |
| 17-18 | 2    |  <details> <summary>Accelerometer threshold</summary> Trigger threshold for the accelerometer in mg. </details>                 | uint16, mg  |
| 19   | 1    |  <details> <summary>Scan mode</summary> 0 for no filter, 1 for name filter, 2 for namespace filter. </details>                                | 0 - no filter; <br />1 - advertised name filter <br />2 - eddystone namespace filter |
| 20-21 |  2   |  <details> <summary>BLE current configuration uplink interval</summary> Interval for sending BLE configuration in seconds. </details>        | uint16, s   |


### GNSS (Uplink, Port 10)

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0    | 1    |  <details> <summary>Status[6:2] + Moving flag[0] (moving = 1)</summary> Status flags including moving flag. </details> | uint8       |
| 1-4  | 4    |  <details> <summary>Latitude</summary> GNSS latitude in micro-degrees. </details>                                 | int32, 1/1’000’000 deg   |
| 5-8  | 4    |  <details> <summary>Longitude</summary> GNSS longitude in micro-degrees. </details>                                | int32, 1/1’000’000 deg        |
| 9-10 | 2    |  <details> <summary>Altitude</summary> Altitude in decimeters. </details>                                 | uint16, 1/10 meter            |
| 11-14| 4    |  <details> <summary>Unix TS</summary> Timestamp of the GNSS data. </details>                                  | uint32      |
| 15-16| 2    |  <details> <summary>Battery</summary> Battery voltage in millivolts. </details>                                 | uint16, mV  |
|  17  | 1    |  <details> <summary>TTF</summary> Time it took to acquire a fix in seconds. </details>                                    | uint8, s    |
|  18  | 1    |  <details> <summary>PDOP</summary> Position dilution of precision (1/2 DOP). https://en.wikipedia.org/wiki/Dilution_of_precision_(navigation) </details>                                    | uint8, 1/2 meter|
|  19  | 1    |  <details> <summary>#satellites</summary> Number of satellites used for the fix. </details>                             | uint8       |


### Battery Packet (Uplink, Port 15)

| Byte | Size | Description                                 | Format                   |
|------|------|---------------------------------------------|--------------------------|
| 0    | 1    |  <details> <summary>Status[6:2] + Low battery flag[0] (low = 1)</summary> Includes flags for status and a low battery indicator (1 if low). </details>  | uint8                    |
| 1-2  | 2    |  <details> <summary>Battery voltage</summary> Battery voltage in millivolts. </details>                            | uint16, mV               |




### Combined (Uplink, Port 51)
Combined uplink is used when there are ≤4 WiFi AP detected (7-28 extra bytes) && there is GNSS fix available && WiFi scanning is enabled.

TTF is the time it took the GNSS receiver to create a fix. We use this date to establish the timestamp for the WiFi scanning outcome. Timestamp for the WiFi scanning is TSGNSS – TTF + 10 seconds.

Depending on the number of detected WiFi Access Points (AP), the payload size varies between 27 - 48 bytes (1-4 APs). 

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0    | 1    |  <details> <summary>Status[6:2] + Low battery flag[0] (low = 1)</summary> Includes status flags and low battery flag. </details> |  uint8                |
| 1-4  | 4    |  <details> <summary>Latitude</summary> GNSS latitude in micro-degrees. </details>                                 | int32, 1/1’000’000 deg |
| 5-8  | 4    |  <details> <summary>Longitude</summary> GNSS longitude in micro-degrees. </details>                                | int32, 1/1’000’000 deg |
| 9-10 | 2    |  <details> <summary>Altitude</summary> Altitude in decimeters. </details>                                 | uint16, 1/10 meter |
| 11-14| 4    |  <details> <summary>Unix TS</summary> Timestamp of GNSS data. </details>                                  | uint32      |
| 15-16| 2    |  <details> <summary>Battery</summary> Battery voltage in millivolts. </details>                                  | uint16, mV  |
|  17  | 1    |  <details> <summary>TTF</summary> Time it took to acquire a fix in seconds. </details>                                      | uint8, s    |
|  18  | 1    |  <details> <summary>PDOP</summary> Position dilution of precision (1/2 DOP). https://en.wikipedia.org/wiki/Dilution_of_precision_(navigation) </details>                                    | uint8, 1/2 meter |
|  19  | 1    |  <details> <summary>#satellites</summary> Number of satellites used for the fix. </details>                             | uint8       |
| 20-25 | 6    | MAC1                                     | 6 x uint8   |
| 26    | 1    | RSSI1                                    | int8        |
| …    |      |                                           |             |
|      | 6    |   <details> <summary>MACN</summary> MAC address of detected WiFi Access Points. </details>                                    | 6 x uint8   |
|      | 1    |   <details> <summary>RSSIN</summary> Signal strength (RSSI) of respective WiFi Access Points. </details>                                   | int8        |


### Buffered WiFi (Uplink, Port 105)
Depending on the number of detected WiFi Access Points (AP), the payload size varies between 14 - 49 bytes (1-6 APs). 

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-1  | 2    |  <details> <summary>Buffer level</summary> Current Buffer fill level indicating remaining unsent messages. </details>                             | uint16      |
| 2-5  | 4    |   <details> <summary>Unix TS</summary> Timestamp of WiFi scan. </details>                                 | uint32      |
| 6    | 1    |  <details> <summary>Status[6:2] + Low battery flag[0] (low = 1)</summary> Includes flags for low battery and status. </details> | uint8     |
|7-12  | 6    | Mac1                                      | 6 x uint8   |
| 13   | 1    | Rssi1                                     | int8        |
|      |      | …                                         |             |
|      | 6    |  <details> <summary>MacN</summary> MAC address of detected WiFi Access Points. </details>                                     | 6 x uint8   |
|      | 1    |  <details> <summary>RssiN</summary> Signal strength (RSSI) of respective WiFi Access Points. </details>                                    | int8        |


### Buffered GNSS (Uplink, Port 110)

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-1  | 2    |  <details> <summary>Buffer level</summary> Current Buffer fill level indicating remaining unsent messages. </details>                             | uint16      |
| 2    | 1    |   <details> <summary>Status[6:2] + Low battery flag[0] (low = 1)</summary> Includes flags for low battery and movement. </details> | uint8     |
| 3-6  | 4    |  <details> <summary>Latitude</summary> GNSS latitude in micro-degrees. </details>                                 | int32, 1/1’000’000 deg             |
| 7-10 | 4    |  <details> <summary>Longitude</summary> GNSS longitude in micro-degrees. </details>                                | int32, 1/1’000’000 deg             |
| 11-12| 2    |  <details> <summary>Altitude</summary> Altitude in decimeters. </details>                                 | uint16, 1/10 meter            |
| 13-16| 4    |  <details> <summary>Unix TS</summary> Timestamp of GNSS data. </details>                                  | uint32      |
| 17-18| 2    |  <details> <summary>Battery</summary> Battery voltage in millivolts. </details>                                  | uint16, mV  |
|  19  | 1    |  <details> <summary>TTF</summary> Time it took to acquire a fix in seconds. </details>                                      | uint8, s    |
|  20  | 1    |  <details> <summary>PDOP</summary> Position dilution of precision (1/2 DOP). https://en.wikipedia.org/wiki/Dilution_of_precision_(navigation) </details>                                     | uint8, 1/2 meter |
|  21  | 1    |  <details> <summary>#satellites</summary> Number of satellites used for the fix. </details>                              | uint8       |




### Buffered Combined (Uplink, Port 151)
Depending on the number of detected WiFi Access Points (AP), the payload size varies between 29 - 50 bytes (1-4 APs). 

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-1  | 2    |  <details> <summary>Buffer level</summary> Current Buffer fill level indicating remaining unsent messages. </details>                            | uint16      |
| 2    | 1    |  <details> <summary>Status[6:2] + Low battery flag[0] (low = 1)</summary> Includes status flags and low battery flag. </details> | uint8     |
| 3-6  | 4    |   <details> <summary>Latitude</summary> GNSS latitude in micro-degrees. </details>                                | int32, 1/1’000’000 deg                 |
| 7 10 | 4    |  <details> <summary>Longitude</summary> GNSS longitude in micro-degrees. </details>                                | int32, 1/1’000’000 deg                 |
| 11-12| 2    |  <details> <summary>Altitude</summary> Altitude in decimeters. </details>                                 | uint16, 1/10 meter                 |
| 13-16| 4    |  <details> <summary>Unix TS</summary> Timestamp of GNSS data. </details>                                  | uint32      |
|17-18 | 2    |  <details> <summary>Battery</summary> Battery voltage in millivolts. </details>                                  | uint16, mV  |
|  19  | 1    |   <details> <summary>TTF</summary> Time it took to acquire a fix in seconds. </details>                                     | uint8, s    |
|  20  | 1    |  <details> <summary>PDOP</summary> Position dilution of precision (1/2 DOP). https://en.wikipedia.org/wiki/Dilution_of_precision_(navigation) </details>                                     | uint8, 1/2 meter |
| 21   | 1    |  <details> <summary>#satellites</summary> Number of satellites used for the fix. </details>                             | uint8       |
|22-27 | 6    | Mac1                                      | 6 x uint8   |
| 28   |  1   | Rssi1                                     | int8        |
|   …  |      | …                                         |             |
|      | 6    |   <details> <summary>MacN</summary> MAC address of detected WiFi Access Points. </details>                                    | 6 x uint8   |
|      | 1    |  <details> <summary>RssiN</summary> Signal strength (RSSI) of respective WiFi Access Points. </details>                                    | int8        |




<br></br>
## Downlinks
<br></br>


### Set Config Packet (Downlink, Port 128)
Default values for Batch size is 10, for the buffer size it is 8128 (maximum amount of data that can be buffered).<br />
Maximum value for Batch size is 50. If Batch size is set to 0, buffering is disabled.

| Byte  | Size | Description                                 | Format      |
|-------|------|---------------------------------------------|-------------|
| 0     | 1    |  <details> <summary>BLE advertisement (disable = 0, enable = 1)</summary> Enable/disable BLE advertisement (0 = disable, 1 = enable). </details> | uint8       |
| 1     | 1    |  <details> <summary>GPS (disable = 0, enable = 1)</summary> Enable/disable GNSS during location acquisition (0 = disable, 1 = enable). </details>              | uint8       |
| 2     | 1    | <details> <summary>WiFi (disable = 0, enable = 1)</summary> Enable/disable WiFi scanning during location acquisition (0 = disable, 1 = enable). </details>              | uint8       |
| 3-6   | 4    |  <details> <summary>Localization interval while moving, IM</summary> Localization interval in motion, in seconds. This interval acts as a hold timer between accelerometer triggers, triggering motion. Operation is explained under functional description. </details>     | uint32, s   |
| 7-10  | 4    |  <details> <summary>Localization interval while steady, IS</summary> Localization interval when stationary, in seconds. </details>     | uint32, s   |
| 11-14 | 4    |  <details> <summary>Heartbeat interval, IH</summary> Interval for sending heartbeat messages, in seconds. </details>                      | uint32, s   |
| 15-16 | 2    |   <details> <summary>GPS timeout while waiting for fix</summary> Maximum wait time for a GNSS fix in seconds, represented as a 16-bit unsigned integer. If timeout is exceeded without a successful fix, it will stop the module and not send an uplink. </details>         | uint16, s   |
| 17-18 | 2    |  <details> <summary>Accelerometer wakeup threshold</summary> Threshold in mg for accelerometer wakeup. </details>             | uint16, mg  |
| 19-20 | 2    |  <details> <summary>Accelerometer delay</summary> Delay in milliseconds after wakeup. </details>                        | uint16, ms  |
| 21-24 | 4    |  <details> <summary>Battery “keep-alive” message interval, IB</summary> Interval for battery status updates in seconds. </details>  | uint32, s   |
| 25-26 | 2   |   <details> <summary>Batch size</summary> Number of messages batched together; every nth message is confirmed. If the confirmation is unsuccessful, it will deem the batch not delivered and will retry to deliver the batch later. </details>                                | uint16      |
| 27-28 | 2   |  <details> <summary>Buffer size</summary> Buffer size (Byte 30-31, Size 2): Maximum buffer size for storing data, in entries. Max 8128 entries. </details>                                | uint16      |


### Buzzer Packet (Downlink, Port 129)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    |  <details> <summary>Time to buzz (buzzer off = 0)</summary> Duration for the buzzer to sound in seconds (0 = off). </details>            | uint8, s                 |

### Off Packet (Downlink, Port 130)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    |  <details> <summary>0x00 - Off; 0xDE - Erase flash and Off</summary> 0x00 to turn off; 0xDE to erase flash and turn off. After that device can only be activated with a button press detailed in the getting started guide. </details>   | uint8                    |


### GPS Accuracy Booster (Downlink, Port 131)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    |   <details> <summary>Accuracy enhancement</summary> Time to run GNSS longer after the fix to enhance accuracy in seconds (0–59). </details>                    | uint8, s [0..59]         |

### Erase flash (Downlink, Port 132)

| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0    | 1    |   <details> <summary>0x00 - Erase flash</summary> 0x00 to erase the flash. </details>                      | uint8       |

### Enable/disable buzzer feedback upon magnet interaction (Downlink, Port 133)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    | 0x00 - diasble, 0x01 - enable             | uint8                    |

### BLE config (Downlink, Port 134) 

Payloads use big endian data encoding.<br />
The `Advertising name` filter string must be zero-terminated. (0x00). This condition does not apply to filtering enabled for eddystone namespace (Scan mode: 2)<br />

`Min RSSI value` is a signed integer and uses two’s complement for encoding.

If `Min RSSI value` is 0, there is no filtering applied for RSSI.

If `Max beacons` is 0, there will be no limit of how many beacons will be sent.

If `Scan time` is 0, there is no scanning performed on the device.


| Byte | Size | Description                               | Format      |
|------|------|-------------------------------------------|-------------|
| 0-1  | 2    |  <details> <summary>Scan interval</summary> Interval for BLE scanning, in seconds. </details>                            | uint16, s   |
| 2    | 1    |  <details> <summary>Scan time</summary> Duration of BLE scan in seconds (0–180). </details>                                | uint8, s [0..180] |
| 3    | 1    |  <details> <summary>Max beacons</summary> Maximum number of beacons reported. </details>                              | uint8       |
| 4    | 1    |  <details> <summary>Min. Rssi value</summary> Minimum RSSI for filtering. </details>                          | int8        |
| 5-14 | 10   |  <details> <summary>Advertising name/eddystone namespace filter</summary> Filter for beacon names or namespaces. </details> | 10 x ASCII or <br />10 x uint8 |
| 15-16 |  2   | <details> <summary>Accelerometer trigger hold timer</summary> Hold time for accelerometer trigger in seconds. </details>        | uint16, s   |
| 17-18 | 2    | <details> <summary>Accelerometer threshold</summary> Threshold in mg for triggering the accelerometer. </details>                 | uint16, mg  |
| 19   | 1    |  <details> <summary>Scan mode</summary> Mode for filtering (0 = no filter, 1 = name filter, 2 = namespace filter). </details>                                | 0 - no filter; <br />1 - advertised name filter <br />2 - eddystone namespace filter |
| 20-21 |  2   |  <details> <summary>BLE current configuration uplink interval</summary> Interval for sending BLE configuration data in seconds. </details> | uint16, s   |

### BLE scan on-demand (Downlink, Port 135)

| Byte | Size | Description                               | Format                   |
|------|------|-------------------------------------------|--------------------------|
| 0    | 1    |   <details> <summary>0x01 - Trigger BLE scan</summary> 0x01 to initiate a BLE scan immediately. </details>                 | uint8                    |



<br></br>

:::warning Support 
<br></br>
For support, please submit a ticket. We will provide support as promptly as possible. <br></br>
<br></br>

[**Click here to open a new ticket**](https://truvami.com/service-request/)
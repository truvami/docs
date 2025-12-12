---
sidebar_label: Payload Format
---

# Payload Format of SmartLabel

## Uplinks

### Low Power battery uplink

__Uplink port: 1__

Sent only once a day in case the energy level is below 20%

|                  |  Bytes[0:1]|  Bytes[2:3]|
|------------------|------------|------------|
| __Value__        |  Battery   |Cell voltage|
| __Size [Bytes]__ |  2         |  2         |
| __Type__         |  UINT16    |  UINT16    |
| __Unit__         |  mV        |   mV       |

### Temperature uplink

__Uplink port: 2__

Temperature measurement uplink if the temperature is outside of thresholds

|                  | Bytes[0:1]  | Byte 2     |
|------------------|-------------|------------|
| __Value__        | Temperature | RH         |
| __Size [Bytes]__ | 2           | 1          |
| __Type__         | UINT16      | UINT8      |
| __Unit__         | 0.01 C      |  0.5 %     |


### Heartbeat uplink

__Uplink port: 11__

|                  |  Bytes[0:1]|  Bytes[2:3]| Bytes[4:5]  | Byte 6     |
|------------------|------------|------------|-------------|------------|
| __Value__        |  Battery   |Cell voltage| Temperature | RH         |
| __Size [Bytes]__ |  2         |  2         | 2           | 1          |
| __Type__         |  UINT16    |  UINT16    | UINT16      | UINT8      |
| __Unit__         |  mV        |   mV       | 0.01 C      |  0.5 %     |


### GNSS scan uplink

__Uplink port: 192__

|                  | Byte 0 | Bytes[1:N] |
|------------------|--------|------------|
| __Value__        | Last of scan group and group token | NAV message |
| __Size [Bytes]__ | 1      | max 49 |
| __Type__         | UINT8  | UINT8  |

### WiFi scan uplink

__Uplink port: 197__

|                  | Byte 0   | Byte 1   | Bytes[2:7] | Byte 8   | Bytes[9:14] | ... |          |         |
|------------------|----------|----------|------------|----------|-------------|-----|----------|---------|
| __Value__        | 0x01 | AP1 RSSI | AP1 MAC    | AP2 RSSI | AP2 MAC     |     | APN RSSI | APN MAC |
| __Size [Bytes]__ | 1        | 1        | 6          | 1        | 6           |     | 1        | 6       |
| __Type__         | UINT8    | UINT8    | UINT8      | UINT8    | UINT8       |     | UINT8    | UINT8   |

### Configuration uplink

__Uplink port: 4__

|                  | Byte 0 | Bytes[1:2]      | Bytes[3:4]      | Byte 5             |  Bytes[6:7]        | Bytes[8:9]    | Bytes[10:11] | Bytes[12:13] | Byte 14 | Byte 15 | Byte 16 | Byte 17 | Byte 18 | Byte 19 |
|------------------|--------|--------|--------|-----------------|-----------------|--------------------|--------------------|----------------|-------------|-------------|-------------|-------------|-------------|-------------|
| __Value__        | flags  |steady_interval_s|moving_interval_s|heartbeat_interval_h|acc_threshold_mg|acc_delay_ms |temperature_polling_interval_s|temperature_uplink_hold_interval_s|temperature_upper_threshold|temperature_lower_threshold|min_AP|Version_Major*|Version_Minor*|Version_Patch*|
| __Size [Bytes]__ | 1      | 2               | 2               | 1                  | 2                  | 2              | 2           | 2           | 1           | 1           | 1           |1           |1           |1           |
| __Type__         | UINT8  | UINT16          | UINT16          | UINT8              | UINT16              | UINT16         | UINT16      | UINT16      | INT8      |INT8      |UINT8       | UINT8       | UINT8       | UINT8       | 

*Firmware version is only available in the first uplink after reset.

### LIC Voltage levels uplink/downlink

__Uplink/Downlink port: 150__

|                  |  Bytes[0:1]   |  Bytes[2:3]  |  Bytes[4:5]  |  Bytes[6:7]  |  Bytes[8:9]  |
|------------------|---------------|--------------|--------------|--------------|--------------|
| __Value__        |lic_100_percent|lic_80_percent|lic_60_percent|lic_40_percent|lic_20_percent|
| __Size [Bytes]__ |  2            |  2           |  2           |  2           |  2           |
| __Type__         |     UINT16    |    UINT16    |    UINT16    |    UINT16    |    UINT16    |
| __Unit__         |     mV        |     mV       |    mV        |     mV       |     mV       |


## Downlinks


### Configuration downlink


__Downlink port: 128__

|                  | Byte 0 | Bytes[1:2]      | Bytes[3:4]      | Byte 5             |  Bytes[6:7]        | Bytes[8:9]   | Bytes[10:11]  | Bytes[12:13]        | Bytes 14|Bytes 15|Bytes 16|
|------------------|--------|-----------------|-----------------|--------------------|--------------------|--------------|---------------|---------------------|---------|--------|--------|
| __Value__        | flags  |steady_interval_s|moving_interval_s|heartbeat_interval_h|acc_threshold_mg     |acc_delay_ms |temperature_polling_interval_s|temperature_uplink_hold_interval_s|temperature_upper_threshold|temperature_lower_threshold|min_AP|
| __Size [Bytes]__ | 1      | 2               | 2               | 1                  | 2                  | 2            | 2             |2                    | 1       |1       |1       |
| __Type__         | UINT8  | UINT16          | UINT16          | UINT8              | UINT16             | UINT16       | UINT16        | UINT16              | INT8    |INT8    | UINT8              | 


In case temperature_polling_interval_s, temperature_uplink_hold_interval_s are set to 0, the function is disabled

### Reset downlink

__Downlink port: 129__

|                  | Byte 0 |
|------------------|--------|
| __Value__        | 1      |
| __Size [Bytes]__ | 1      |
| __Type__         | UINT8  | 

### Turn-off downlink

Command to turn the device off. Activation is only possible with button press afterwards. (Press for 0.2 seconds to enable, press for 10 seconds to disable)

__Downlink port: 130__

|                  | Byte 0 |
|------------------|--------|
| __Value__        | 1      |
| __Size [Bytes]__ | 1      |
| __Type__         | UINT8  | 



## Nonfunctional Requirements

### LoRaWan 1.0.4 Compliant

The software needs to compliant with LoRaWan 1.0.4 Standard and fullfill the certification process

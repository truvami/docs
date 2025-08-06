---
sidebar_label: Software description
---

# Software Description

## Overview

Software for an energy-efficient, LoRaWAN class A, indoor/outdoor asset tracking device capable of performing localization, movement detection and temperature and battery measurement. Based on the FMLR-LR1110 and LBM4 stack. 

Main functionality: 
- Localization through passive GNSS, WiFi sniffing, LoRa TDoA
- Indoor recognition with fall-back to WiFi sniffing
- Movment detection and configurable steady- and moving-intervals for localization triggering
- Temperature and battery voltage measurement with heartbeat uplink and configurable interval
- Configuration through LoRaWAN downlink
- LED for visual feedback of application state
- EU868/US915 compatibility





## State Diagramm
<img src="/img/smart label/fsm.svg" width="100%" height="auto"/>





###Class Diagram
<img src="/img/smart label/class.svg" width="60%" height="auto"/>



# Features Overview

### Functional Requirements

- [x] [F-001: Interval-triggered localization](#f-001-interval-triggered-localization)
- [x] [F-002: Movement-triggered localization](#f-002-movement-triggered-localization)
- [x] [F-003: Localization type selection](#f-006-localization-type-selection)
- [x] [F-004: Passive GNSS localization](#f-003-passive-gnss-localization)
- [x] [F-005: WiFi sniffing localization](#f-004-wifi-sniffing-localization)
- [x] [F-006: LoRa TDoA localization](#f-005-lora-tdoa-localization)
- [x] [F-007: Temperature and battery measuremnt](#f-007-temperature-and-battery-measurement) 
- [x] [F-008: Sleep](#f-008-sleep)
- [x] [F-009: Configuration parameters](#f-009-configuration-parameters)
- [x] [F-010: Power states](#f-010-power-states)
- [x] [F-011: LoRaWAN Join procedure](#f-011-lorawan-join-procedure)

### External Interface Requirements

- [x] [EI-001: LED](#ei-001-led)
- [x] [EI-002: Radio Specification](#ei-002-radio-specification)
- [x] [EI-003: Uplinks](#ei-003-uplinks)
- [x] [EI-004: Downlinks](#ei-004-downlinks)

### Nonfunctional Requirements

- [x] [NF-001 LoRaWan 1.0.4 Compliant](#nf-001-lorawan-104-compliant)

# Features

## Functional requirements

### F-001: Interval-triggered localization

In absence of movements, localization will be performed after the interval __steady_interval_s__. After a movmement-triggered localization the interval used to trigger the next interval-triggered localization is __moving_interval_s__ instead.

### F-002: Movement-triggered localization 

After the detection of a movement, localization is performed. Movements are detected with a LIS2DW accelerometer. The logic for a successfull movement detection is as follows:

- Detected acceleration is greater than the configured threshold __acc_threshold__ for at least the configured delay __acc_delay_ms__.

After a movement-triggered localization, the interval __moving_interval_s__ is used to trigger the following interval-triggered localization. An __hold_timer__ will ensure that a localization doesn't happen to shortly after the previous one. The __hold_timer__ is set to the minimum between __steady_interal_s__ and __moving_interval_s__.

### F-003: Localization type selection

The device starts by performing a WiFi sniffing. If the number of sniffed WiFi AP is less than __minAP__, then a pasive GNSS localization is attempted. Otherwise, the device sends the WiFi UL without attempting a GNSS localization. 

### F-004: Passive GNSS localization

Localization can be performed using passive GNSS. The LoRa Basic Modem geolocation service 'GNSS scan & send' is used for this purpose with the following options:

- MOBILE mode
- GPS & BEIDU
- SEND MODE, i.e. directly send the scan result if valid, __no buffering__.

The almanac update is done autonmously, using the GNSS almanac demodulation service available with LR11xx radio chip (i.e. without using LoRa Cloud assistance).

Refer to the LoRa Basic Modem geolocation services documentation for any further detail.

### F-005: WiFi sniffing localization

Localization can be performed using WiFi sniffing. The LoRa Basic Modem geolocation service 'WiFi scan & service' is used for this purpose with the following options:

- SEND MODE, i.e. directly send the scan result, __no buffering__.

Refer to the LoRa Basic Modem geolocation services documentation for any further detail.

### F-006: LoRa TDoA localization

Localization can also be performed using LoRa TDoA. This is handled completely in the cloud and no specific action must be performed by the software since any type of localization execution is followed by an uplink, needed in the cloud to perform LoRa TDoA localization.

### F-007: Temperature  and battery measurement

Temperature and battery voltage are measured every interval __heartbeat_interval_h__ (unit: hours). For the temperature a SHT3X sensor is used. The Battery voltage is inferred by measuring the internal reference voltage of the MCU. Temperature and battery data are sent in the heartbeat uplink.

### F-008: Sleep

If the software is not performing localization, movement detection or measurements, the MCU is put to sleep until the next action needs to be executed.

### F-009: Configuration parameters

| Parameter                  |  Type  |  Range   | Description | Default value |
|----------------------------|--------|----------|-------------|-------------|
| __steady_interval_s__      | UINT16 | 0..65535 | Interval for localization trigger while steady, in __seconds__ |21600|
| __moving_interval_s__      | UINT16 | 0..65535 | Interval for localization trigger while moving, in __seconds__ |3600|
| __temperature_polling_interval_s__      | UINT16 | 0..65535 | Interval for polling temperature sensor, in __seconds__ |900|
| __temperature_uplink_hold_interval_s__      | UINT16 | 0..65535 | Interval for temperature measurement uplink if it is outside of threshold, in __seconds__ |3600|
| __temperature_upper_threshold__                  | INT8  |  -127..128   | Temperature upper threshold to yield uplink from polling in __°C__ | 40 |
| __temperature_lower_threshold__                  | INT8  |  -127..128   | Temperature lower threshold to yield uplink from polling in __°C__ | -5 |
| __heartbeat_interval_h__   | UINT8  | 0..255   | Interval for temperature and battery measurement and uplink, in __hours__ | 12 |
| __acc_threshold_mg__       | UINT16 | 0..65535 | Accelerometer threshold to start movement detection, in __mg__ | 300 |
| __acc_delay_ms__           | UINT16 | 0..65535 | Acceleration delay for detecting movement, in __ms__ | 1500 |
| __flags__                  | UINT8  |          | See flags description | 00111110 |
| __lic_100_percent__           | UINT16 | 0..4000 | LIC 100% percentage VCELL voltage in __mV__ | 3800 |
| __lic_80_percent__           | UINT16 | 0..4000 | LIC 80% percentage VCELL voltage in __mV__ | 3650 |
| __lic_60_percent__           | UINT16 | 0..4000 | LIC 60% percentage VCELL voltage in __mV__ | 3500 |
| __lic_40_percent__           | UINT16 | 0..4000 | LIC 40% percentage VCELL voltage in __mV__ | 3250 |
| __lic_20_percent__           | UINT16 | 0..4000 | LIC 20% percentage VCELL voltage in __mV__ | 2850 |
| __min_AP__           | UINT8 | 1..6 | Minimum amount of AP(s) to yield an uplink | 3 |

__Flags__:
| Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 |Bits [2:0]|
|-------|-------|-------|-------|-------|----------|
|reserved|reserved|GNSS enable|WiFi sniffing enable|Acc enable|Data rate|


Data rate: 

000: DR5 (EU868 SF7), 

001: DR4 (EU868 SF8), 

010: DR3 (EU868 SF9, US915 SF7), 

011: DR2 (EU868 SF10, US915 SF8), 

100: DR1 (EU868 SF11, US915 SF9), 

101: DR0 (EU868 SF12), 

110: DR1-3 array (EU868 SF9-11, US915 SF7-9) [__DEFAULT__],  

111: ADR (SF7-12 for EU868)

Duty cycling is enabled by default to conform with regulations.
### F-010: Power states

In case the HW variant with the PV cell, LIC and harvester, different power states are introduced to preserve energy.

__Approximate Energy-Based Voltage Levels (for LICs)__:

| Energy % | Voltage |
|-------|-------|
|100%|3.8V|
|80%|3.65V|
|60%|3.5V|
|40%|3.25V|
|20%|2.85V|
|0%|2.5V|

On PCA-84306-2 the maximum level of VCC derived from VCap is limited to 3.67V due to Supply voltage limitations on certain components, limiting the full potential of the LIC to around 80%.

__Power states:__
* __Below 20%__: Send only 1 __Low Power battery uplink__ per day containing only voltage levels for the VCC and the PV Cell voltage
* __Between 20-40%__: Normal operation with accelerometer disabled (No location trigger by accelerometer)
* __Above 40%__: Normal operation

VCC measurement is performed before power-intensive operations, eg. location acquisition, sending uplink, etc.
 
### F-011: LoRaWAN Join procedure

After Power-On the device will attemt to Join the LoRaWAN network with OTAA with a random __Spreading Factor__.

In case the HW variant with the PV cell, LIC and harvester, the join procedure will not start until the LIC is at least 20% to avoid boot-loop.

__Join back-off strategy__: (Standard LBMv4 strategy)

* During first hour after first join try => duty cycle of 1/100 ie. 36s over 1 hour
* During the 10 hours following first hour after first join try => duty cycle of 1/1000 ie. 36s over 10 hours
* Following the first 11 hours after first join try => duty cycle of 1/10000 ie. 8.7s over 24 hours



## External Interface Requirements

### EI-001: LED

The LED on SmartLabel is used by the software as follows:
- Power on: 5 consecutive 100ms green blinks
- Join successful: 3 consecutive 100ms green blinks
- Join failed: 3 consecutive 100ms red blinks

### EI-002: Radio Specification

The device operates on:
 - LoRaWan
 - Region EU868, US915
 - Version 1.0.4
 - Class A

### EI-003: Uplinks

__Low Power battery uplink__

Uplink port: 1

Sent only once a day in case the energy level is below 20%

|                  |  Bytes[0:1]|  Bytes[2:3]|
|------------------|------------|------------|
| __Value__        |  Battery   |Cell voltage|
| __Size [Bytes]__ |  2         |  2         |
| __Type__         |  UINT16    |  UINT16    |
| __Unit__         |  mV        |   mV       |

__Temperature uplink__

Uplink port: 2

Temperature measurement uplink if the temperature is outside of thresholds

|                  | Bytes[0:1]  | Byte 2     |
|------------------|-------------|------------|
| __Value__        | Temperature | RH         |
| __Size [Bytes]__ | 2           | 1          |
| __Type__         | UINT16      | UINT8      |
| __Unit__         | 0.01 C      |  0.5 %     |


__Heartbeat uplink__

Uplink port: 11

|                  |  Bytes[0:1]|  Bytes[2:3]| Bytes[4:5]  | Byte 6     |
|------------------|------------|------------|-------------|------------|
| __Value__        |  Battery   |Cell voltage| Temperature | RH         |
| __Size [Bytes]__ |  2         |  2         | 2           | 1          |
| __Type__         |  UINT16    |  UINT16    | UINT16      | UINT8      |
| __Unit__         |  mV        |   mV       | 0.01 C      |  0.5 %     |


__GNSS scan uplink__

Uplink port: 192

|                  | Byte 0 | Bytes[1:N] |
|------------------|--------|------------|
| __Value__        | Last of scan group and group token | NAV message |
| __Size [Bytes]__ | 1      | max 49 |
| __Type__         | UINT8  | UINT8  |

__WiFi scan uplink__

Uplink port: 197

|                  | Byte 0   | Byte 1   | Bytes[2:7] | Byte 8   | Bytes[9:14] | ... |          |         |
|------------------|----------|----------|------------|----------|-------------|-----|----------|---------|
| __Value__        | 0x01 | AP1 RSSI | AP1 MAC    | AP2 RSSI | AP2 MAC     |     | APN RSSI | APN MAC |
| __Size [Bytes]__ | 1        | 1        | 6          | 1        | 6           |     | 1        | 6       |
| __Type__         | UINT8    | UINT8    | UINT8      | UINT8    | UINT8       |     | UINT8    | UINT8   |

__Configuration uplink__

Uplink port: 4

|                  | Byte 0 | Bytes[1:2]      | Bytes[3:4]      | Byte 5             |  Bytes[6:7]        | Bytes[8:9]    | Bytes[10:11] | Bytes[12:13] | Byte 14 | Byte 15 | Byte 16 | Byte 17 | Byte 18 | Byte 19 |
|------------------|--------|--------|--------|-----------------|-----------------|--------------------|--------------------|----------------|-------------|-------------|-------------|-------------|-------------|-------------|
| __Value__        | flags  |steady_interval_s|moving_interval_s|heartbeat_interval_h|acc_threshold_mg|acc_delay_ms |temperature_polling_interval_s|temperature_uplink_hold_interval_s|temperature_upper_threshold|temperature_lower_threshold|min_AP|Version_Major*|Version_Minor*|Version_Patch*|
| __Size [Bytes]__ | 1      | 2               | 2               | 1                  | 2                  | 2              | 2           | 2           | 1           | 1           | 1           |1           |1           |1           |
| __Type__         | UINT8  | UINT16          | UINT16          | UINT8              | UINT16              | UINT16         | UINT16      | UINT16      | INT8      |INT8      |UINT8       | UINT8       | UINT8       | UINT8       | 

*Firmware version is only available in the first uplink after reset.

__LIC Voltage levels uplink/downlink__

Uplink/Downlink port: 150

|                  |  Bytes[0:1]   |  Bytes[2:3]  |  Bytes[4:5]  |  Bytes[6:7]  |  Bytes[8:9]  |
|------------------|---------------|--------------|--------------|--------------|--------------|
| __Value__        |lic_100_percent|lic_80_percent|lic_60_percent|lic_40_percent|lic_20_percent|
| __Size [Bytes]__ |  2            |  2           |  2           |  2           |  2           |
| __Type__         |     UINT16    |    UINT16    |    UINT16    |    UINT16    |    UINT16    |
| __Unit__         |     mV        |     mV       |    mV        |     mV       |     mV       |


### EI-004: Downlinks


__Configuration downlink__


Downlink port: 128

|                  | Byte 0 | Bytes[1:2]      | Bytes[3:4]      | Byte 5             |  Bytes[6:7]        | Bytes[8:9]   | Bytes[10:11]  | Bytes[12:13]        | Bytes 14|Bytes 15|Bytes 16|
|------------------|--------|-----------------|-----------------|--------------------|--------------------|--------------|---------------|---------------------|---------|--------|--------|
| __Value__        | flags  |steady_interval_s|moving_interval_s|heartbeat_interval_h|acc_threshold_mg     |acc_delay_ms |temperature_polling_interval_s|temperature_uplink_hold_interval_s|temperature_upper_threshold|temperature_lower_threshold|min_AP|
| __Size [Bytes]__ | 1      | 2               | 2               | 1                  | 2                  | 2            | 2             |2                    | 1       |1       |1       |
| __Type__         | UINT8  | UINT16          | UINT16          | UINT8              | UINT16             | UINT16       | UINT16        | UINT16              | INT8    |INT8    | UINT8              | 


In case temperature_polling_interval_s, temperature_uplink_hold_interval_s are set to 0, the function is disabled

__Reset downlink__

Downlink port: 129

|                  | Byte 0 |
|------------------|--------|
| __Value__        | 1      |
| __Size [Bytes]__ | 1      |
| __Type__         | UINT8  | 

__Turn-off downlink__

Command to turn the device off. Activation is only possible with button press afterwards. (Press for 0.2 seconds to enable, press for 10 seconds to disable)

Downlink port: 130

|                  | Byte 0 |
|------------------|--------|
| __Value__        | 1      |
| __Size [Bytes]__ | 1      |
| __Type__         | UINT8  | 



## Nonfunctional Requirements

### NF-001 LoRaWan 1.0.4 Compliant

The software needs to compliant with LoRaWan 1.0.4 Standard and fullfill the certification process

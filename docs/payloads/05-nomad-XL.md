---
sidebar_label: nomad XL
---

# Payload Format of nomad XL

<br></br>
## Uplinks
<br></br>

### Payload Types

| Port    | Type          | Description                                                        |
|---------|---------------|--------------------------------------------------------------------|
| 100     | Welcome       | Device type, firmware version, hardware ID. Sent once after reboot |
| 101     | Status        | Battery level, buffer status information and sensor data           |
| 103     | Location      | GPS location information and time                                  |
| 150-200 | Proprietary   | Refer to application-specific documentation                        |
| 212     | Git           | Git revision. Sent once after reboot.                              |
| 220     | Configuration | Device configuration using AT command downlinks                    |

### Number Encoding

Signed integers use two’s complement for encoding.

[comment]: <> (!!! important)
<b>important</b>

    Unless otherwise noted, payloads will use [big endian](https://en.wikipedia.org/wiki/Endianness) data encoding.

### <b>Payload Description</b>

### Welcome Message

Contains information about the device and firmware. The welcome message is sent only once after reboot.

| Byte | Size | Description                                                    | Format   |
|------|------|----------------------------------------------------------------|----------|
| 0    | 1    | Device type (Tracker=1)                                        | enum     |
| 1    | 1    | Device sub-type (nomad XS=1, nomad XL=3)                   | enum     |
| 2-5  | 4    | Firmware version hash                                          | uint32   |
| 6    | 1    | Reset source (1=WU, 2=PIN, 3=LPW, 4=SW, 5=POR, 6=IWDG, 7=WWDG) | enum     |
| 7-14 | 8    | Hardware ID                                                    | uint64_t |

### Status Message

Contains general status information and environmental sensor data.

| Byte  | Size | Description                                         | Format              |
|-------|------|-----------------------------------------------------|---------------------|
| 0-7   | 8    | System time (ms since reset)                        | uint64_t, ms        |
| 8-11  | 4    | UTC Date                                            | uint32, DDMMYY      |
| 12-15 | 4    | UTC Time                                            | uint32, HHMMSS      |
| 16-17 | 2    | Buffer level (STA)                                  | uint16              |
| 18-19 | 2    | Buffer level (GPS)                                  | uint16              |
| 20-21 | 2    | Buffer level (ACC)                                  | uint16              |
| 22-23 | 2    | Buffer level (LOG)                                  | uint16              |
| 24-25 | 2    | Temperature                                         | int16, 0.1 °C       |
| 26-27 | 2    | Pressure                                            | uint16, 0.1 hPa     |
| 28-29 | 2    | Orientation X                                       | int16, mG           |
| 30-31 | 2    | Orientation Y                                       | int16, mG           |
| 32-33 | 2    | Orientation Z                                       | int16, mG           |
| 34-35 | 2    | Battery voltage                                     | uint16, mV          |
| 36    | 1    | LoRaWAN battery level (1 to 254)                    | uint8               |
| 37    | 1    | Last TTF (time to fix)                              | uint8, s            |
| 38-39 | 2    | NMEA sentences checksum OK                          | uint16              |
| 40-41 | 2    | NMEA sentences checksum fail                        | uint16              |
| 42-43 | 2    | Total GPS signal to noise (0-99 for each satellite) | uint16, C/n0 [dBHz] |
| 44    | 1    | GPS satellite count Navstar                         | uint8               |
| 45    | 1    | GPS satellite count Glonass                         | uint8               |
| 46    | 1    | GPS satellite count Galileo                         | uint8               |
| 47    | 1    | GPS satellite count Beidou                          | uint8               |
| 48-49 | 2    | GPS dilution of precision                           | uint16, cm          |

### Location Message

Contains GPS time and location information. If the payload is all zeros, the nomad XL could not acquire a GPS fix.

| Byte  | Size | Description | Format               |
|-------|------|-------------|----------------------|
| 0-3   | 4    | UTC Date    | uint32, DDMMYY       |
| 4-7   | 4    | UTC Time    | uint32, HHMMSS       |
| 8-11  | 4    | Latitude    | int32, 1/100'000 deg |
| 12-15 | 4    | Longitude   | int32, 1/100'000 deg |
| 16-19 | 4    | Altitude    | int32, 1/100 m       |

### Git Revision

Contains the Git revision of the firmware build. The Git message is sent only once after reboot.

| Byte | Size | Description  | Format     |
|------|------|--------------|------------|
| 0-19 | 20   | Git Revision | binary/hex |

<br></br>

## Downlinks
<br></br>

nomad XL is configured with LoRaWAN® downlinks which are transmitted to port 220. The payload of a configuration 
downlink corresponds to a so-called AT command. After one or more configuration downlinks are received, a reset 
command needs to be transmitted to the nomad XL such that the configuration is stored in non-volatile memory 
and a reset is triggered. After this reset, the nomad XL uses the new configuration.

### Configuration commands and responses

Configuration downlink commands and responses are sent as plain text. Note that commands need to be zero-terminated. 

| Byte    | Size | Description             | Format |
|---------|------|-------------------------|--------|
| 0-(n-1) | n    | AT command              | ASCII  |
| n       | 1    | zero-termination (0x00) | char   |

| Byte    | Size | Description                  | Format |
|---------|------|------------------------------|--------|
| 0-(n-1) | n    | Reply to previous AT command | ASCII  |
| n       | 1    | zero-termination (0x00)      | char   |

### <b>Downlink commands</b>

### Overview

The following configuration downlands are available:

| Command             | Description                             | Default value              | Min value              | Max value                       | Unit |
|---------------------|-----------------------------------------|----------------------------|------------------------|---------------------------------|------|
| ATZ                 | Reset the MCU                           | -                          | -                      | -                               | -    |
| AT+GPSHOLD=<value/> | Moving interval <br/> (GNSS hold time)   | 120'000 <br/> (2 min)      | 60'000 <br/> (1 min)   | 4'294'967'295 <br/> (49.7 days) | ms   |
| AT+GPSCYC=<value/>  | Steady interval <br/> (GNSS cycle time ) | 21'600'000 <br/> (6 hours) | 60'000 <br/> (1 min)   | 4'294'967'295 <br/> (49.7 days) | ms   |
| AT+STACYC=<value/>  | Status message interval                 | 21'600'000 <br/> (6 hours) | 600'000 <br/> (10 min) | 4'294'967'295 <br/> (49.7 days) | ms   |

### ATZ

Resets the MCU. If the configuration has been changed, the new configuration is stored in non-volatile memory and
applied after the reset.

### AT+GPSHOLD

Sets the GNSS hold time, also known as a moving interval. The GNSS hold time inhibits further GNSS fix acquisition for a 
certain time period. This setting is used when GNSS fixes are triggered by the accelerometer. A first accelerometer 
event will trigger GNSS fix acquisition immediately. Further accelerometer events will be ignored until after the hold 
time interval. However, a flag will be set in this case, so that the next GNSS fix acquisition will immediately start 
right after the hold time interval.

[comment]: <> (!!! example)
<b>example</b>

    Setting the moving interval to 5 minutes (300 seconds)

    ```
    AT+GPSHOLD=300000
    ```

### AT+GPSCYC

Sets the regular GNSS fix cycle time, also known as a steady interval. The GNSS cycle time is used when GNSS fixes are 
triggered by the timer. The GNSS cycle time is the time between two consecutive GNSS fix acquisitions. The GNSS cycle time 
is running independently of accelerometer events.

[comment]: <> (!!! example)
<b>example</b>

    Setting the steady interval to 1 hour (3600 seconds)

    ```
    AT+GPSCYC=3600000
    ```

### AT+STACYC

Set the regular status interval. Status messages are enabled by default, all sensors are read out when the regular 
status interval expires. 

[comment]: <> (!!! example)
<b>example</b>

    Setting the status interval to 12 hours (43200 seconds)

    ```
    AT+GPSCYC=3600000
    ```

## Downlink responses

For every downlink packet, an uplink packet is scheduled containing the corresponding AT response code. The following 
response codes are available:

| Response code  | Hexadecimal                  | Description                            |
|----------------|------------------------------|----------------------------------------|
| AT_OK          | 41545F4F4B                   | Command executed successfully          |
| AT_PARAM_ERROR | 41545F504152414D5F4552524F52 | Command was outside of the valid range |
| AT_ERROR       | 41545F4552524F52             | Command execution failed               |

## Downlink command format

The payload of an AT command downlink corresponds to an ASCII encoded AT command with zero-termination. Zero-termination 
means that `00` needs to be added at the very end of the hexadecimal representation of the AT command. The last line 
of the following examples corresponds to the payload of the respective downlink.

[comment]: <> (!!! example)
<b>example</b>

    Changing the moving interval to 3 minutes (180 seconds) send the following command

    | Representation             | Data                                 |
    |----------------------------|--------------------------------------|
    | ASCII string               | AT+GPSHOLD=180000                    |
    | Hex                        | 41542B475053484F4C443D313830303030   |
    | Hex with zero termination: | 41542B475053484F4C443D31383030303000 |

[comment]: <> (!!! example)
<b>example</b>
    
    Resetting the device:

    | Representation             | Data     |
    |----------------------------|----------|
    | ASCII string               | ATZ      |
    | Hex                        | 41545A   |
    | Hex with zero termination: | 41545A00 |

[comment]: <> (!!! important)
<b>important</b>

    After changing a configuration parameter via downlink, the nomad XL needs to be reset such that the configuration 
    is loaded. This is done by sending the downlink command `ATZ` on port 220.

For every downlink packet, an uplink packet is scheduled containing the corresponding AT response code (usually `AT_OK` 
or `41545F4F4B` in hexadecimal representation). If both the configuration change and the reset are queued simultaneously 
on the LoRaWAN® network server, the configuration is applied the fastest way possible. The reason for this being that
the configuration change triggers an uplink message (usually `AT_OK`) which opens another downlink slot for the reset
command to be received immediately.


<br></br>

:::warning Support 
<br></br>
For support, please submit a ticket. We will provide support as promptly as possible. <br></br>
For questions, please write an email to hey@truvami.com <br></br>

[**Click here to open a new ticket**](https://truvami.com/service-request/)
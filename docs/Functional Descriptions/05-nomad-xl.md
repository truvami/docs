---
sidebar_label: nomad XL 
---

# Functional Description for the nomad XL


## Overview

nomad XL is a powerful and flexible GNSS tracking device that integrates a multistandard GNSS receiver with an 
accelerometer and LoRaWAN® connectivity into one compact device. Optionally, a temperature sensor, humidity sensor 
and barometer can be added. The IP67-rated housing with different mounting options protects the device at operation 
in harsh industrial environments. The device firmware allows for configuration to a specific use case to optimize 
performance and battery lifetime.

If you just received your first nomad XL device, please visit our [Getting Started Guide](docs/getting-started/05-nomad-XL.md) to get started.

## GNSS fixes

A nomad XL tracker acquires GNSS fixes and transmits them to a LoRaWAN® network server. If the device is steady, GNSS 
fixes are triggered at a regular interval (usually multiple hours). On the other hand, if the nomad XL is moving, 
acceleration events trigger GNSS fixes at a different rate (usually multiple minutes). The steady and moving interval 
times are both configurable. To configure the moving interval, the `AT+GPSHOLD` command is used and to configure the 
steady interval `AT+GPSCYC` is used. For more information about these commands, please refer to the 
[Payload documentation](docs/payloads/05-nomad-XL.md#downlink-commands) page.

The steady interval is used whenever the nomad XL is not moving to save battery. As soon as an accelerometer event is 
 triggered, a GNSS fix acquisition is started immediately. Further accelerometer events will be ignored until the moving 
interval time elapses. However, a flag will be set in this case, such that the next GNSS fix acquisition will start 
immediately after moving interval time elapses.

If a GNSS fix is acquired, a location message will be transmitted to the LoRaWAN® network server. The payload format of 
the location message is described [here](docs/payloads/05-nomad-XL.md#location-message). If the payload of the location message is zero,
no GNSS fix could be acquired. This happens mostly because the nomad XL has no clear view of the sky, for example, 
if it is inside a building. The GNSS reception of the nomad XL is best if it is placed outdoors and the label is 
facing the sky as in the picture below.

[comment]: <> (![nomad XL Orientation])

## Status messages

On a regular interval, the auxiliary sensors (accelerometer, battery voltage, temperature, humidity, pressure if 
available) are readout to generate a status message. This payload will also include the current system time, the current
unixtime and some information about the last fix. Please refer to the 
[status message payload documentation](docs/payloads/05-nomad-XL.md#status-message) for more information. The status message interval 
time is set with the `AT+STACYC` command. Usually, a status message is sent only a few times per day.

## Device configuration

A nomad XL is configurable via LoRaWAN® down-links. The available commands are:

* `AT+GPSHOLD` - moving interval time
* `AT+GPSCYC` - steady interval time
* `AT+STACYC` - status message interval time

For more information about these commands and the configured default values, read our [configuration](docs/payloads/05-nomad-XL.md#downlink-commands) page.

## Data buffer

nomad XL trackers use LoRaWAN® confirmation to ensure that every message is received by the LoRaWAN® network 
server. If no confirmation is received, the messages are buffered on the nomad XL and transmitted at a later point in
time when the LoRaWAN® network is available again.

A nomad XL is equipped with a FLASH chip which is used to buffer the messages which could not be transmitted. 
Typically, a 16 MBit FLASH memory is used which allows storing several thousand location and status messages. 
If no network is available, the device tries to transmit the messages every once in a while. As soon as one of the 
messages is confirmed again, the nomad XL switches back to normal operation and starts to upload the buffered
messages. The buffer is implemented as a FIFO queue which means that the oldest messages are transmitted first.

## Reset

A nomad XL can be reset either by sending a LoRaWAN® downlink command or by using a magnet to trigger a reset when 
the device is in reach. After a reset, the device will start to join the LoRaWAN® network again. The device will not 
send any messages until it has joined the LoRaWAN® network again.

The LoRaWAN® downlink command to reset the device is `ATZ`. The magnet reset is triggered by placing a magnet next to 
the "C" of the nomad XL logo, see the picture below. The magnet must be placed for at least 8 seconds to trigger a 
reset. Once the reset was triggered, the nomad XL will beep 3 times. The LED inside the housing will be green for 
10 seconds and then turn off. After 10 seconds, the nomad XL tries to join the LoRaWAN® network again using its 
keys. If it joins successfully, it makes one long beep and the LED is white for 1 second. This only works if the nomad XL is registered on a LoRaWAN® network server and if a LoRaWAN® gateway is in range.

[comment]: <> (![nomad XL Magnet Reset])
<img src="/img/functional-descriptions-imgs/nomad_XL_magnet_placement.webp" width="100%" height="auto"/>

## Batteries

A nomad XL is powered by 2 AA batteries. The device is designed to work with alkaline batteries. The battery lifetime 
mainly depends on the configured interval times. Battery lifetime increases with interval time. The temperature also 
influences the battery lifetime. The battery lifetime is typically between 1 and 2 months. The current battery voltage
is reported with every status message.

If the nomad XL runs out of battery, you need to get the nomad XL out of the field and replace the batteries. Open 
the housing of the nomad XL by removing the 4 screws on top (yellow boxes in the picture below) with a standard 
Phillips screwdriver.

[comment]: <> (![nomad XL Screws])
<img src="/img/functional-descriptions-imgs/nomadXL_Screws.webp" width="100%" height="auto"/>

Please replace the batteries with 2 new AA alkaline batteries. Once the new batteries were inserted, the nomad XL boots
which is indicated by 3 short beeps and the LED being green for 10 seconds.
 
[comment]: <> (![nomad XL Boot])

After 10 seconds, the nomad XL tries to join the LoRaWAN® network again using its keys. If it joins successfully, 
it makes one long beep and the LED is white for 1 second. This only works if the nomad XL is registered on a 
LoRaWAN® network server and if a LoRaWAN® gateway is in range.

[comment]: <> (![nomad XL Join])

:::important
Tighten the screws firmly afterwards to ensure the best possible sealing.
:::

## Join behavior

The nomad XL firmware has a different join behavior for each region. The general idea is that the nomad XL tries to 
join the LoRaWAN® network a few times before it goes to sleep and tries again later. This procedure saves battery
power and ensures that the nomad XL is not always trying to join the LoRaWAN® network.

If the nomad XL is configured for the EU868 or AS923 regions, it tries to join twice before sleeping for 15 minutes. 
For the US915 region, it tries to join 18 times before sleeping for 30 minutes. For the AU915 region, it tries to join 
64 times before sleeping for 1 hour. The join behavior is implemented in the firmware and cannot be changed. It is 
based on the 
[LoRaWAN® Regional Parameters v1.0.3revA](https://lora-alliance.org/resource_hub/lorawan-regional-parameters-v1-0-3reva/) 
specification.

---
sidebar_label: tag L
---

# Functional Description for the tag L


## General Overview and Information

The truvami tag L device is a powerful and flexible GNSS tracking device that integrates a multi-standard GNSS module 
and passive Wi-Fi MAC address scanner with Bluetooth 5.2 connectivity and sensors such as accelerometer and a hall sensor into one 
compact device. 

## Device Initialization and Joining

This overview shows the general procedure at start-up. To activate the device put the magnet on the device on the designated spot for at least 5 seconds until you hear the buzzer.

After activation, the device starts to join to the LoRaWAN network.
If a network connection is established, the device will start to track the asset and start to send messages to the LoRaWAN network server, such as location fixes and status updates.

If a join trial fails, the device will retry the join until the battery runs out in randomized time intervals.

## Operation modes

Our tracker operates in two intervals: a **steady** interval and a **moving** interval. During the steady interval, it periodically tracks the asset's location when it is not in motion. When motion is detected, it switches to the moving interval for more frequent location updates. When there is no motion, it reverts to the steady interval. In between intervals, the device enters sleep mode to conserve power. This approach ensures timely updates, power efficiency, and long battery life.
<br></br>
<img src="/img/functional-descriptions-imgs/tag_L_diagram_new.webp" width="50%" height="auto"/>

<br></br>
_tag L state diagram_
<br></br>

:::important

    All mentioned device tracking time periods are adjustable. Consider the Payload documentation.
:::


The device tracks the location with [Wi-Fi](https://en.wikipedia.org/wiki/Wi-Fi) and 
[GNSS](https://en.wikipedia.org/wiki/GNSS_applications) scans and sends the collected data through a gateway to a 
backend sever. The location acquisition can entail GNSS fixes and Wi-Fi scans depending on settings.

_tag L moving/steady intervals_
<br></br>
<img src="/img/functional-descriptions-imgs/moving_steady_intervals_new.webp" width="50%" height="auto"/>

<br></br>
_Example: LS, LM intervals with Accelerometer trigger_
<br></br>



## Enabling BLE advertisement

BLE can be enabled either by sending a downlink or with a magnet activation. When BLE is enabled the device sends advertisement messages.

To enable BLE via downlink, please refer to the payload documentation.

In case a magnet is placed to the designated spot for 5 seconds, the BLE will be enabled for 5 minutes. It will advertise and can be connected to within this timeframe.

## BLE FW update over the air

Firmware update over the air can be performed via BLE. By downloading the
[EFR Connect App](https://www.silabs.com/developers/efr-connect-mobile-app).

After connecting the device through the app, clicking on the OTA DFU, we can select the firmware we want to update it with. After update is finished clicking the END button will severe connection and the device will reset with the new FW revision.

## Device Reset

To reset the device, place the magnet to the designated spot for 10 seconds.

## Buzzer functionality

Buzzer can be activated via a downlink, for more information please refer to the payload documentation


<br></br>

:::warning Support 
<br></br>
For support, please submit a ticket. We will provide support as promptly as possible. <br></br>
For questions, please write an email to hey@truvami.com <br></br>

[**Click here to open a new ticket**](https://truvami.com/service-request/)
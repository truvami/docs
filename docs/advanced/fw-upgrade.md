# Firmware Upgrade via OTA

:::warning
This site is under construction. Some information may be incomplete or missing. 🚧
:::

This user manual provides instructions for upgrading the device's application using the Simplicity Connect app on a smartphone via OTA (Over-The-Air) method. Ensure that you have another device (smartphone) with Bluetooth capability and the Simplicity Connect app installed.

## Prepare for Upgrade

1. Download and install the Si Connect app on your smartphone. <table><thead><tr><th>iOS</th><th>Android</th></tr></thead><tbody><tr><td><img src="/img/fw-upgrade/appstore.png" alt="QR Code" /></td><td><img src="/img/fw-upgrade/playstore.png" alt="QR Code" /></td></tr><tr><td><a href="https://apps.apple.com/us/app/simplicity-connect/id1030932759"target="_blank">Download</a></td><td><a href="https://play.google.com/store/apps/details?id=com.siliconlabs.bledemo&hl=en"target="_blank">Download</a></td></tr></tbody></table>
2. Copy the upgrade files from your computer to your smartphone. For example, copy "sl_tracker_ota_vx.x.x.gbl" to your smartphone.

## Enable Bluetooth

1. From your smartphone's settings menu, enable Bluetooth.
2. To activate Bluetooth pairing on the truvami tag S, hold the button for 5 seconds until the LED turns off. Upon successful Bluetooth activation, you should hear a melody.

## Upgrade the Device

1. Open the Si Connect app on your smartphone.
2. Select the "Scan" option from the app's main menu.
    <table><tbody><tr><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>
3. Locate your target device. It is advertised as `tag_S_XXXX`.
    <table><tbody><tr><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>

    :::note
    Make sure your smartphone is in close proximity to the target device to avoid confusion with other devices advertising the same name. 4. Tap on the "Connect" button to establish a connection with the target device.
    :::

5. Open the context menu by tapping "OTA Firmware" in the upper right corner of the app.
    <table><tbody><tr><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>

6. Select "Partial" Update Type and "Reliability" Mode from the menu.
    <table><tbody><tr><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>

7. Select " sl_tracker_ota_vx.x.x.gbl" as the application image for the upgrade.
8. Tap on the "Upload" button to initiate the upgrade process.
    <table><tbody><tr><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>

   :::note
   Make sure that your smartphone stays on during the upgrading process.
   :::

9. After completion press the "Done" (on iOS) / "End" (on Android) button to finish the installation and disconnect from the device.
    <table><tbody><tr><td><img src="/img/fw-upgrade/ios-update-complete.webp" alt="Search for Device" width="200" /></td><td><img src="/img/fw-upgrade/search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>

## Verify Upgrade Success

1. After the upload is complete, you should not be able to see your tracker again in the Bluetooth Browser (Bluetooth has been deactivated).
2. The tracker will start the network joining process which is indicated by the join melody.

Congratulations! Your device has been successfully upgraded using the OTA method. If you encounter any issues during the upgrade process, please consult the troubleshooting section of the user manual or contact customer support for assistance.

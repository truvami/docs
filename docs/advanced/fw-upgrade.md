# Firmware Upgrade via OTA

:::warning
This does only apply to the Truvami® tag S and Truvami® tag L
:::

This user manual provides instructions for upgrading the device's application using the Simplicity Connect app on a smartphone via OTA (Over-The-Air) method. Ensure that you have another device (smartphone) with Bluetooth capability and the Simplicity Connect app installed.

## Prepare for Upgrade

1. Download and install the Si Connect app on your smartphone. <table><thead><tr><th>iOS</th><th>Android</th></tr></thead><tbody><tr><td><img src="/img/fw-upgrade/AppStore.png" alt="QR Code" /></td><td><img src="/img/fw-upgrade/PlayStore.png" alt="QR Code" /></td></tr><tr><td><a href="https://apps.apple.com/us/app/simplicity-connect/id1030932759"target="_blank">Download</a></td><td><a href="https://play.google.com/store/apps/details?id=com.siliconlabs.bledemo&hl=en"target="_blank">Download</a></td></tr></tbody></table>
2. Copy the upgrade files from your computer to your smartphone. For example, copy "sl_tracker_ota_vx.x.x.gbl" to your smartphone.

## Enable Bluetooth

#### Step 1: 
  - From your smartphone's settings menu, enable Bluetooth.
#### Step 2
  - tag S: To activate Bluetooth pairing on the Truvami tag S, hold the button for 5 seconds until the LED turns off.
  - tag L: To activate Bluetooth pairing on the Truvami tag L, hold a magnet to the top of the device for 5 seconds. 
Upon successful Bluetooth activation, you should hear a melody.


## Upgrade the Device

1. Open the Si Connect app on your smartphone.
2. Select the "Scan" option from the app's main menu.
    <table><tbody><tr><td><img src="/img/fw-upgrade/ios_search-for-device.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>

3. Locate your target device. It is advertised as `tag_S_XXXX`.
    <table><tbody><tr><td><img src="/img/fw-upgrade/and_target_device.webp" alt="Locate your target device" width="200"/></td></tr></tbody></table>

    :::note
    Make sure your smartphone is in close proximity to the target device to avoid confusion with other devices advertising the same name. 4. Tap on the "Connect" button to establish a connection with the target device.
    :::

4. Open the context menu by tapping "OTA Firmware" in the upper right corner of the app.
    <table><tbody><tr><td><caption><em>IOS</em></caption><img src="/img/fw-upgrade/ios_tag_s_detail.webp" alt="Context Menu" width="200" /></td><td><caption><em>Android</em></caption><img src="/img/fw-upgrade/and_tag_s_detail.webp" alt="Context Menu" width="200" /></td></tr></tbody></table>

5. Select "Partial" Update Type and "Reliability" Mode from the menu.
    <table><tbody><tr><td><caption><em>IOS</em></caption><img src="/img/fw-upgrade/ios_device_firmware_update.webp" alt="OTA Device Firmware Update" width="200" /></td><td><caption><em>Android</em></caption><img src="/img/fw-upgrade/and_device_firmware_update.webp" alt="OTA Device Firmware Update" width="200" /></td></tr></tbody></table>

6. Select " sl_tracker_ota_vx.x.x.gbl" as the application image for the upgrade.
    <table><tbody><tr><td><img src="/img/fw-upgrade/and_firmware_selected.webp" alt="Search for Device" width="200" /></td></tr></tbody></table>


7. Tap on the "Upload" button to initiate the upgrade process.
    <table><tbody><tr><td><caption><em>IOS</em></caption><img src="/img/fw-upgrade/ios_update_process.webp" alt="Uploading New Firmware" width="200" /></td><td><caption><em>Android</em></caption><img src="/img/fw-upgrade/and_upload_process.webp" alt="Uploading New Firmware" width="200" /></td></tr></tbody></table>

   :::note
   Make sure that your smartphone stays on during the upgrading process.
   :::

8. After completion press the "Done" (on iOS) / "End" (on Android) button to finish the installation and disconnect from the device.
    <table><tbody><tr><td><img src="/img/fw-upgrade/ios_update_complete.webp" alt="Done" width="200"/></td></tr></tbody></table>

## Verify Upgrade Success

1. After the upload is complete, you should not be able to see your tracker again in the Bluetooth Browser (Bluetooth has been deactivated).
2. The tracker will start the network joining process which is indicated by the join melody.

Congratulations! Your device has been successfully upgraded using the OTA method. If you encounter any issues during the upgrade process, please consult the troubleshooting section of the user manual or contact customer support for assistance.

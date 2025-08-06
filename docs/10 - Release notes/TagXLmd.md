# tag XL

| Version | Release Date    | Changes |
|---------|--------------|---------|
| V3.1.1 | 2025-08-06 | <ul><li>Increment settings NVM key</li></ul> |
| V3.1.0 | 2025-07-30 | <ul><li>Downlink to change data rate</li><li>Default data rate is ADR</li><li>New NVM entry for data rate options</li></ul> |
| V3.0.0 | 2025-07-23 | <ul><li>Bootloader with minimal BLE functionalities for OTA DFU</li><li>BLE OTA DFU on application level</li><li>CI build for .gbl images</li><li>Store and forward buffer maximum of 1414 elements reduced to 202 to make space for BLE</li></ul> |
| V2.2.0 | 2024-11-27 | <ul><li>First GNSS scan is only started if device joined successfully or if join failed twice</li><li>Build for multiple regions</li><li>CI builds for regions EU868 and US915</li></ul> |
| V2.1.1 | 2024-10-31 | <ul><li>Set number of transmissons per message to 1 (battery life optimization)</li><li>Set default steady interval to 2h (battery life optimization)</li><li>Set default heartbeat interval to 6h (battery life optimization)</li></ul> |
| V2.1.0 | 2024-10-23 | <ul><li>Accelerometer driver for LIS2DW, copied from Rotation Detector repository</li><li>Restart timers when tracking intervals are updated via downlink</li><li>Downlink runner command to start a location scan</li><li>Downlink runner command to clear buffer of the store and forward service	</li><li>Generic function to send settings uplinks where port, conìrmation and store_and_fwd are configurable</li><li>Gyroscope driver for LSM6DSO, copied from Rotation Detector repository</li></ul> |
| V2.0.0 | 2024-06-27 | <ul><li>Ported tag XL firmware to LBM v4</li></ul> |
| V1.1.1 | 2024-03-25 | <ul><li><li>Delay sending of welcome message</li><li>Disable LBM device management (dm) messages right after joining	</li><li>Enable WiFi scanning by defaultSet default heartbeat interval to 1h</li></li></ul> |
| V1.1.0 | 2024-02-13 | <ul><li>Only save settings to flash if they have changed</li><li>Downlink command to reset the device</li></ul> |
| V1.0.0 | 2022-07-28 | <ul><li>Initial release</li></ul> |




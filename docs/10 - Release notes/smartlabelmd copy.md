# smart label

| Version | Release Date    | Changes |
|---------|--------------|---------|
| V1.1.1 | 2025-08-21 | <ul><li>function 'static void start_heartbeat_timer( long timeout_ms )' got fixed to avoid overflow when timer hits uin32 limit</li><li>function 'static void location_fsm( void )' is now in the idle mode</li><li>'wifi_done_flag' should is set when the 'SMTC_MODEM_EVENT_WIFI_TERMINATED' is received</li><li>only functions 'hal_mcu_init' and 'smtc_modem_init' are called with disabled interrupts.</li><li>default value of 'below_40_percent' has been changed to true</li><li>location_fsm and motion_fsm are now idle when low_power_mode_active is true</li><li>Add a new setting for the low battery uplink period.</li><li>Add 'reset_mcu_acc_threshold', this resets the mcu when the lis settings are changed</li><li>Add asynchronous error message if any FSM execution took too long</li><li>Add default SF10 datarate for US915</li><li>Add 'power_fsm' function to deal with power transitions between the different states</li><li>Removed ADR</li></ul> |
| V1.1.0 | 2025-08-06 | <ul><li>Major bug fix following code review</li></ul> |
| V1.0.0 | 2025-07-28 | <ul><li>Initial release</li></ul> |




---
sidebar_label: Downlink Configuration Settings
---

# Downlink Configuration Settings

## Possible Configurations

When entering the downlink configurations (custom mode), you will see this window.
In here, you can adjust your downlink configurations according to your specifical
needs. In the following, every configurable setting will be explained.

<img src="/img/downlink-configuration-settings/Settings_5.webp" width="75%" height="auto"/>

<br></br>
<br></br>

<!-- 
```
Set Config
Moving Interval (s)*
120
```
```
Steady Interval (s)*
1800
```
```
Config Heartbeat (s)*
86400
```
```
Re-Join Interval (s)*
600
```
```
Accelerometer delay (ms)*
1500
```
```
Accelerometer threshold (mg)*
300
```
```
Accuracy enhancement (s)*
5
```
```
GNSS timeout (s)*
120
```
```
Lower light threshold (lux)
0
```
```
Upper light threshold (lux)
0
```
```
Undo Save
```
```
Battery keep-alive Interval (s)*
600
```



# downlink configuration

## possible configurations

when entering the downlink configurations, you will see this window.
In here, you can adjust your downlink configurations according to your specifical
needs. In the following pages, every configurable setting will be explained.

_hey@truvami.com | [http://www.truvami.com](http://www.truvami.com)_

-->

## Moving interval (s)*

**Factory setting** : 120 seconds / 2 minutes <br></br>
**Recommended value** : above 120 seconds (duty cycle limitation) <br></br>
Timer to acquire location more frequently depending on movement.
If there is constant movement, the interval is the moving interval.

```
Moving Interval (s)*
120
```

## Steady interval (s)*

**Factory setting:** 1800 seconds / 30 minutes <br></br>
**Recommended value:** below 86’400 seconds (1 day) <br></br>
Periodic timer to trigger location acquisition, either if there is movement or there
isn’t any.

```
Steady Interval (s)*
1800
```

<img src="/img/downlink-configuration-settings/moving_steady_intervals_new.webp" width="75%" height="auto"/>


## Config. Hearbeat (s)*

**Factory setting:** 86400 seconds / 1 day <br></br>
**Recommended value:** 86’400 seconds (1 day) <br></br>
Periodic timer to send the current setting applied to the tracker.

```
Config Heartbeat (s)*
86400
```

## Battery keep-alive interval (s)*

**Factory setting:** 600 seconds / 5 minutes <br></br>
**Recommended value:** above 120 seconds (duty
cycle limitation) - if localization interval is high,
battery keep-alive interval should be low. <br></br>

Periodic timer to report battery level.

```
Battery keep-alive Interval (s)*
600
```
## Re-join interval (s)* – only for truvami® nomad XS

**Factory setting:** 600 seconds / 5 minutes <br></br>
**Recommended value:** 600 seconds <br></br>
When the device runs out of battery and resets, it will try to re-join based on this
periodic interval until it gets a join acknowledgement.

```
Re-Join Interval (s)*
600
```


## Accelerometer delay (ms)*

**Factory setting:** 1500 ms <br></br>
**Recommended value:** 100 ms – 5’000 ms (depends on use-case and
accelerometer threshold) <br></br>
To determine if the device is moving the device has to move in at the point of
trigger and after the accelerometer delay as well, it only qualifies to movement
after that.

```
Accelerometer delay (ms)*
1500
```

<img src="/img/downlink-configuration-settings/Settings_3.webp" width="50%" height="auto"/>


## Accelerometer threshold (mg)*

**Factory setting:** 300 mg <br></br>
**Recommended value:** 100 mg – 1’000 mg – e.g., 100 mg with 500 ms of
accelerometer interval for vehicle tracking. <br></br>
When the device runs out of battery and resets, it will try to re-join based on this
periodic interval until it gets a join acknowledgement.

```
Accelerometer threshold (mg)*
300
```

## Accuracy enhancement (s)*

**Factory setting:** 20 seconds, 5 seconds for nomad XS <br></br>
**Recommended value:** 20 + seconds (for accurate positioning) <br></br>
Increasing this value results in more accurate positioning.

```
Accuracy enhancement (s)*
5
```

## GNSS timeout (s)*

**Factory setting:** 120 seconds – 2 minutes <br></br>
**Recommended value:** above 120 seconds (depending on environmental factors
like weather and building density) <br></br>
Timeout for the GNSS module to acquire a fix. After timeout is elapsed without a
position, the GNSS module is deactivated until the next location acquisition event.

```
GNSS timeout (s)*
120
```


## Lower and upper light threshold – only for truvami® nomad XS

**Factory setting:** 0 - 0 lux <br></br>
If we set a threshold the device will go into low-power mode if the light conditions
reach the lower light threshold and exit the the low-power mode if the light con-
ditions reach the upper light threshold. In case both values are set to 0 the device
will not enter the low-power mode.

```
Lower light threshold (lux)
0
```
```
Upper light threshold (lux)
0
```







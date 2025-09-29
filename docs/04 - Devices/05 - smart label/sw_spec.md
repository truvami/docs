---
sidebar_label: Functional Description 
---

# Functional Description 

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
<img src="/img/smart_label/fsm.svg" width="100%" height="auto"/>





## Class Diagram
<img src="/img/smart_label/class.svg" width="60%" height="auto"/>




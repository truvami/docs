---
sidebar_label: Smart Label
---

#  Frequently Asked Questions about the Truvami Smart Label

---


## 1. General

### What is the Truvami Smart Label?
The Smart Label is a lightweight, photovoltaic tracker that helps you locate items using WiFi, GNSS, and LoRaWAN technology.  

### How does the Smart Label acquire location? 
-  **WiFi Sniffing:** Uses nearby WiFi networks for efficient localization.  
-  **Assisted GNSS Scan:** Activated if fewer than 3 WiFi networks are detected.  
-  **LoRaWAN Localization (optional):** Available with certain subscriptions, useful when WiFi or GNSS are unavailable.  

---

##  2. Power & Charging

### How is the Smart Label powered? 
It charges using **ambient indoor light** through built-in photovoltaic cells.  

###  How long does charging take? 
⚡ A full charge under optimal conditions (around 1000 lux) can take up to **2 days**.  

###  Can I charge it in direct sunlight? 
☀ No. Direct, high-intensity sunlight may damage the organic photovoltaic cells.  

### How does the Smart Label behave with different energy levels?
- above 40% Normal operations  
- 20–40% Limited operations  
- below 20% Low-power operations  

---

## 3.  Modes & Configuration

###  What operation modes are available?
-  **Balanced Mode:** Updates every 12h (steady) / 1h (moving)  
-  **Power Saving Mode:** Updates every 24h (steady) / 1h (moving)  
-  **High Performance Mode:** Updates every 6h (steady) / 20 min (moving)  

###  Which mode should I choose?
💡 Select based on your use case. If the battery drains too quickly, reduce the frequency of updates.  

---

## 4. Installation & Handling

###  How do I install the Smart Label?  
1.  Clean the surface (dust, oil, grease) with a suitable cleaner.  
2.  Ensure it’s dry.  
3.  Remove protective film, place the label, and press firmly.  

⚠️ **Important:**  
- Only install at room temperature (~20°C).  
- Use a spacer when applying to metal surfaces.  

### Are there handling precautions?
Yes. 🚫 Avoid bending, sharp impacts, immersion in water, and removing the Velcro before installation.  

---

## 5.  Activation & Connectivity

### How do I activate the device?
- 🔘 Short press the power button.  
- 🟢 LED blinks **5x green** → starting.  
- 🟢 LED blinks **3x green** → successfully joined network.  
- 🔴 LED blinks **red** → connection failed (device retries automatically).  

###  I pressed the button but I don’t see any LED light. What does it mean?
This can mean two things:  
1. The device is already activated.  
2. The device needs to harvest more energy.  

👉 Please check the **Truvami Dashboard** for messages.  
☀️ If nothing appears, place the label under good indoor lighting for up to **two days** to recharge.  

###  How do I check LoRaWAN connection?
-  Confirm your LoRaWAN Network Server (e.g., Swisscom, TTI) is configured.  
-  Check for messages in the **Truvami Dashboard**.  
-  If no signal, test with a LoRaWAN coverage tester and add a gateway if needed.  

---

## 6. Dashboard & Data

### What can I see in the Dashboard?
- **Overview Page:** Map with all active trackers.  
- **Tracker Table:** Last activity & search by ID/name.  
- **Device Details:** Recorded positions, events, and data over selected timeframes.  

###  The battery value doesn’t go beyond 60% despite being in optimal charging conditions. Why is that? 
The Smart Label’s maximum charge value is **3.6V**. The displayed percentage will be corrected with the **next release of the Truvami dashboard**.  

---

## 7. Support & Resources

###  Where can I find more information? 
- [Truvami Documentation](https://docs.truvami.com/docs/welcome)  
- [Truvami Factsheet](https://truvami.com/wp-content/uploads/2024/09/truvami-smart-label-factsheet.pdf)  
- [Getting Started Guide](https://docs.truvami.com/docs/Getting-started/smart%20label/)  

### Who do I contact for help? 
💬 Please open a support ticket at [truvami.com/service-request](https://truvami.com/service-request).  

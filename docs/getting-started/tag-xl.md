 # tag XL


This document details the step-by-step instructions about how to set up the truvami tag XL and configure it in AWS IoT Core Device Location.

## truvami® tag XL

```
Versions: 1.0.0
Date: 2023-10-31
```


## Pre-requisites:

The requirements to move forward with the setup process are detailed below,
you will need:


1. truvami tag XL

2. LoRaWAN gateway: A gateway that can run LoRa Basic Station. We suggest using an AWS-qualified gateway listed in Find IoT hardware that works with AWS | Search by industry, application, features, and more (amazonaws.com).

3.  Access to an AWS account with a region that supports AWS IoT Core for LoRaWAN (screenshots included in this document relate to the eu-west-1 region). While not strictly required, to simplify creating and onfiguring the required AWS resources, it is recommended to use a user (IAM user or federated identity) with administrative privileges on the AWS account.


## 1 Onboard your gateway to AWS IoT Core for LoRaWAN:
Once you have a qualified gateway, you need to onboard it to AWS IoT Core for
LoRaWAN. Follow the online instructions to do this.


## 2 Set up your tracker:

This section describes all the steps required to get your tracker configured and to properly connect and operate with AWS IoT Core for LoRaWAN and AWS IoT Core Device Location


#### 1. Unbox your tracker and assembly your tracker. It includes the following parts:


*   Enclosure top/bottom
*   Screws
*   Sealing
*   Batteries

Insert the seal into the bottom of the enclosure and ensure that everything is closed. Place the device inside and insert the batteries. Close the entire housing.

[Bild 1](/Bilder_GSG_XL/AWS_TagXL_Box_shopped_V2.png)


#### 2. Scan device keys
Retrieve and copy the LoRaWAN® device EUI, LoRaWAN Join EUI and AppKey code attributes from your tracker by scanning the QR code on the bottom of your truvami Tag XL.

[Bild 2](/Bilder_GSG_XL/tagXL_rückseite.png)

The QR code contains the following information:

[Bild 3](/Bilder_GSG_XL/Unbenannt3.jpg)


## 3 Claiming your tracker:

This section describes the steps required to claim your tracker on Semtech ́s Join Server and how to export the AppKey needed to onboard it on AWS IoT Core for LoRaWAN.

#### 1. Navigate to Semtech LoRa Cloud and sign up (or login if you already have an account)

[Bild 4](/Bilder_GSG_XL/Unbenannt4.png)

#### 2. On the upper menu, navigate to SERVICES -> Join Server

[Bild 5](/Bilder_GSG_XL/Unbenannt5.jpg)

#### 3. If it is your first time configuring a LoRa Edge device, on the left-side menu, navigate to APPLICATION OWNERS

[Bild 6](/Bilder_GSG_XL/Unbenannt6.jpg)

#### 4. Enter your name and click on CREATE NEW OWNER >>

[Bild 7](/Bilder_GSG_XL/Unbenannt7.jpg)

#### 5. On the left-side menu, navigate to DEVICES

[Bild 8](/Bilder_GSG_XL/Unbenannt8.jpg)

#### 6. Click on CLAIM INDIVIDUAL DEVICE >>

[Bild 9](/Bilder_GSG_XL/Unbenannt9.jpg)

#### 7. Enter the CHIP EUI and PIN for your tracker and click on CLAIM DEVICE >>

[Bild 10](/Bilder_GSG_XL/Unbenannt10.jpg)

#### 8. You should get a page confirming your device was successfully claimed, click on BACK TO DEVICES


#### 9. Select your just claimed device and click on EXPORT DEVICE KEYS

[Bild 11](/Bilder_GSG_XL/Unbenannt11.jpg)

#### 10. You should get a file downloaded, locate it in your Downloads folder, open it and copy your AppKey (you will need it to provision your device on the LNS later). Please keep in mind that the AppKey is sensitive information, so you want to keep it secure.



## 4 Provisioning your tracker:

This section shows the steps required to onboard your tracker on AWS IoT Core
for LoRaWAN including the creation of device and service profiles.



```
On the region selector, make sure to select the right region
[Ireland (eu-west-1) in our example]
```
#### 1. On the AWS Console, go to the Search box and enter IoT Core, then select it in the search results

[Bild 12](/Bilder_GSG_XL/Unbenannt12.jpg)

#### 2. On the region selector, make sure to select the right region [Ireland (eu-west-1) in our example]

[Bild 13](/Bilder_GSG_XL/Unbenannt13.jpg)

#### 3. Now, you are ready to create the profiles. On the left-side menu, select LPWAN devices and then Profiles

[Bild 14](/Bilder_GSG_XL/Unbenannt14.jpg)

#### 4. Click on Add device profile and then enter your device profile attributes and click on Add device profile

[Bild 15](/Bilder_GSG_XL/Unbenannt15.jpg)

#### 5. Next, click on Add service profile and then enter a friendly name for your profile and (optionally) check the Add gateway metadata setting. Finally, click on Add service profile

[Bild 16]

#### 6. Next, lets create a couple of Destinations for the tracker to route data to. On the left-side menu, select LPWAN devices and then Destinations

[Bild 17](/Bilder_GSG_XL/Unbenannt17.jpg)

#### 7. Click on Add destination and then enter a friendly name for your destination (demo_raw in the example). Make sure the Enter a rule name option is selected and enter a friendly name for your rule name (demo_raw in the example). Make sure the Create a new service role is selected. Finally, click on Add destination.

[Bild 18](/Bilder_GSG_XL/Unbenannt18.jpg)

#### 8. Now, let’s repeat previous step for the location destination. Click on Add destination and then enter a friendly name for your destination (demo_location in the example). Make sure the Enter a rule name option is selected and enter a friendly name for your rule name (demo_location in the example). Make sure the Create a new service role is selected. Finally, click on Add destination.

[Bild 19](/Bilder_GSG_XL/Unbenannt19.jpg)


#### 9. Finally, we are ready to provision our tracker device. Let’s start by selecting LPWAN devices and then Devices on the left-side menu


[Bild 20](/Bilder_GSG_XL/Unbenannt20.jpg)

#### 10. Click on Add wireless device and enter the required parameters for your tracker. Specifically, you need to ensure you are using the right DevEUI, the AppKey you exported from LoRa Cloud before and the profiles you created above. Finally, make sure to select the “raw” destination (demo_raw in our example) that was created above. Once you are done, click Next


[Bild 21](/Bilder_GSG_XL/Unbenannt21.jpg)


#### 11. On the next page, configure your device as “location-aware” by turning on the Activate positioning toggle and selecting the “location” destination (demo_location in our example) that was created above.Finally, click Add device

[Bild 22](/Bilder_GSG_XL/Unbenannt22.jpg)

#### 12. After few minutes, on the list of devices, click on your device ID.

[Bild 23](/Bilder_GSG_XL/Unbenannt23.jpg)

#### 13. You should be able to see that the device has properly joined and is sending data by inspecting the Last uplink received at field

[Bild 24](/Bilder_GSG_XL/Unbenannt24.jpg)

#### 14. To see the position of the tracker, select the Position tab

[Bild 25](/Bilder_GSG_XL/Unbenannt25.jpg)

#### 15. Assuming your tracker has managed to successfully scan (either GNSS or Wi-Fi), you should see its position.

[Bild 26](/Bilder_GSG_XL/Unbenannt26.jpg)


#### 16. Additionally, you can click on Activate Location Map to have that position rendered on a map

[Bild 27](/Bilder_GSG_XL/Unbenannt27.jpg)

You are now done with your tracker onboarding in AWS IoT Core Device Location. For any further questions, please contact us at hey@truvami.com.


## Troubleshooting

In the event that the device fails to join, consider the following list of workarounds:

#### 1. Reset the device using the magnet: Hold the magnet against the front side of the housing for at least 10 seconds. The device should restart, accompanied by the truvami startup melody. If the melody plays but the device remains unjoined, repeat the claim process outlined in the getting started guide. If the startup melody does not play, proceed to step 2.

#### 2. Replace the batteries. The truvami startup melody should commence after a few seconds. If the startup melody does not play, proceed to step number 3.

#### 3. Submit a ticket to the truvami team, and we will provide support as promptly as possible. In order to do so, write an email to our technical support team: hey@truvami.com


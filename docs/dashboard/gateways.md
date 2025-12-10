---
sidebar_label: Gateways
sidebar_position: 7
---

# Gateways

The **Gateways** page displays all LoRaWAN gateways associated with the organization.  
Gateways act as the network entry point for uplink messages sent by devices, and this section enables  
users to view, create, and manage gateway records within the dashboard.

<br></br>

## Gateways Table Overview

The table lists all registered gateways and provides the following fields:

- **Name** – the assigned gateway name  
- **Position** – latitude and longitude coordinates  
- **Address** – the resolved human-readable address (if available)  
- **Created At** – the timestamp when the gateway was created  
- **Actions** – edit and delete options  

Pagination controls are displayed at the bottom when multiple gateways are present.

<br></br>

## Search Bar

The search bar allows users to filter gateways by name. Search results update immediately as text is entered.

<br></br>

## Column Visibility Options

Users can customize which columns appear in the table.  
Clicking the column visibility icon opens a menu with the following options:

- **Position**  
- **Address**  
- **Created At**  
- **Actions**

Columns can be shown or hidden according to user preference.

<br></br>

## Creating a Gateway

Clicking the **Create** button opens a modal for adding a new gateway.  
This dialog allows specifying the gateway’s identifying fields and geographic coordinates.

### Fields in the Create Gateway Popup

#### **Name**
A required text field used to assign a readable name to the gateway.

#### **Position**
A map widget allows users to visually select the gateway location.  
Users can reposition the marker or click **Reset Position** to restore the default center.

Manual field inputs are also available:

- **Latitude**  
- **Longitude**  
- **Altitude** (optional)  

These values define the exact location of the gateway on the map.

### Actions

- **Create** – saves the new gateway  
- **Cancel** – closes the dialog without changes

<br></br>

## Editing and Deleting Gateways

For each gateway, the **Actions** column contains:

- an **edit icon** for updating name or position  
- a **delete icon** for removing the gateway  


<br></br>

## Pagination

When multiple gateways exist, pagination controls allow users to navigate:

- **Previous**  
- **Next**

<br></br>

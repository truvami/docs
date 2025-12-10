---
sidebar_label: Geofences
sidebar_position: 11
---

# Geofences

Geofences (Beta) allow you to define virtual geographic areas that can be used to monitor device behavior, such as triggering alerts when a device enters or exits a specific zone.

The Geofences overview displays all existing geofences, each with a map preview and essential details such as name, shape type, and vertex count.

---

## Geofences Overview

The main Geofences page includes:

- A list of all created geofences  
- A map preview representing each geofence  
- Geofence type: **Polygon** or **Circle**  
- Number of vertices (for polygon shapes)  
- Last update timestamp  
- A **Create Geofence** button to add new areas  

---

# Create Geofence

Creating a geofence is done through a guided, three-step process.

---

## Step 1 — Details

In the first step, define the geofence’s descriptive information:

- **Name*** — Required identifier for the geofence  
- **Color** — The color used to display the area on the map  
- **Description (optional)** — Additional notes about the purpose or context of this area  

---

## Step 2 — Draw Geofence Area

In this step, define the geofence boundaries on the map.

### Shape Selection

Available shapes:

- **Polygon** — Custom boundaries defined by multiple points  
- **Circle** — A circular zone defined by a center and radius  

---

### Drawing a Circle

To create a circular geofence:

1. Click anywhere on the map to set the **circle center**.  
2. Adjust the **radius** using the slider above the map.  
3. The circle updates automatically as the radius changes.

---

### Drawing a Polygon

To create a polygon geofence:

1. Click on the map to add the first point.  
2. Continue clicking to add additional points.  
3. Add **at least three points** to form a polygon.  
4. Click the **first point** again to close the polygon.  
5. Click **Save** after completing the shape.

---

## Step 3 — Review & Save

In the final step, review the geofence before saving:

- **Geofence Name**  
- **Type** (Polygon or Circle)  
- **Color**  
- **Description**  
- **Vertices** (for polygon shapes)

Click **Save** to finalize and create the geofence.

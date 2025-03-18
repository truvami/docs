---
sidebar_label: JavaScript
---

# JavaScript

There is no fully featured JavaScript decoder available at the moment. However, you can use the Truvami/decoder web service to decode Truvami payloads using JavaScript. The Truvami/decoder web service is a Go-based service that can be run as a Docker container and provides an HTTP API for decoding Truvami payloads.

## Getting Started

Start by running the Truvami/decoder web service using Docker:

```bash
# This will pull the latest version of the Truvami/decoder image and run it on port 8080
docker run -p 8080:8080 --pull always ghcr.io/truvami/decoder decoder http --port 8080 --host 0.0.0.0
```

After the service is running, you can use the following example code to decode Truvami payloads using JavaScript:

```javascript
// Example decoder for Truvami tag S/L payloads using JavaScript
async function decodeTagSLV1(devEui, port, payload) {
  // Call the Truvami/decoder web service for decoding
  await fetch("http://127.0.0.1:8080/tagsl/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      port,
      payload,
      devEui,
    }),
  });
}
```

If you want to decode payloads for other device types, you can use the following endpoints:

- `/nomadxs/v1` for nomad XS payloads
- `/tagxl/v1` for tag XL payloads
- `/tagsl/v1` for tag S/L payloads
- `/smartlabel/v1` for Smart Label payloads (coming soon)

## Philosophy

At Truvami we want to deliver a well tested and reliable solution and we believe that the best way to achieve this is by using a test driven development approach. This means that we write tests before we write the actual code. This way we can ensure that the code we write is actually doing what it is supposed to do. This is also one of the reasons we choose Go as the language for our decoder. Go has a very good testing framework built in and it is very easy to write tests for your code. It is also very fast, efficient, easy to learn and enforces type safety.

import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js";

export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),

    // ✅ Bot detection — allow search engines *and* Vercel’s preview bot
    detectBot({
      mode: "LIVE",
       allow: [
    "CATEGORY:SEARCH_ENGINE",
    "VERCEL_MONITOR_PREVIEW",
    "CATEGORY:VERCEL",
    "IP:127.0.0.1",         // allow localhost (IPv4)
    "IP:::1",               // allow localhost (IPv6)
    "USER_AGENT:PostmanRuntime", // Postman
    "USER_AGENT:curl",           // curl
   
  ],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 20,
      capacity: 40,
    }),
  ],
});

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
        "CATEGORY:SEARCH_ENGINE", // Allow Google, Bing, etc.
        "CATEGORY:VERCEL", // Allow Vercel preview bots
        "CATEGORY:PROGRAMMATIC", // Allow axios, fetch, etc.
        "CATEGORY:TOOL", // Allow curl, Postman, etc.
        "IP:127.0.0.1", // localhost (IPv4)
        "IP:::1", // localhost (IPv6)
        "IP:10.0.2.2", // Android emulator -> host
        "CIDR:192.168.0.0/16", // Entire local network (your dev machine IP too)
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

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import https from "https";
import dns from "dns";

import { createToken } from "./livekitToken.js";

// Load env vars from backend/.env
dotenv.config();

// Prefer IPv4 first (helps on some Windows setups)
dns.setDefaultResultOrder("ipv4first");

// Reuse TLS connections
const httpsAgent = new https.Agent({ keepAlive: true });

const app = express();

// Middleware (MUST be before routes)
app.use(cors({ origin: true }));
app.use(express.json());

// Force demo port
const PORT = 5000;

// Helper: get Tavus key safely
function getTavusKey() {
  return (process.env.TAVUS_API_KEY || "").trim();
}

/* ============================
   Startup Debug
============================ */
console.log("✅ Server starting...");
console.log("ENV loaded? TAVUS_API_KEY exists:", !!process.env.TAVUS_API_KEY);
console.log("ENV loaded? LIVEKIT_API_KEY exists:", !!process.env.LIVEKIT_API_KEY);

/* ============================
   Health Check
============================ */
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* ============================
   Debug ENV (safe)
   Lets you confirm backend key matches the one that worked in PowerShell
============================ */
app.get("/debug-env", (req, res) => {
  const key = getTavusKey();
  res.json({
    tavus_key_len: key.length,
    tavus_key_start: key.slice(0, 6),
    tavus_key_end: key.slice(-6),
    has_persona_id: !!process.env.TAVUS_PERSONA_ID,
  });
});

/* ============================
   LiveKit Token Endpoint 
   Frontend calls: /token?roomName=demo-room
============================ */
app.get("/token", async (req, res) => {
  const roomName = req.query.roomName || "demo-room";
  const identity = `user-${Math.floor(Math.random() * 10000)}`;

  try {
    const token = await createToken(identity, roomName); // ✅ await
    console.log("TOKEN TYPE:", typeof token);
    console.log("TOKEN SAMPLE:", String(token).slice(0, 25));
    res.setHeader("Cache-Control", "no-store");
    res.json({ token });
  } catch (err) {
    console.error("Token error:", err);
    res.status(500).json({ error: err.message || "Failed to create token" });
  }
});
;



/* ============================
   Tavus Conversation Endpoint
   Frontend calls: POST /start-avatar with JSON body
   { "roomName": "demo-room", "text": "hello" }
============================ */
app.post("/start-avatar", async (req, res) => {
  const roomName = req.body?.roomName || "demo-room";
  const text = req.body?.text; // optional

  const TAVUS_KEY = getTavusKey();

  if (!TAVUS_KEY) {
    return res.status(500).json({ error: "TAVUS_API_KEY not set" });
  }

  if (!process.env.TAVUS_PERSONA_ID) {
    return res.status(500).json({ error: "TAVUS_PERSONA_ID not set" });
  }

  // Safe debug (no secrets)
  console.log("TAVUS_KEY_LEN:", TAVUS_KEY.length);
  console.log("TAVUS_KEY_START:", TAVUS_KEY.slice(0, 6));
  console.log("TAVUS_KEY_END:", TAVUS_KEY.slice(-6));
  console.log("REQ BODY:", req.body);

  try {
    // NOTE: We use tavusapi.com + x-api-key because your PowerShell test proved it works
    const response = await axios.post(
      "https://tavusapi.com/v2/conversations",
      {
        persona_id: process.env.TAVUS_PERSONA_ID,
        conversation_name: roomName,
      },
      {
        headers: {
          "x-api-key": TAVUS_KEY,
          "Content-Type": "application/json",
        },
        timeout: 120000,
        httpsAgent,
        proxy: false,
      }
    );

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const details = error.response?.data || error.message;

    console.error("Tavus error status:", status);
    console.error("Tavus error details:", details);

    res.status(status).json({
      error: "Failed to start Tavus conversation",
      status,
      details,
    });
  }
});

/* ============================
   Start Server
============================ */
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

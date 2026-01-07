import { AccessToken } from "livekit-server-sdk";

export function createToken(identity, roomName) {
  const apiKey = (process.env.LIVEKIT_API_KEY || "").trim();
  const apiSecret = (process.env.LIVEKIT_API_SECRET || "").trim();

  const at = new AccessToken(apiKey, apiSecret, { identity });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return at.toJwt(); // ✅ string
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Room,
  createLocalAudioTrack,
  createLocalVideoTrack,
  Track,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  LocalTrack,
} from "livekit-client";

type RemoteVideo = {
  participantIdentity: string;
  trackSid: string;
  track: RemoteTrack;
};

export default function HomePage() {
  const BACKEND_URL = (
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
  ).trim();

  const LIVEKIT_URL = (process.env.NEXT_PUBLIC_LIVEKIT_URL || "").trim();

  const [room, setRoom] = useState<Room | null>(null);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<string>("Idle");

  const [micEnabled, setMicEnabled] = useState(false);
  const [camEnabled, setCamEnabled] = useState(false);

  const [remoteVideos, setRemoteVideos] = useState<RemoteVideo[]>([]);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const audioContainerRef = useRef<HTMLDivElement | null>(null);

  const localAudioTrackRef = useRef<LocalTrack | null>(null);
  const localVideoTrackRef = useRef<LocalTrack | null>(null);

  const roomName = "demo-room";

  const identity = useMemo(
    () => `user-${Math.floor(Math.random() * 10000)}`,
    []
  );

  // ✅ getToken returns STRING (the JWT)
  async function getToken(rm: string): Promise<string> {
    const url = `${BACKEND_URL}/token?roomName=${encodeURIComponent(rm)}`;
    console.log("TOKEN URL =>", url);

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Token fetch failed (${res.status}): ${text}`);
    }

    const data = await res.json(); // { token: "..." }
    if (!data?.token || typeof data.token !== "string") {
      throw new Error(`Invalid token response: ${JSON.stringify(data)}`);
    }

    console.log("TOKEN TYPE:", typeof data.token);
    console.log("TOKEN FIRST 20:", data.token.slice(0, 20));

    return data.token;
  }

  async function connectLiveKit() {
    try {
      if (!LIVEKIT_URL) {
        throw new Error("NEXT_PUBLIC_LIVEKIT_URL is missing");
      }

      setStatus("Getting token...");
      const token = await getToken(roomName); // ✅ token is STRING

      setStatus("Connecting to LiveKit...");
      console.log("LIVEKIT_URL =>", LIVEKIT_URL);

      const r = new Room({
        autoSubscribe: true,
      });

      // ✅ Remote track subscribed
      r.on(
        "trackSubscribed",
        (
          track: RemoteTrack,
          publication: RemoteTrackPublication,
          participant: RemoteParticipant
        ) => {
          console.log("trackSubscribed:", track.kind, participant.identity);

          if (track.kind === Track.Kind.Audio) {
            const audioEl = track.attach() as HTMLAudioElement;
            audioEl.autoplay = true;
            audioEl.controls = false;
            audioEl.play().catch(() => {});
            audioContainerRef.current?.appendChild(audioEl);
          }

          if (track.kind === Track.Kind.Video) {
            setRemoteVideos((prev) => {
              const exists = prev.some((v) => v.trackSid === publication.trackSid);
              if (exists) return prev;
              return [
                ...prev,
                {
                  participantIdentity: participant.identity || "remote",
                  trackSid: publication.trackSid,
                  track,
                },
              ];
            });
          }
        }
      );

      // ✅ Cleanup when unsubscribed
      r.on(
        "trackUnsubscribed",
        (
          track: RemoteTrack,
          publication: RemoteTrackPublication,
          participant: RemoteParticipant
        ) => {
          console.log("trackUnsubscribed:", track.kind, participant.identity);

          if (track.kind === Track.Kind.Audio) {
            track.detach().forEach((el) => el.remove());
          }
          if (track.kind === Track.Kind.Video) {
            setRemoteVideos((prev) =>
              prev.filter((v) => v.trackSid !== publication.trackSid)
            );
            track.detach().forEach((el) => el.remove());
          }
        }
      );

      r.on("disconnected", () => {
        console.log("Room disconnected");
        setStatus("Disconnected");
        setConnected(false);
        setMicEnabled(false);
        setCamEnabled(false);
        setRemoteVideos([]);
        if (audioContainerRef.current) audioContainerRef.current.innerHTML = "";
      });

      await r.connect(LIVEKIT_URL, token);

      setRoom(r);
      setConnected(true);
      setStatus(`Connected as ${identity} in ${roomName}`);
    } catch (e: any) {
      console.error("CONNECT ERROR:", e);
      setStatus(`Connect failed: ${e?.message || String(e)}`);
      alert(`LiveKit connect failed: ${e?.message || e}`);
    }
  }

  async function disconnectLiveKit() {
    room?.disconnect();
    setRoom(null);
    setConnected(false);
    setMicEnabled(false);
    setCamEnabled(false);
    setRemoteVideos([]);
    if (audioContainerRef.current) audioContainerRef.current.innerHTML = "";
    setStatus("Disconnected");
  }

  async function enableMic() {
    if (!room) return;
    try {
      setStatus("Requesting microphone...");
      const mic = await createLocalAudioTrack();
      await room.localParticipant.publishTrack(mic);
      localAudioTrackRef.current = mic;
      setMicEnabled(true);
      setStatus("Mic published ✅");
    } catch (e: any) {
      console.error(e);
      setStatus(`Mic failed: ${e?.message || String(e)}`);
      alert("Microphone permission failed.");
    }
  }

  async function disableMic() {
    if (!room) return;

    const t = localAudioTrackRef.current;
    if (t) {
      await room.localParticipant.unpublishTrack(t);
      t.stop?.();
      t.detach?.();
      localAudioTrackRef.current = null;
    }
    setMicEnabled(false);
    setStatus("Mic stopped");
  }

  async function enableCam() {
    if (!room) return;
    try {
      setStatus("Requesting camera...");
      const cam = await createLocalVideoTrack();
      await room.localParticipant.publishTrack(cam);
      localVideoTrackRef.current = cam;

      // Local preview
      const previewHost = localVideoRef.current;
      if (previewHost) {
        const el = cam.attach() as HTMLVideoElement;
        el.autoplay = true;
        el.muted = true;
        el.playsInline = true;

        previewHost.replaceWith(el);
        localVideoRef.current = el;
      }

      setCamEnabled(true);
      setStatus("Camera published ✅");
    } catch (e: any) {
      console.error(e);
      setStatus(`Camera failed: ${e?.message || String(e)}`);
      alert("Camera permission failed.");
    }
  }

  async function disableCam() {
    if (!room) return;

    const t = localVideoTrackRef.current;
    if (t) {
      await room.localParticipant.unpublishTrack(t);
      t.stop?.();
      t.detach?.();
      localVideoTrackRef.current = null;
    }
    setCamEnabled(false);
    setStatus("Camera stopped");
  }

  useEffect(() => {
    return () => {
      room?.disconnect();
    };
  }, [room]);

  return (
    <main style={{ padding: 24, fontFamily: "Arial" }}>
      <h2>LiveKit Real-Time Demo (Mic + Camera)</h2>
      <p style={{ opacity: 0.8 }}>{status}</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
        {!connected ? (
          <button onClick={connectLiveKit} style={{ padding: 10 }}>
            Connect LiveKit
          </button>
        ) : (
          <button onClick={disconnectLiveKit} style={{ padding: 10 }}>
            Disconnect
          </button>
        )}

        <button
          onClick={micEnabled ? disableMic : enableMic}
          disabled={!connected}
          style={{ padding: 10 }}
        >
          {micEnabled ? "Stop Mic" : "Publish Mic"}
        </button>

        <button
          onClick={camEnabled ? disableCam : enableCam}
          disabled={!connected}
          style={{ padding: 10 }}
        >
          {camEnabled ? "Stop Camera" : "Publish Camera"}
        </button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Local Preview</h3>
      <video
        ref={localVideoRef}
        style={{
          width: 320,
          height: 240,
          background: "#111",
          borderRadius: 8,
        }}
        playsInline
        muted
        autoPlay
      />

      <h3 style={{ marginTop: 24 }}>Remote Participants</h3>
      {remoteVideos.length === 0 ? (
        <p style={{ opacity: 0.7 }}>
          No remote video yet. Open a second tab, connect, and publish camera.
        </p>
      ) : (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {remoteVideos.map((v) => (
            <RemoteVideoTile key={v.trackSid} video={v} />
          ))}
        </div>
      )}

      <div ref={audioContainerRef} />
    </main>
  );
}

function RemoteVideoTile({ video }: { video: RemoteVideo }) {
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = video.track.attach() as HTMLVideoElement;
    el.autoplay = true;
    el.playsInline = true;

    if (videoRef.current) {
      videoRef.current.innerHTML = "";
      videoRef.current.appendChild(el);
    }

    return () => {
      video.track.detach().forEach((e) => e.remove());
    };
  }, [video.track]);

  return (
    <div style={{ width: 320 }}>
      <div
        ref={videoRef}
        style={{
          width: 320,
          height: 240,
          background: "#111",
          borderRadius: 8,
          overflow: "hidden",
        }}
      />
      <div style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>
        {video.participantIdentity}
      </div>
    </div>
  );
}

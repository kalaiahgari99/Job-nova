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

export default function LiveKitPanel({ defaultRoom = "demo-room" }: { defaultRoom?: string }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
    const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

    const [room, setRoom] = useState<Room | null>(null);
    const [connected, setConnected] = useState(false);
    const [status, setStatus] = useState<string>("Idle");

    const [micEnabled, setMicEnabled] = useState(false);
    const [camEnabled, setCamEnabled] = useState(false);

    const [remoteVideos, setRemoteVideos] = useState<RemoteVideo[]>([]);
    const [roomName, setRoomName] = useState(defaultRoom);

    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const audioContainerRef = useRef<HTMLDivElement | null>(null);

    const localAudioTrackRef = useRef<LocalTrack | null>(null);
    const localVideoTrackRef = useRef<LocalTrack | null>(null);

    const identity = useMemo(() => `user-${Math.floor(Math.random() * 10000)}`, []);

    async function getToken(rn: string) {
        const res = await fetch(`${backendUrl}/token?roomName=${encodeURIComponent(rn)}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        return data.token as string;
    }

    async function connectLiveKit() {
        try {
            setStatus("Getting token...");
            const token = await getToken(roomName);

            setStatus("Connecting...");
            const r = new Room();

            r.on(
                "trackSubscribed",
                (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                    if (track.kind === Track.Kind.Audio) {
                        const audioEl = track.attach() as HTMLAudioElement;
                        audioEl.autoplay = true;
                        audioEl.controls = false;
                        audioEl.play().catch(() => { });
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

            r.on("trackUnsubscribed", (track: RemoteTrack, publication: RemoteTrackPublication) => {
                if (track.kind === Track.Kind.Audio) track.detach().forEach((el) => el.remove());
                if (track.kind === Track.Kind.Video) {
                    setRemoteVideos((prev) => prev.filter((v) => v.trackSid !== publication.trackSid));
                    track.detach().forEach((el) => el.remove());
                }
            });

            r.on("disconnected", () => {
                setConnected(false);
                setMicEnabled(false);
                setCamEnabled(false);
                setRemoteVideos([]);
                if (audioContainerRef.current) audioContainerRef.current.innerHTML = "";
                setStatus("Disconnected");
            });

            await r.connect(livekitUrl, token);

            setRoom(r);
            setConnected(true);
            setStatus(`Connected: ${roomName}`);
        } catch (e: any) {
            console.error(e);
            setStatus(`Connect failed: ${e?.message || e}`);
            alert("LiveKit connect failed. Check console.");
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
        const mic = await createLocalAudioTrack();
        await room.localParticipant.publishTrack(mic);
        localAudioTrackRef.current = mic;
        setMicEnabled(true);
        setStatus("Mic on ✅");
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
        setStatus("Mic off");
    }

    async function enableCam() {
        if (!room) return;
        const cam = await createLocalVideoTrack();
        await room.localParticipant.publishTrack(cam);
        localVideoTrackRef.current = cam;

        if (localVideoRef.current) {
            const el = cam.attach() as HTMLVideoElement;
            el.autoplay = true;
            el.muted = true;
            el.playsInline = true;
            localVideoRef.current.replaceWith(el);
            localVideoRef.current = el;
        }

        setCamEnabled(true);
        setStatus("Camera on ✅");
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
        setStatus("Camera off");
    }

    useEffect(() => {
        return () => {
            room?.disconnect();
        };
    }, [room]);

    function copyInviteLink() {
        const url = `${window.location.origin}/?room=${encodeURIComponent(roomName)}`;
        navigator.clipboard.writeText(url).then(() => setStatus("Invite link copied ✅"));
    }

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Room</div>
                    <input
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
                    />
                </div>
                <button onClick={copyInviteLink} style={{ padding: 10, borderRadius: 8 }}>
                    Copy Invite Link
                </button>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {!connected ? (
                    <button onClick={connectLiveKit} style={{ padding: 10, borderRadius: 8 }}>
                        Connect
                    </button>
                ) : (
                    <button onClick={disconnectLiveKit} style={{ padding: 10, borderRadius: 8 }}>
                        Leave
                    </button>
                )}

                <button
                    onClick={micEnabled ? disableMic : enableMic}
                    disabled={!connected}
                    style={{ padding: 10, borderRadius: 8 }}
                >
                    {micEnabled ? "Mute" : "Unmute"}
                </button>

                <button
                    onClick={camEnabled ? disableCam : enableCam}
                    disabled={!connected}
                    style={{ padding: 10, borderRadius: 8 }}
                >
                    {camEnabled ? "Stop Video" : "Start Video"}
                </button>

                <div style={{ padding: 10, opacity: 0.8 }}>{status}</div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* You */}
                <div>
                    <div className="mb-1 text-xs text-slate-500">You</div>
                    <video
                        ref={localVideoRef}
                        className="h-[220px] w-full rounded-xl bg-black"
                        playsInline
                        muted
                        autoPlay
                    />
                </div>

                {/* Remote */}
                <div>
                    <div className="mb-1 text-xs text-slate-500">Remote</div>

                    {remoteVideos.length === 0 ? (
                        <div className="flex h-[220px] items-center justify-center rounded-xl bg-black text-sm text-slate-400">
                            Waiting for participant…
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {remoteVideos.map((v) => (
                                <RemoteVideoTile key={v.trackSid} video={v} />
                            ))}
                        </div>
                    )}
                </div>
            </div>


            <div ref={audioContainerRef} />
        </div>
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
        <div>
            <div
                ref={videoRef}
                style={{ width: "100%", height: 260, background: "#111", borderRadius: 12, overflow: "hidden" }}
            />
            <div style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>{video.participantIdentity}</div>
        </div>
    );
}

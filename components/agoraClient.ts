import AgoraRTC from "agora-rtc-sdk-ng";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export async function createAgoraChannel(channelName, token, appId) {
    await client.join(appId, channelName, token, null);
    return client;
}
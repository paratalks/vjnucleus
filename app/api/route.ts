// app/apiRoute/agoraToken/route.js
import { RtcTokenBuilder } from 'agora-access-token';

export async function POST(req) {
    const { channelName } = await req.json();

    const appID = process.env.NEXT_PUBLIC_AGORA_APPID!;
    const appCertificate = process.env.NEXT_PUBLIC_AGORA_CERTIFICATE!;
    const expirationTimeInSeconds = 3600; // 1 hour
    const role = 1; // Admin role

    const token = RtcTokenBuilder.buildTokenWithUid(
        appID, appCertificate, channelName, 0, role, expirationTimeInSeconds
    );

    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

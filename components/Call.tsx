
"use client"

import AgoraRTC, {
    AgoraRTCProvider,
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";


import React from 'react'
import Videos from "@/components/Videos";

const Call = ({channelName , appId } : {channelName:string, appId:string}) => {
    const client = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));

    return (
        <AgoraRTCProvider client={client}>

            <Videos channelName={channelName} AppID={appId} />
            <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                <a className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40" href="/">End Call</a>
            </div>
        </AgoraRTCProvider>
    );
}
export default Call

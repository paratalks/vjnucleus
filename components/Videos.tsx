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

const Videos = ({channelName, AppID} : {channelName:string, AppID:string}) => {
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers  = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    useJoin({
        appid: AppID,
        channel: "1stEvent",
        token:  "007eJxTYJhz6HbKRNPKZ4mheXGae6+2mN4JWtFu+KUp//7SKaF7bOMUGJJNE9MsU43MjA1N0kySU0yS0oyMjSwMLCwMUy2SLUzNI3VE0xsCGRkW1zIxMjJAIIjPwWBYXOJalppXwsAAABqYILw=" ,
    });
    return (
        <div></div>
    )
}
export default Videos


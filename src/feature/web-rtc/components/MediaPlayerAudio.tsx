import { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
// @ts-ignore
import React, { useRef, useEffect } from "react";

export interface VideoPlayerProps {
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const MediaPlayerAudio = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.audioTrack) {
      props.audioTrack?.play();
    }
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  return (
    <div
      ref={container}
      className="video-player"
      style={{ width: "0px", height: "0px" }}
    ></div>
  );
};

export default MediaPlayerAudio;

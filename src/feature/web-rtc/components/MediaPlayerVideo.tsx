import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
// @ts-ignore
import React, { useRef, useEffect } from "react";

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
}

const MediaPlayerVideo = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  return (
    <div
      ref={container}
      className="video-player"
      style={{ width: "120px", height: "120px" }}
    ></div>
  );
};

export default MediaPlayerVideo;

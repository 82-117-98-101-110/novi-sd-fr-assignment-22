import React, { useEffect, useState } from "react";

import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "./hooks/useAgora";

import "./Call.css";
import styled, { css } from "styled-components";

import { ReactComponent as MicEnabled } from "../../assets/icons/microphone-2.svg";
import { ReactComponent as MicDisables } from "../../assets/icons/microphone-slash.svg";
import { ReactComponent as CameraEnabled } from "../../assets/icons/video.svg";
import { ReactComponent as CameraDisables } from "../../assets/icons/video-slash.svg";
import MediaPlayerVideo from "./components/MediaPlayerVideo";
import MediaPlayerAudio from "./components/MediaPlayerAudio";
import AvSettings from "../web-gl/ModalAvSettings";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function Call(prop: any) {
  const [appid, setAppid] = useState("e56c1f2539d34ad0b7055d025d50f900");
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    handleJoinState,
    joinState,
    audioEnabled,
    videoEnabled,
    handleAudioMute,
    handleVideoMute,
    getMics,
    getCameras,
    switchMicrophone,
    switchCamera,
    remoteUsers,
  } = useAgora(client);

  useEffect(() => {
    join(appid, prop.photonRoomId, prop.agoraToken, prop.sessionUserId);
    return function () {
      leave();
    };
  }, []);

  window.onunload = function () {
    leave();
  };
  const [cams, setCams] = useState<any[]>([]);
  const [mics, setMics] = useState<any[]>([]);

  async function handleGetMics() {
    setCams(await getCameras());
    setMics(await getMics());
  }

  function changeAudioInput(deviceId: string) {
    switchMicrophone(deviceId);
  }

  function changeCameraInput(deviceId: string) {
    switchCamera(deviceId);
  }

  return (
    <>
      <div className="call">
        <BottomBarContainer>
          <ButtonContainer>
            <div onClick={() => handleGetMics()}>
              <AvSettings
                cams={cams}
                mics={mics}
                changeAudioInput={changeAudioInput}
                changeCameraInput={changeCameraInput}
              />
            </div>
          </ButtonContainer>
          <ButtonContainer>
            <RoundButton
              id="mute"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!joinState}
              onClick={() => {
                handleAudioMute();
              }}
            >
              {audioEnabled === true && <MicEnabled></MicEnabled>}
              {audioEnabled === false && <MicDisables></MicDisables>}
            </RoundButton>
          </ButtonContainer>
          <ButtonContainer>
            <RoundButton
              id="disableCame"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!joinState}
              onClick={() => {
                handleVideoMute();
              }}
            >
              {videoEnabled === false && <CameraDisables></CameraDisables>}
              {videoEnabled === true && <CameraEnabled></CameraEnabled>}
            </RoundButton>
          </ButtonContainer>
        </BottomBarContainer>

        <VideoPlayer>
          <div className="player-container">
            <div className="local-player-wrapper">
              {videoEnabled === true && (
                <>
                  <SingleVideoPlayerContainer>
                    <MediaPlayerVideo
                      videoTrack={localVideoTrack}
                    ></MediaPlayerVideo>
                  </SingleVideoPlayerContainer>
                </>
              )}
            </div>
            {remoteUsers.map((user) => (
              <div className="remote-player-wrapper" key={user.uid}>
                {user.hasVideo == true && (
                  <SingleVideoPlayerContainer>
                    <MediaPlayerVideo
                      videoTrack={user.videoTrack}
                    ></MediaPlayerVideo>
                  </SingleVideoPlayerContainer>
                )}
                <MediaPlayerAudio
                  audioTrack={user.audioTrack}
                ></MediaPlayerAudio>
              </div>
            ))}
          </div>
        </VideoPlayer>
      </div>
    </>
  );
}

export default Call;

const BottomBarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  height: 100px;
  border-radius: 103.5px;
`;

const VideoPlayer = styled.div`
  display: flex;
  max-height: 60%;
  overflow: scroll;
  position: fixed;
  align-content: center;
`;

const ButtonContainer = styled.div``;


const RoundButton = styled.button`
  ${({ theme }) => css`
    width: 56px;
    height: 56px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;

    text-align: center;
    letter-spacing: -0.02em;

    pointer-events: all;

    font-family: ${theme.font.family};
    color: ${theme.colour.secondary.light};
    background: rgba(224, 229, 242, 0.72);
    border: 0px solid;
    box-shadow: 0 16px 32px 0 rgb(0 0 0 / 24%);

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 10px;
    border-radius: 70px;
    left: calc(50% - 84px / 2);
    top: calc(50% - 34px / 2 - 27px);
    transition: 0.5s all; // var(--emo-out);
    transform: scale(1);
    z-index: 1000;

    &:hover {
      background: rgba(244, 247, 254, 0.72);
      transform: scale(1.2);
      transition: 0.5s all; //var(--emo-out);
      box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
    }

    &:focus {
    }

    &:disabled {
      background: rgba(224, 229, 242, 0.5);
    }
  `}
`;

const SingleVideoPlayerContainer = styled.div`
  margin-bottom: 40px;
  margin-left: -20px;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0px 20px 28px rgba(0, 0, 0, 0.25);

  .video-player {
    width: 100%;
    height: auto;
  }
`;


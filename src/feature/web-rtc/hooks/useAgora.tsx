import { useState, useEffect } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from "agora-rtc-sdk-ng";
import { infoNotification } from "../../../components/notifications/Notifications";

export default function useAgora(client: IAgoraRTCClient | undefined): {
  localAudioTrack: ILocalAudioTrack | undefined;
  localVideoTrack: ILocalVideoTrack | undefined;
  joinState: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  leave: Function;
  join: Function;
  handleJoinState: Function;
  handleAudioMute: Function;
  handleVideoMute: Function;
  getMics: Function;
  getCameras: Function;
  switchMicrophone: Function;
  switchCamera: Function;
  remoteUsers: IAgoraRTCRemoteUser[];
} {
  const [localVideoTrack, setLocalVideoTrack] = useState<
    ILocalVideoTrack | undefined
  >(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined);
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const localTrackState = {
    videoTrackMuted: false,
    audioTrackMuted: false,
  };
  const [microphoneAudioTrack, setMicrophoneAudioTrack] = useState<
    IMicrophoneAudioTrack | undefined
  >(undefined);
  const [webCamVideoTrack, setWebCamVideoTrack] = useState<
    ICameraVideoTrack | undefined
  >(undefined);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [localAudioTrackCreated, setAudioTrackCreated] = useState(false);
  const [localVideoTrackCreated, setVideoTrackCreated] = useState(false);

  async function createLocalVideoTrack(
    videoConfig?: CameraVideoTrackInitConfig
  ): Promise<ICameraVideoTrack> {
    const cameraTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: "240p_3",
    });

    setLocalVideoTrack(cameraTrack);
    setWebCamVideoTrack(cameraTrack);
    const cameras = await AgoraRTC.getCameras();
    const mics = await AgoraRTC.getMicrophones();
    const devices = await AgoraRTC.getDevices();

    console.log(cameras);
    console.log(mics);
    console.log(devices);

    return cameraTrack;
  }

  async function getMics() {
    const mics = await AgoraRTC.getMicrophones();
    return mics;
  }

  async function getCameras() {
    const cameras = await AgoraRTC.getCameras();
    return cameras;
  }

  async function createLocalMicTrack(
    audioConfig?: MicrophoneAudioTrackInitConfig
  ): Promise<IMicrophoneAudioTrack> {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack({
      encoderConfig: "high_quality",
      AEC: true,
      AGC: true,
      ANS: true,
    });
    setMicrophoneAudioTrack(microphoneTrack);
    setLocalAudioTrack(microphoneTrack);
    return microphoneTrack;
  }

  async function join(
    appid: string,
    channel: string,
    token: string,
    uid: string | number | null
  ) {
    if (!client) return;
    await client.join(appid, channel, token, uid);
    (window as any).client = client;
    (window as any).videoTrack = undefined;
    setJoinState(true);
    localTrackState.audioTrackMuted = true;
    localTrackState.videoTrackMuted = true;
    setAudioEnabled(false);
    setVideoEnabled(false);
  }

  async function joinVideo() {
    if (!client) return;
    const cameraTrack = await createLocalVideoTrack();
    await client.publish(cameraTrack);
    localTrackState.videoTrackMuted = false;
    setVideoEnabled(true);
    setVideoTrackCreated(true);
  }

  async function joinAudio() {
    if (!client) return;
    const microphoneTrack = await createLocalMicTrack();
    await client.publish(microphoneTrack);
    localTrackState.audioTrackMuted = false;
    setAudioEnabled(true);
    setAudioTrackCreated(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    setJoinState(false);
    setAudioEnabled(false);
    setVideoEnabled(false);
    await client?.leave();
  }

  function handleJoinState(
    appid: string,
    channel: string,
    token: string,
    uid: string | number | null
  ) {
    if (!joinState) {
      join(appid, channel, token, uid);
    } else {
      leave();
    }
  }

  function handleAudioMute() {
    if (!localAudioTrackCreated) {
      joinAudio();
    }
    if (audioEnabled) {
      muteAudio();
    } else {
      unmuteAudio();
    }
  }

  function handleVideoMute() {
    if (!localVideoTrackCreated) {
      joinVideo();
    } else {
      if (videoEnabled) {
        muteVideo();
      } else {
        unmuteVideo();
      }
    }
  }

  async function switchCamera(deviceId: string) {
    console.log("useAgora", deviceId);
    if (!webCamVideoTrack) return;
    webCamVideoTrack
      .setDevice(deviceId)
      .then(() => {})
      .catch((e) => {
        console.log("set device error", e);
      });
  }

  async function switchMicrophone(deviceId: string) {
    console.log("useAgora", deviceId);
    if (!microphoneAudioTrack) return;
    microphoneAudioTrack
      .setDevice(deviceId)
      .then(() => {})
      .catch((e) => {
        console.log("set device error", e);
      });
  }

  async function muteAudio() {
    if (!localAudioTrack) return;
    await localAudioTrack.setEnabled(false);
    localTrackState.audioTrackMuted = true;
    setAudioEnabled(false);
    infoNotification("Microphone disabled");
  }

  async function unmuteAudio() {
    if (!localAudioTrack) return;
    await localAudioTrack.setEnabled(true);
    localTrackState.audioTrackMuted = false;
    setAudioEnabled(true);
    infoNotification("Microphone enabled");
  }

  async function muteVideo() {
    if (!localVideoTrack) return;
    infoNotification("Webcam disabled");
    await localVideoTrack.setEnabled(false);
    localTrackState.videoTrackMuted = true;
    setVideoEnabled(false);
  }

  async function unmuteVideo() {
    if (!localVideoTrack) return;
    infoNotification("Webcam enabled");
    await localVideoTrack.setEnabled(true);
    localTrackState.videoTrackMuted = false;
    setVideoEnabled(true);
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    audioEnabled: audioEnabled,
    videoEnabled: videoEnabled,
    leave,
    join,
    handleJoinState,
    handleAudioMute,
    handleVideoMute,
    getMics,
    getCameras,
    switchMicrophone,
    switchCamera,
    remoteUsers,
  };
}

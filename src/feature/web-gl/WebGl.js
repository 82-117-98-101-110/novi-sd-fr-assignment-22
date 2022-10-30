import Unity, { UnityContext } from "react-unity-webgl";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getUser } from "../../helpers/CookieHelper";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import LoaderCirclePrimary from "../../components/loader/LoaderCircleBig";
import Call from "../web-rtc/Call";
import { useNavigate } from "react-router-dom";
import { getSpaceProWithUuid } from "../../api/services/SpaceProServices";
import {
  errorNotification,
  successNotification,
} from "../../components/notifications/Notifications";

function WebGl({ spacePro, room, isDevmode }) {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_SYSTEMS_BASE_WEBGL_URL;
  const apiBaseUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL + "/";
  const photonMode = 0;
  const unityContext = new UnityContext({
    loaderUrl: baseUrl + "/Build/WebGL.loader.js",
    dataUrl: baseUrl + "/Build/WebGL.data",
    frameworkUrl: baseUrl + "/Build/WebGL.framework.js",
    codeUrl: baseUrl + "/Build/WebGL.wasm",

    streamingAssetsUrl: baseUrl + "/StreamingAssets",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const currentUser = getUser();

  //enables/disables components
  const [isUnityMounted, setIsUnityMounted] = useState(true);
  const [isVoiceMounted, setIsVoiceMounted] = useState(false);

  //used for validation / error handling / etc
  const [isLoaded, setIsLoaded] = useState(false);
  const [progression, setProgression] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState("Downloading assets...");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    unityContext.on("canvas", handleOnUnityCanvas); //default option unity WebGL:
    unityContext.on("progress", handleOnUnityProgress); //default option unity WebGL:
    unityContext.on("progression", handleOnUnityProgress); //receives from unity the progression of downloading and loading the environment and etcc
    unityContext.on("loaded", handleOnUnityLoaded); //default option unity WebGL: receives from unity when Unity is loaded
    unityContext.on("ServerPing", handleServerPing); //receives from unity when it received a ping and sends a ping back
    unityContext.on("OnSpaceLoaded", handleSpaceLoaded); //receives from unity when the space is loaded
    unityContext.on("OnEnterPortal", handleOnPortalEnter); //receives from unity when the player enters a portal
    unityContext.on("OnLoadingActionChanged", handleOnLoadingActionChanged); //Event when loading starts and text changes
    unityContext.on("OnLoadingFinished", handleOnLoadingFinished); //Loading screen can be turned off when this event triggers
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, []);

  function handleOnUnityCanvas(canvas) {
    canvas.setAttribute("role", "unityCanvas");
  }

  function handleOnUnityProgress(progression) {
    setProgression(progression);
  }

  async function handleOnUnityLoaded() {
    setLoadingInfo("Loading Space...");
    await delay(500); //TODO replace this ugly delay
    sendPing();
  }

  function handleOnLoadingActionChanged(action) {
    setLoadingInfo(action);
  }

  async function handleServerPing() {
    setLoadingInfo("Configuring your Space...");
    await sendApiUrl();
    await sendAppMode();
    await sendUser();
    await sendSpacePro();
    await sendRoom();
    await delay(500);
    setLoadingInfo("More additional configurations...");
  }

  async function handleSpaceLoaded(isSpaceLoaded) {}

  async function handleOnPortalEnter(destinationUuid) {
    await fetchAndLeave(destinationUuid);
  }

  async function handleOnLoadingFinished() {
    await delay(500);
    setIsLoaded(true);
    setIsVoiceMounted(true);
  }

  window.onunload = function () {
    unityContext.quitUnityInstance().then(() => {
      setIsVoiceMounted(false);
    });
  };


  function sendPing() {
    setLoadingInfo("Configuring connection...");
    const payload = "this is a ping";
    unityContext.send("ServerHandle", "UnityPing", JSON.stringify(payload));
  }

  function sendUser() {
    unityContext.send(
      "ServerHandle",
      "ServerLogin",
      JSON.stringify(currentUser)
    );
  }

  function sendSpacePro() {
    unityContext.send("ServerHandle", "SetSpace", JSON.stringify(spacePro));
  }

  function sendRoom() {
    unityContext.send("ServerHandle", "SetRoom", JSON.stringify(room));
  }

  function sendApiUrl() {
    unityContext.send("ServerHandle", "SetAPIUrl", apiBaseUrl);
  }

  function sendAppMode() {
    unityContext.send("ServerHandle", "SetAppMode", parseInt(photonMode));
  }


  const fetchAndLeave = useCallback(async (spaceProUuid) => {
    try {
      const response = await getSpaceProWithUuid(spaceProUuid);
      if (response.status === 200) {
        unityContext
          .quitUnityInstance()
          .then(() => {
            setIsVoiceMounted(false);
            setIsLoaded(false);
          })
          .then(() => {
            window.location.replace(`/spaces/${response.data.sessionSpaceId}`);
            successNotification(
              "connecting to space " + response.data.sessionSpaceId
            );
          });

        return response.data;
      } else {
        errorNotification("InputFieldError loading space");
        navigate("/spaces");
      }
    } catch (error) {
      errorNotification("InputFieldError loading space");
      navigate("/spaces");
    }
  }, []);

  function returnToSpaces() {
    unityContext
      .quitUnityInstance()
      .then(() => {
        setIsVoiceMounted(false);
      })

      .then(() => {
        window.open("/spaces", "_self");
      });
  }

  window.onunload = function () {
    unityContext.quitUnityInstance().then(() => {
      setIsVoiceMounted(false);
    });
  };

  return (
    <>
      <Room>
        <RoomContent>
          <ControlBar>
            <HeaderWrapper>
              <div onClick={returnToSpaces}>
                <ButtonSmallPrimary onClick={returnToSpaces}>
                  Go back
                </ButtonSmallPrimary>
              </div>
            </HeaderWrapper>
          </ControlBar>
          <BottomBar>
            <BottomBarContainer>
              {isVoiceMounted === true && (
                <Call
                  agoraToken={room.agoraToken}
                  photonRoomId={room.photonRoomId}
                  sessionUserId={room.sessionUserId}
                />
              )}
            </BottomBarContainer>
          </BottomBar>
        </RoomContent>
      </Room>
      <Fragment>
        {isUnityMounted === true && (
          <Fragment>
            <UnityContainer>
              {isLoaded === false && (
                <LoadingOverlay img={spacePro.environmentPro.imageUrl}>
                  <LoaderCirclePrimary />
                  <p
                    style={{
                      marginTop: "10px",
                      marginLeft: "10px",
                      color: "#8F9BBA",
                    }}
                  >
                    {" "}
                    {loadingInfo}
                  </p>
                  <ProgressBar>
                    <ProgressBarFill
                      style={{ width: progression * 100 + "%" }}
                    />
                  </ProgressBar>
                </LoadingOverlay>
              )}
              <Unity
                className="unity-canvas"
                unityContext={unityContext}
                style={{
                  visibility: isLoaded ? "visible" : "hidden",
                  width: "100vw",
                  height: "100vh",
                }}
              />
            </UnityContainer>
          </Fragment>
        )}
      </Fragment>
    </>
  );
}

export default WebGl;
const BottomBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 20px;
  bottom: 20px;
  width: 100vw;
  position: fixed;
`;

const BottomBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  height: 100px;
  border-radius: 103.5px;
`;

const LoadingOverlay = styled.div`
  background: linear-gradient(111.43deg, rgba(122, 118, 118, 0.3), rgba(0, 0, 0, 0.3)), url(${props => props.img});
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;


const ProgressBar = styled.div`
  position: relative;
  display: inline-block;
  width: 300px;
  height: 10px;
  background: linear-gradient(
    270deg,
    #e0e5f2 34.37%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 60px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 10px;
  background: linear-gradient(
    270deg,
    #4a4aff 5.56%,
    rgba(74, 74, 255, 0.5) 100%
  );
  transition: width 0.5s ease;
`;

const ControlBar = styled.div`
  display: grid;
  z-index: 2;
  pointer-events: none !important;
`;

const Room = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none !important;
`;

const RoomContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  flex-direction: column;
  align-items: center;
  pointer-events: none !important;
`;

const UnityContainer = styled.div`
  height: 100vh;
  width: 100vw;
  outline: none;
  cursor: none;
  overflow: hidden;
`;

const HeaderWrapper = styled.header`
  display: flex;
  padding: 25px 110px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    padding: 25px 10px;
    justify-content: center;
  }
`;

import React, { useCallback, useContext, useEffect } from "react";
import { AvatarIframe } from "../../components/iframe/AvatarIframeStyle";

import { updateAvatarFullBody } from "../../api/services/AccountServices";
import { AuthContext } from "../../context/AuthContext";
import { successNotification } from "../../components/notifications/Notifications";
import RefreshUserData from "../../context/RefreshUserData";
import { useNavigate } from "react-router-dom";

function CreateAvatarFullBody({ closeModal }) {
  const { user } = useContext(AuthContext);
  const onCLose = () => closeModal(false);

  const currentUrl = window.location.pathname;
  const navigate = useNavigate();

  const uploadAvatarUrl = useCallback(async (avatarUrl) => {
    try {
      if (user) {
        await updateAvatarFullBody(user.userUUID, avatarUrl);
      }
      if (currentUrl === "/welcome") {
        navigate("/profile");
      } else {
        onCLose();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);
    return () => {
      window.addEventListener("message", subscribe);
      document.addEventListener("message", subscribe);
    };
  }, [subscribe]);

  function subscribe(event) {
    if (event.origin === "https://ravel-fullbody.readyplayer.me") {
      uploadAvatarUrl(event.data);
      successNotification("Avatar updated successfully");
      RefreshUserData().finally(() => onCLose());
    }
  }

  return (
    <>
      <AvatarIframe
        id="frame"
        className="frame"
        allow="camera *; microphone *"
        src="https://ravel-fullbody.readyplayer.me/avatar"
      />
    </>
  );
}

export default CreateAvatarFullBody;

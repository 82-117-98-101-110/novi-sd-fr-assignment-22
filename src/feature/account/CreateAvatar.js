import React, { useCallback, useContext, useEffect } from "react";
import { AvatarIframe } from "../../components/iframe/AvatarIframeStyle";

import { updateAvatar } from "../../api/services/AccountServices";
import { AuthContext } from "../../context/AuthContext";
import { successNotification } from "../../components/notifications/Notifications";
import RefreshUserData from "../../context/RefreshUserData";

function CreateAvatarHalfBody({ closeModal }) {
  const { user } = useContext(AuthContext);
  const onCLose = () => closeModal(false);

  const uploadAvatarUrl = useCallback(async (avatarUrl) => {
    try {
      if (user) {
        await updateAvatar(user.userUUID, avatarUrl);
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
    if (event.origin === "https://ravel.readyplayer.me") {
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
        allow="camera *; microphone *: clipboard-read; clipboard-write"
        src="https://ravel.readyplayer.me/"
      />
    </>
  );
}

export default CreateAvatarHalfBody;

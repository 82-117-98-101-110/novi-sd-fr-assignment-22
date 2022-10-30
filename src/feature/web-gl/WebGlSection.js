import { useCallback, useContext, useEffect, useState } from "react";
import {
  getSessionDetails,
  getSpacePro,
} from "../../api/services/SpaceProServices";
import { errorNotification } from "../../components/notifications/Notifications";
import { useNavigate, useParams } from "react-router-dom";
import WebGl from "./WebGl";
import { AuthContext } from "../../context/AuthContext";
import { BrowserView, MobileView } from "react-device-detect";
import ModalMobileOnly from "./ModalMobileOnly";

function WebGlSection() {
  const { spaceId } = useParams();
  const [spacePro, setSpacePo] = useState({});
  const [room, setRoom] = useState({});
  const { user } = useContext(AuthContext);
  const [apiDone, setApiDon] = useState(false);
  const navigate = useNavigate();
  const [isDevmode, setIsDevMode] = useState(false);

  const fetchData = () =>
    fetchSpacePro()
      .then(() => fetchRoom())
      .finally(() => setApiDon(true));

  const fetchSpacePro = useCallback(async () => {
    try {
      const response = await getSpacePro(spaceId);
      if (response.data) {
        setSpacePo(response.data);
      } else {
        errorNotification("InputFieldError loading space");
        navigate("/spaces");
      }
    } catch (error) {
      errorNotification("InputFieldError loading space");
      navigate("/spaces");
    }
  }, []);

  const fetchRoom = useCallback(async () => {
    try {
      const response = await getSessionDetails(user.userUUID, spaceId);
      if (response.data) {
        setRoom(response.data);
      } else {
        errorNotification("InputFieldError loading space");
        navigate("/spaces");
      }
    } catch (error) {
      errorNotification("InputFieldError loading space");
      navigate("/spaces");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BrowserView>
        {apiDone === true && (
          <WebGl spacePro={spacePro} room={room} isDevmode={isDevmode} />
        )}
      </BrowserView>
      <MobileView>
        <ModalMobileOnly />
      </MobileView>
    </>
  );
}

export default WebGlSection;

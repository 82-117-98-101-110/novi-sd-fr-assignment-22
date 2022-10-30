import { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { getToken } from "../../helpers/CookieHelper";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";
import LoaderCirclePrimary from "../../components/loader/LoaderCircleBig";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../../components/notifications/Notifications";
import { AuthContext } from "../../context/AuthContext";
import RefreshUserData from "../../context/RefreshUserData";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

function DragAndDropProfileImage({ setProfileImageState }) {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [largeFiles, setLargeFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { setProfileImage } = prop;
  const onClick = () => {
    setError(false);
    setLargeFiles([]);
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setLargeFiles([]);
      acceptedFiles.forEach((userProfileImage) => {
        if (userProfileImage.size > 2000000) {
          setLargeFiles((largeFiles) => [...largeFiles, userProfileImage.name]);
          warningNotification(`${userProfileImage.name} is too large.`);
          setError("InputFieldError: file(s) must not be larger than 2MB");
        } else {
          setError(false);
          setLoading(true);
          const reader = new FileReader();
          reader.onabort = () =>
            setError("InputFieldError uploading file, please trying again.");
          reader.onerror = () =>
            setError("InputFieldError uploading file, please trying again.");
          reader.onload = async () => {
            let formData = new FormData();
            formData.append(
              "userProfileImage",
              userProfileImage,
              userProfileImage.name
            );
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + getToken());
            await fetch(
              apiUrl + "/api/v1/users/profileImages/" + user.userUUID,
              {
                method: "PUT",
                headers: myHeaders,
                body: formData,
                redirect: "follow",
              }
            )
              .then((data) => {
                setLoading(false);
                if (data.status === 200) {
                  successNotification("File(s) uploaded successfully");
                  RefreshUserData();
                  setProfileImageState(true);
                } else {
                  setProfileImageState(false);
                  errorNotification(
                    "InputFieldError uploading file, please trying again."
                  );
                  setError("InputFieldError uploading file, please try again.");
                }
                if (acceptedFiles.length > 1) {
                  errorNotification("You can only upload on file at a time.");
                  setError("You can only upload on file at a time.");
                }
              })
              .then((data) => {})

              .catch((_) => {
                setLoading(false);
                setProfileImageState(false);
                setError("InputFieldError uploading file, please try again.");
              });
          };
          reader.readAsArrayBuffer(userProfileImage);
        }
      });
    },
    [setProfileImageState]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div style={{ marginTop: "32px" }} onClick={onClick}>
      <DropSection className="container">
        <DropZone {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} accept=".jpeg, .png, .jpg" />
          {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

          {largeFiles && (
            <p style={{ color: "red" }}>{largeFiles.toString()}</p>
          )}

          {/*{success && <p style={{ color: '#01B574' }}>{success}</p>}*/}
          {loading && <LoaderCirclePrimary />}
          {!loading && (
            <div>
              <p> Drag & drop some files here </p>
              <br />
              <p> or </p>
              <br />
              <ButtonSmallSubtle> BROWSE </ButtonSmallSubtle>
            </div>
          )}
        </DropZone>
      </DropSection>
    </div>
  );
}
export default DragAndDropProfileImage;

const DropSection = styled.div`
  display: table-cell;
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  margin: auto;
  width: 820px;
  height: 200px;
  left: 528px;
  top: 225px;
  background: #fafcfe;
  border: 1px solid #8f9bba;
  border-radius: 20px;

  .dragDrop {
    color: #4a4a68;
    font-family: "DM Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 8px;
    letter-spacing: 0.0617116px;
    margin-top: 24px;
  }

  .subText {
    font-family: "DM Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.03em;
    color: #676767ff;
  }

  .or {
    font-family: "DM Sans";
    font-style: normal;
    font-weight: 300;
    font-size: 25px;
    line-height: 8px;
    text-align: center;
    letter-spacing: 0.0617116px;
  }
`;
const DropZone = styled.div`
  display: inline-block;
  width: 100%;
`;

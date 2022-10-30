import React, {useCallback, useState} from 'react';
import Modal from "../../components/modal/Modal";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";
import {
  successNotification,
  warningNotification,
} from '../../components/notifications/Notifications';
import {getToken} from '../../helpers/CookieHelper';
import {useDropzone} from 'react-dropzone';
import LoaderCirclePrimary from '../../components/loader/LoaderCircleBig';
import styled from 'styled-components';


const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

function UploadFile({setFileState}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [largeFiles, setLargeFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setError(false);
    setLargeFiles([]);
  };

  const onDrop = useCallback(
      async (acceptedFiles) => {
        setLargeFiles([]);
        const file = acceptedFiles[0];
        acceptedFiles.forEach((file) => {
          if (file.size > 10000000) {
            setLargeFiles((largeFiles) => [...largeFiles, file.name]);
            warningNotification(`${file.name} is too large.`);
            setError("InputFieldError: file(s) must not be larger than 10MB");
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
              formData.append("file", file, file.name);
              var myHeaders = new Headers();
              myHeaders.append("accept", "application/json");
              myHeaders.append("Authorization", "Bearer " + getToken());
              await fetch(apiUrl + "/api/v1/userfiles", {
                method: "POST",
                headers: myHeaders,
                body: formData,
                redirect: "follow",
              })
              .then((data) => {
                setLoading(false);
                if (data.status === 200) {
                  setSuccess('Upload successful: ' + file.name);
                  successNotification("File(s) uploaded successfully");
                  setFileState(true);
                  // fetchData();
                } else {
                  setFileState(false);
                  setError("InputFieldError uploading file, please try again.");
                }
              })
              .catch((_) => {
                setLoading(false);
                setFileState(false);
                setError("InputFieldError uploading file, please try again.");
              });
            };
            reader.readAsArrayBuffer(file);
          }
        });
      },
      [setFileState]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  return (
      <div>
        <div onClick={() => setIsModalOpen(true)}>
          <ButtonSmallSubtle>Upload file</ButtonSmallSubtle>
        </div>
        {isModalOpen && (
            <Modal
                id="modal"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
              <div className="box-header">
                <ModalTitle>Upload a file</ModalTitle>
                <ModalText>
                  Select drop or select a file to upload, file size cannot exceed
                  100 MB
                </ModalText>
              </div>
              <div className="box-body">
                {" "}
                <div style={{ marginTop: "32px" }} onClick={onClick}>
                  <DropSection className="container">
                    <DropZone {...getRootProps({ className: "dropzone" })}>
                      <input
                          {...getInputProps()}
                          accept=".glb, .jpeg, .png, .pdf, .mov, .mp4, .glTF"
                      />
                      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

                      {largeFiles && (
                          <p style={{ color: "red" }}>{largeFiles.toString()}</p>
                      )}
                      {success && <p style={{color: '#01B574'}}>{success}</p>}

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
              </div>
              <div className="box-footer">
                <div onClick={() => setIsModalOpen(false)} className="close">
                  <ButtonSmallPrimary>Done</ButtonSmallPrimary>
                </div>
              </div>
            </Modal>
        )}
      </div>
  );
}

export default UploadFile;


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

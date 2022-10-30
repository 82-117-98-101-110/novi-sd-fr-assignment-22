import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { ReactComponent as Settings } from "../../assets/icons/setting-4.svg";
import styled, { css } from "styled-components";

function AvSettings({ mics, cams, changeAudioInput, changeCameraInput }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOnChangeMic(e) {
    changeAudioInput(e);
  }

  function handleOnChangeCam(e) {
    changeCameraInput(e);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <span style={{ display: "flex" }} onClick={() => setIsModalOpen(true)}>
        <RoundButton id="mute" type="button" className="btn btn-primary btn-sm">
          <Settings></Settings>
        </RoundButton>
      </span>
      {isModalOpen && (
        <Modal
          id="modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalClass={"modal-av-settings"}
          modalSize={"md"}
        >
          <div className="box-header">
            <ModalTitle>Settings</ModalTitle>
            <ModalText>Change your AV settings here.</ModalText>
          </div>
          <div className="box-body">
            <InputFieldWrapper>
              <InputFieldTitle>Camera</InputFieldTitle>
              <select
                value={cams || []}
                onChange={(e) => handleOnChangeCam(e.target.value)}
              >
                {cams.map((link, index) => (
                  <option key={link.deviceId} value={link.deviceId || ""}>
                    {link.label}
                  </option>
                ))}{" "}
              </select>
            </InputFieldWrapper>

            <InputFieldWrapper>
              <InputFieldTitle>Microphone</InputFieldTitle>
              <select
                value={mics}
                onChange={(e) => handleOnChangeMic(e.target.value)}
              >
                {mics.map((link, index) => (
                  <option key={link.deviceId} value={link.deviceId}>
                    {link.label}
                  </option>
                ))}{" "}
              </select>
            </InputFieldWrapper>
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

export default AvSettings;

const RoundButton = styled.button`
  ${({ theme }) => css`
    width: 56px;
    height: 56px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */
    margin: 10px;
    text-align: center;
    letter-spacing: -0.02em;

    pointer-events: all;

    font-family: ${theme.font.family};
    color: ${theme.colour.secondary.light};
    background: rgba(224, 229, 242, 0.72);
    border: 0px solid ${theme.colour.primaryDark};
    box-shadow: 0 16px 32px 0 rgb(0 0 0 / 24%);

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px;
    border-radius: 70px;
    left: calc(50% - 84px / 2);
    top: calc(50% - 34px / 2 - 27px);
    transition: 0.5s all;
    transform: scale(1);
    z-index: 1000;

    &:hover {
      background: rgba(244, 247, 254, 0.72);
      transform: scale(1.2);
      transition: 0.5s all;
      box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
    }

    &:focus {
    }

    &:disabled {
      background: rgba(224, 229, 242, 0.5);
    }
  `}
`;

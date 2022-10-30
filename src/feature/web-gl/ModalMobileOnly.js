import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import { useNavigate } from "react-router-dom";

function ModalWebGLMobileOnly() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  function closeModal() {
    setIsModalOpen(false);
    navigate("/spaces");
  }

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)}></div>
      {isModalOpen && (
        <Modal
          id="modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalTitle>Oh no...</ModalTitle>
          <ModalText>Currently we don't support Ravel on mobile</ModalText>
          <div className="box-footer">
            <div onClick={() => closeModal()} className="close">
              <ButtonSmallPrimary>Go back</ButtonSmallPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ModalWebGLMobileOnly;

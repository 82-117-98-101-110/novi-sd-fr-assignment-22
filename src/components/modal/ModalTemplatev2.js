import React, { useState } from "react";
import Modal from "./Modal";
import ButtonSmallPrimary from "../button/ButtonSmallPrimary";
import { ModalTitle } from "./ModalTitle";
import { ModalText } from "./ModalText";
import ButtonSmallSubtle from "../button/ButtonSmallSubtle";

function ModalTemplateV2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)}>
        <ButtonSmallSubtle>New Modal</ButtonSmallSubtle>
      </div>
      {isModalOpen && (
        <Modal
          id="modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalTitle>Title</ModalTitle>
          <ModalText>Text</ModalText>
          <div className="box-footer">
            <div onClick={() => setIsModalOpen(false)} className="close">
              <ButtonSmallPrimary>Cancel</ButtonSmallPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ModalTemplateV2;

import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import ButtonSmallSecondary from "../../components/button/ButtonSmallSecondary";
import FormChangeOrganizationRole from "./FormChangeOrganizationRole";

function RemoveUserFromOrganization({ userUuid, organizationName, refresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    refresh();
    setIsModalOpen(false);
  }

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)}>
        <ButtonSmallText>Change role</ButtonSmallText>
      </div>
      {isModalOpen && (
        <Modal
          id="modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalTitle>Change role</ModalTitle>
          <ModalText>Select the role for the user</ModalText>
          <FormChangeOrganizationRole
            userUuid={userUuid}
            organizationName={organizationName}
            closeModal={closeModal}
          />
          <div className="box-footer">
            <div onClick={() => setIsModalOpen(false)} className="close">
              <ButtonSmallSecondary>Cancel</ButtonSmallSecondary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RemoveUserFromOrganization;

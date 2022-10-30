import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import { warningNotification } from "../../components/notifications/Notifications";
import ButtonSmallSecondary from "../../components/button/ButtonSmallSecondary";

//TODO - remove user from organization
function RemoveUserFromOrganization({ userUuid, organizationName, refresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeUser = async () => {
    try {
      warningNotification("Not implemented yet");
    } catch (error) {}
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <div onClick={() => setIsModalOpen(true)}>
        <ButtonSmallText>Remove user</ButtonSmallText>
      </div>
      {isModalOpen && (
        <Modal
          id="modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalTitle>Remove user</ModalTitle>
          <ModalText>
            Are you sure to remove user from the organization?
          </ModalText>
          <div className="box-footer">
            <div onClick={() => setIsModalOpen(false)} className="close">
              <ButtonSmallSecondary>Cancel</ButtonSmallSecondary>
            </div>
            <div onClick={() => removeUser()} className="close">
              <ButtonSmallPrimary>Remove user</ButtonSmallPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default RemoveUserFromOrganization;

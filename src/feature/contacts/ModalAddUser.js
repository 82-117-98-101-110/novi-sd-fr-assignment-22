import React, { Component } from "react";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";
import ButtonSmallSecondary from "../../components/button/ButtonSmallSecondary";
import FormAddUserToOrg from "./FormAddUserToOrg";

class AddUser extends Component {
  state = {
    isModalOpen: false,
  };

  toggleState = (e) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <div>
        <div onClick={this.toggleState}>
          <ButtonSmallSubtle>Invite user</ButtonSmallSubtle>
        </div>
        {this.state.isModalOpen && (
          <Modal
            id="modal"
            isOpen={this.state.isModalOpen}
            onClose={this.toggleState}
          >
            <ModalTitle>Invite user</ModalTitle>
            <ModalText>
              Provide the email address and select a role for the person you
              want to invite to your organization
            </ModalText>
            <div className="box-body">
              <FormAddUserToOrg organizationName={this.props.selectedOption} />
            </div>

            <div className="box-footer">
              <div onClick={this.toggleState} className="close">
                <ButtonSmallSecondary>Cancel</ButtonSmallSecondary>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default AddUser;

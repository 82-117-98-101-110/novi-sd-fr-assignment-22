import React, { Component } from "react";
import Modal from "../../components/modal/Modal";
import { AuthContextProvider } from "../../context/AuthContext";
import LogOut2 from "../../context/LogOut";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import ButtonSmallSecondary from "../../components/button/ButtonSmallSecondary";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ButtonSmallText from "../../components/button/ButtonSmallText";

class LogOut extends Component {
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
        <span style={{ display: "flex" }} onClick={this.toggleState}>
          <ButtonSmallText> Log out</ButtonSmallText>
        </span>
        {this.state.isModalOpen && (
          <Modal
            id="modal"
            isOpen={this.state.isModalOpen}
            onClose={this.toggleState}
          >
            <div className="box-header">
              <ModalTitle>Log out</ModalTitle>
              <ModalText>Are you sure to log out?</ModalText>
            </div>
            <div className="box-footer">
              <div onClick={this.toggleState} className="close">
                <ButtonSmallSecondary>Cancel</ButtonSmallSecondary>
              </div>
              <LogOut2>
                <ButtonSmallPrimary>Yes</ButtonSmallPrimary>
              </LogOut2>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default LogOut;

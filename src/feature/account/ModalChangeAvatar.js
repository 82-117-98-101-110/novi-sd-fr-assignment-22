import React, { Component } from "react";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ModalAvatar from "../../components/modal/ModalAvatar";
import CreateAvatar from "./CreateAvatar";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";

class ModalChangeAvatar extends Component {
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
          <ButtonSmallSubtle>Change avatar</ButtonSmallSubtle>
        </div>
        {this.state.isModalOpen && (
          <ModalAvatar
            id="modal"
            isOpen={this.state.isModalOpen}
            onClose={this.toggleState}
            modalSize={"lg"}
          >
            <ModalTitle>Configure your avatar</ModalTitle>
            <ModalText>
              Change the looks of your avatar by following the instructions in
              the screen below
            </ModalText>
            <div className="box-body">
              <CreateAvatar closeModal={this.toggleState} />
            </div>
          </ModalAvatar>
        )}
      </div>
    );
  }
}

export default ModalChangeAvatar;

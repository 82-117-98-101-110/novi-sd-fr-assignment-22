import React, { Component } from "react";
import Modal from "../../components/modal/Modal";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import FormPairDevice from "./FormPairDevice";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import ButtonSmallText from "../../components/button/ButtonSmallText";

class PairDevice extends Component {
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
          <ButtonSmallText> Pair VR device </ButtonSmallText>
        </span>
        {this.state.isModalOpen && (
          <Modal
            id="modal"
            isOpen={this.state.isModalOpen}
            onClose={this.toggleState}
          >
            <div className="box-header">
              <ModalTitle>Pair VR device</ModalTitle>
              <ModalText>Enter the code displayed on your VR device </ModalText>
            </div>
            <div className="box-body">
              <FormPairDevice />
            </div>
            <div className="box-footer">
              <div onClick={this.toggleState} className="close">
                <ButtonSmallPrimary>Done</ButtonSmallPrimary>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default PairDevice;

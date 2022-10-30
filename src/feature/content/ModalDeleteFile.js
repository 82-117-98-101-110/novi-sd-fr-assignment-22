import React from "react";
import Modal from "../../components/modal/Modal";
import ButtonTrash from "../../components/button/ButtonTrash";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import styled, { css } from "styled-components";
import { ButtonSubtle } from "../../assets/styles/ButtonSubtle";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";

class DeleteFile extends React.Component {
  state = {
    isModalOpen: false,
  };

  toggleState = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <>
        <ButtonWrapper onClick={this.toggleState}>
          <Trash />
        </ButtonWrapper>
        {this.state.isModalOpen && (
          <Modal
            id="modal"
            isOpen={this.state.isModalOpen}
            onClose={this.toggleState}
          >
            <div className="box-header">
              <ModalTitle>Delete file</ModalTitle>
              <ModalText>Are you sure to delete the file?</ModalText>
            </div>
            {/*<div className="box-body"> CONTENT </div>*/}

            <div className="box-footer">
              <div onClick={this.toggleState} className="close">
                <ButtonTrash
                  id={this.props.id}
                  fetchData={this.props.fetchData}
                />
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default DeleteFile;

const ButtonWrapper = styled.button`
  ${ButtonSubtle}
  ${({ theme }) => css`
    width: 32px;
    height: 32px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.02em;
  `}
`;

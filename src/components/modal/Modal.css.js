import styled, { css } from "styled-components";

const Modal = styled.div`
  font-family: "DMSans";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity linear 0.15s;
  z-index: 2000;
  width: ${(props) => {
    switch (props.modalSize) {
      case "lg":
        return "800";
      default:
        return "320";
    }
  }}px;
  margin: 40px auto;

  &.fade-in {
    opacity: 1;
    transition: opacity linear 0.15s;
  }

  &.fade-out {
    opacity: 0;
    transition: opacity linear 0.15s;
  }

  .background {
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(1px);
    position: fixed;
    z-index: 1040;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: 0;
  }
  .close-button {
    z-index: 2000;
    display: flex;
    flex-direction: row-reverse;
  }

  .close-icon {
    width: 24px;
    height: 24px;
  }

  .box-dialog {
    z-index: 1050;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 90px 5px;
    background-color: #fefefe;
    //box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);

    box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
    border-radius: 40px;
    padding: 30px 30px;

    .box-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .box-header {
      height: 48px;
      padding: 8px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .box-title {
        ${({ theme }) => css`
          font-size: ${theme.font.size.title.large};
        `}
        font-weight: 400;
        margin: 0 0 0 0;

        font-family: "DMSans";
        font-style: normal;
        font-weight: 700;
        line-height: 31px;
        text-align: center;
      }
      .box-text {
        font-family: "DMSans";
        font-style: normal;
        font-weight: 400;
        ${({ theme }) => css`
          font-size: ${theme.font.size.text.medium};
        `}
        line-height: 18px;
        text-align: center;
        letter-spacing: -0.468947px;
      }

      .x-close {
        font-size: 35px;
        line-height: 35px;
        font-weight: 400;
        text-shadow: none;
        color: black;
        cursor: pointer;

        &:hover {
          opacity: 0.5;
        }
      }
    }

    .box-body {
      ${({ theme }) => css`
        font-size: ${theme.font.size.text.medium};
      `}
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }

    .box-footer {
      margin-top: 20px;
      height: 48px;
      padding: 0px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
    }
  }
`;

export default Modal;

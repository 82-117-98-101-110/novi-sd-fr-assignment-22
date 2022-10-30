import { ReactComponent as Close } from "../../assets/icons/close-icon.svg";
import styled, { css } from "styled-components";

const CloseButtonWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const CloseButton = (props) => (
  <CloseButtonWrapper className={props.className}>
    <Close className="CloseButtonWrapper">{props.children}</Close>
  </CloseButtonWrapper>
);

export default CloseButton;

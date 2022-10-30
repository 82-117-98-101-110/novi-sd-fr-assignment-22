import styled from "styled-components";
import { ButtonText } from "../../assets/styles/ButtonText";

const ButtonWrapper = styled.button`
  ${ButtonText}
  width: 128px;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonMediumText = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonMediumText;

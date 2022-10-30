import styled from "styled-components";
import { ButtonText } from "../../assets/styles/ButtonText";

const ButtonWrapper = styled.button`
  ${ButtonText}
  min-width: 110px;
  height: 32px;
  font-size: 14px;
  line-height: 24px;

  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonSmallText = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonSmallText;

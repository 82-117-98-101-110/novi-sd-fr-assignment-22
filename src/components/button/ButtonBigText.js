import styled from "styled-components";
import { ButtonText } from "../../assets/styles/ButtonText";

const ButtonWrapper = styled.button`
  ${ButtonText}
  width: 140px;
  height: 46px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonBigText = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonBigText;

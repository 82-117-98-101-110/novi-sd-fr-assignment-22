import styled from "styled-components";
import { ButtonSecondary } from "../../assets/styles/ButtonSecondary";

const ButtonWrapper = styled.button`
  ${ButtonSecondary}
  width: 140px;
  height: 46px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonBigSecundary = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonBigSecundary;

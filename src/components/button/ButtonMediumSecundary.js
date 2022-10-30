import styled from "styled-components";
import { ButtonSecondary } from "../../assets/styles/ButtonSecondary";

const ButtonWrapper = styled.button`
  ${ButtonSecondary}
  width: 128px;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonMediumSecundary = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonMediumSecundary;

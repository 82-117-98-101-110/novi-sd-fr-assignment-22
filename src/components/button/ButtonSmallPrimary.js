import styled from "styled-components";
import { ButtonPrimary } from "../../assets/styles/ButtonPrimary";

const ButtonWrapper = styled.button`
  ${ButtonPrimary}
  width: 110px;
  height: 32px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonSmallPrimary = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonSmallPrimary;

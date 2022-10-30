import styled from "styled-components";
import { ButtonPrimary } from "../../assets/styles/ButtonPrimary";

const ButtonWrapper = styled.button`
  ${ButtonPrimary}
  min-width: 46px;
  height: 46px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonIconPrimary = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonIconPrimary;

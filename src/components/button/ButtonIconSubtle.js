import styled from "styled-components";
import { ButtonSubtle } from "../../assets/styles/ButtonSubtle";

const ButtonWrapper = styled.button`
  ${ButtonSubtle}
  min-width: 46px;
  height: 46px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonIconSubtle = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonIconSubtle;

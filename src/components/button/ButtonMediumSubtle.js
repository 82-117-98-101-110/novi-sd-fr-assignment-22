import styled from "styled-components";
import { ButtonSubtle } from "../../assets/styles/ButtonSubtle";

const ButtonWrapper = styled.button`
  ${ButtonSubtle}
  width: 128px;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const ButtonMediumSubtle = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default ButtonMediumSubtle;

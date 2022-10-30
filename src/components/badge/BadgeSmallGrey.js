import styled from "styled-components";
import { ButtonPrimary } from "../../assets/styles/ButtonPrimary";
import { BadgeDefault } from "../../assets/styles/BadgeDefault";

const ButtonWrapper = styled.div`
  ${BadgeDefault}
  width: 50px;
  height: 8px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
  background: #c9d4ea;
`;

const BadgeSmallDefault = (props) => (
  <ButtonWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </ButtonWrapper>
);

export default BadgeSmallDefault;

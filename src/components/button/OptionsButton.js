import styled from "styled-components";
import { ReactComponent as Options } from "../../assets/icons/options-button.svg";

const OptionsButtonWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: calc(50% - 84px / 2);
  top: calc(50% - 34px / 2 - 27px);
`;

const OptionsButton = (props) => (
  <OptionsButtonWrapper className={props.className}>
    <Options className="CloseButtonWrapper">{props.children}</Options>
  </OptionsButtonWrapper>
);

export default OptionsButton;

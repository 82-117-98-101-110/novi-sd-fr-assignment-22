import styled from "styled-components";
import Logo from "./Logo";

const HeaderClosed = () => (
  <HeaderWrapper>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
  </HeaderWrapper>
);

export default HeaderClosed;

const HeaderWrapper = styled.header`
  display: flex;
  padding: 15px 110px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    padding: 15px 10px;
    justify-content: center;
  }
`;

const LogoWrapper = styled.header`
  @media screen and (max-width: 800px) {
  }
`;

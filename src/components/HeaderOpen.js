import styled from "styled-components";
import Logo from "./Logo";

const HeaderOpen = () => (
  <HeaderWrapper>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
  </HeaderWrapper>
);

export default HeaderOpen;

const HeaderWrapper = styled.header`
  display: flex;
  padding: 25px 110px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    padding: 25px 10px;
    justify-content: center;
  }
`;

const LogoWrapper = styled.header``;

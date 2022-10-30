import HeaderClosed from "./HeaderClosed";
import styled from "styled-components";
import NavigationBar from "./navigation-bar/NavigationBar";
import { FooterClosed } from "./FooterClosed";

const PageSpecific = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DefaultPageLayoutClosed = (props) => (
  <>
    <HeaderClosed />
    <PageSpecific>{props.children}</PageSpecific>
    <NavigationBar />
    <FooterClosed />
  </>
);

export default DefaultPageLayoutClosed;

import styled from "styled-components";
import HeaderOpen from "./HeaderOpen";

const DefaultPageLayoutOpenWrapper = styled.div`
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DefaultPageLayoutOpen = (props) => (
  <>
    <HeaderOpen />
    <DefaultPageLayoutOpenWrapper className={props.children}>
      <span className="title">{props.children}</span>
    </DefaultPageLayoutOpenWrapper>
  </>
);

export default DefaultPageLayoutOpen;

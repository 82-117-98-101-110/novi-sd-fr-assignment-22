import styled from "styled-components";

const SubMenuBar = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: baseline;

  @media only screen and (max-width: 1370px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export default SubMenuBar;

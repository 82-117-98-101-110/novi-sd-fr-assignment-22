import styled from "styled-components";
import { CardStyle } from "../../assets/styles/CardStyle";

const CardWrapper = styled.div`
  ${CardStyle}
  margin: 10px;
`;

const Card = (props) => (
  <CardWrapper className={props.className}>
    <span className="title">{props.children}</span>
  </CardWrapper>
);

export default Card;

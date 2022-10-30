import { css } from "styled-components";

export const CardStyle = css`
  ${({ theme }) => css`
    background: #ffffff;
    display: flex;
    justify-content: center;
    padding: 30px 30px;
    box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
    border-radius: 40px;
  `}
`;

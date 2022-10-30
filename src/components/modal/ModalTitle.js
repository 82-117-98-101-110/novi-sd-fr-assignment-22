import styled, { css } from "styled-components";

export const ModalTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colour.primaryDark};
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.title.large};
    font-weight: ${theme.font.weight.bold700};

    font-style: normal;
    line-height: 20px;
    /* identical to box height */

    //letter-spacing: -0.531474px;
    text-align: center;
    max-width: 270px;
    margin: 0px;
    margin-top: 20px;
  `}
`;

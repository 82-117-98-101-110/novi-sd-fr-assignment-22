import styled, { css } from "styled-components";

export const ModalText = styled.p`
  ${({ theme }) => css`
    color: var(--color-secondary-primary-darkGrey-500);
    font-family: ${theme.font.family};
    font-size: var(--font-size-10);
    font-weight: ${theme.font.weight.regular400};

    font-style: normal;
    line-height: 16px;
    /* identical to box height */

    //letter-spacing: -0.531474px;
    text-align: center;
    margin: 0px;
    margin-top: 20px;
    max-width: 270px;
  `}
`;

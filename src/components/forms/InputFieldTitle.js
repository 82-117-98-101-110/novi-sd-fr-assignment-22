import styled, { css } from "styled-components";

export const InputFieldTitle = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: var(--font-size-05);
    font-weight: ${theme.font.weight.regular400};
    font-style: normal;
    line-height: 16px;
    /* identical to box height */
    //letter-spacing: -0.531474px;
    color: var(--color-secondary-primary-darkGrey-500);
    margin-left: var(--space-40);
    display: inline-flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
  `}
`;

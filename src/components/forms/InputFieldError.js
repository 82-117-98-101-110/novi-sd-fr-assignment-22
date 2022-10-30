import styled, { css } from "styled-components";

export const InputFieldError = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: var(--font-size-05);
    font-weight: ${theme.font.weight.regular400};
    font-style: normal;
    line-height: var(--space-40);
    /* identical to box height */
    letter-spacing: -0.531474px;
    color: var(--color-error);
    margin-left: var(--space-40);
    display: inline-flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
  `}
`;

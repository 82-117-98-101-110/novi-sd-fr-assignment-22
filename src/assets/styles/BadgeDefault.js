import { css } from "styled-components";

export const BadgeDefault = css`
  ${({ theme }) => css`
    pointer-events: all;

    font-family: var(--font-family-a);
    font-style: normal;
    font-weight: var(--font-weight-20);

    border: 0px solid ${theme.colour.primaryDark};

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px;
    border-radius: 10px;
  `}
`;

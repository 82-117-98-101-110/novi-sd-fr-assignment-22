import { css } from "styled-components";

export const ButtonText = css`
  ${({ theme }) => css`
    pointer-events: all;

    font-family: var(--font-family-a);
    font-style: normal;
    font-weight: var(--font-weight-30);
    color: ${theme.colour.primary.purpleBlue500};
    background: ${theme.colour.secondary.light};
    border: 0px solid ${theme.colour.secondary.grey500};

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px;
    border-radius: 70px;
    left: calc(50% - 84px / 2);
    top: calc(50% - 34px / 2 - 27px);

    &:hover {
      color: ${theme.colour.primary.purpleBlue700};
    }

    &:focus {
    }

    &:active {
    }

    &:disabled {
    }
  `}
`;

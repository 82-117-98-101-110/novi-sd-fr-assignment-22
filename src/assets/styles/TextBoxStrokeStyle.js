import { css } from "styled-components";

export const TextBoxStrokeStyle = css`
  ${({ theme }) => css`
    color: ${theme.colour.primaryDark};
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.medium};
    font-weight: ${theme.font.weight.bold700};
    background: ${theme.colour.primaryLight};
    border: 1px solid ${theme.colour.primaryDark};

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    //box-sizing: border-box;
    border-radius: 10px;

    padding: 6px 19px;
    //
    //left: calc(50% - 84px/2);
    //top: calc(50% - 34px/2 - 27px);
  `}
`;

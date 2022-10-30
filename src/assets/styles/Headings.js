import styled, { css } from "styled-components";

export const Heading1 = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.title.extraLarge};
    font-weight: ${theme.font.weight.bold700};
  `}
`;

export const Heading2 = styled.h2`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.title.large};
    font-weight: ${theme.font.weight.bold700};
  `}
`;

export const Heading3 = styled.h3`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.title.medium};
    font-weight: ${theme.font.weight.bold700};
  `}
`;

import styled, { css } from "styled-components";

export const TextExraSmall = styled.text`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.text.extraSmall};
    font-weight: ${theme.font.weight.regular400};
  `}
`;

export const TextSmall = styled.text`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.text.small};
    font-weight: ${theme.font.weight.regular400};
  `}
`;

export const TextMedium = styled.text`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.text.medium};
    font-weight: ${theme.font.weight.regular400};
  `}
`;

export const TextLarge = styled.text`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.text.large};
    font-weight: ${theme.font.weight.regular400};
  `}
`;

export const TextExtraLarge = styled.text`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.text.extraLarge};
    font-weight: ${theme.font.weight.regular400};
  `}
`;

import styled, { css } from "styled-components";

export const Paragraph = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: ${theme.font.size.text.medium};
    font-weight: ${theme.font.weight.regular400};
  `}
`;

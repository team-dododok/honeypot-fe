import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface LinedInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  lineCount?: number;
  lineHeight?: number;
}

const LinedInput: React.FC<LinedInputProps> = ({
  lineCount = 9,
  lineHeight = 26,
  ...props
}) => {
  return (
    <StyledTextarea lineCount={lineCount} lineHeight={lineHeight} {...props} />
  );
};

export default LinedInput;

const StyledTextarea = styled.textarea<{
  lineCount: number;
  lineHeight: number;
}>`
  width: 100%;
  height: ${({ lineCount, lineHeight }) =>
    `calc(${lineHeight}px * ${lineCount})`};
  padding: 0;
  background-color: transparent;
  background-image: ${({ lineHeight }) => `
    repeating-linear-gradient(
      to bottom,
      ${theme.colors.gray10},
      ${theme.colors.gray10} 1px,
      transparent 1px,
      transparent ${lineHeight + 3}px
    )`};
  background-position-y: ${({ lineHeight }) => `${lineHeight + 3}px`};
  background-repeat: no-repeat;

  color: ${theme.colors.gray80};
  ${theme.typography.body4};
  line-height: ${({ lineHeight }) => `${lineHeight + 3}px`};

  &::placeholder {
    color: ${theme.colors.gray10};
  }
`;

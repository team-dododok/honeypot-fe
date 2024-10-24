import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  width?: string;
  color?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {
    current,
    total,
    width = '90px',
    color = theme.colors.brand60,
  } = props;

  const progressPercentage = (current / total) * 100;

  return (
    <ProgressBarContainer width={width}>
      <Current width={progressPercentage} color={color}></Current>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 8px;
  border-radius: 24px;
  background: ${theme.colors.gray10};
  position: relative;
`;

const Current = styled.div<{ width: number; color: string }>`
  width: ${(props) => props.width}%;
  height: 8px;
  border-radius: 24px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background: ${(props) => props.color};
`;

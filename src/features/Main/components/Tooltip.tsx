import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip = (prop: TooltipProps) => {
  const { children } = prop;

  return (
    <TooltipContainer>
      <TooltipArrow />
      <TooltipText>{children}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;

const TooltipContainer = styled.div`
  ${theme.typography.detail5};
  background: ${theme.colors.gray80};
  color: ${theme.colors.gray00};

  width: 200px;
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
`;

const TooltipArrow = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #444;
`;

const TooltipText = styled.div`
  position: relative;
  z-index: 1;
`;

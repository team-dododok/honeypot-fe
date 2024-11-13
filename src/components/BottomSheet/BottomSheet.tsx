import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface BottomSheetProps {
  title: string;
  initialHeight: string;
  expandedHeight: string;
  children: React.ReactNode;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { title, initialHeight, expandedHeight, children } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SheetOverlay>
      <SheetContainer height={isExpanded ? expandedHeight : initialHeight}>
        <Handle onClick={toggleExpand} />
        <Title>{title}</Title>
        <Content>{children}</Content>
      </SheetContainer>
    </SheetOverlay>
  );
};

const SheetOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
`;

const SheetContainer = styled.div<{ height: string }>`
  width: 100%;
  max-width: 480px;
  height: ${({ height }) => height};
  padding: 0 26px 32px 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${theme.colors.gray00};
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px 0px 8px 0px rgba(201, 201, 201, 0.25);
  transition: height 0.3s ease;
  overflow: hidden;
  pointer-events: auto;
`;

const Handle = styled.div`
  width: 56px;
  height: 6px;
  min-height: 6px;
  background: ${theme.colors.gray10};
  border-radius: 2px;
  margin: 14px auto 12px auto;
  cursor: pointer;
`;

const Title = styled.h2`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle1};
  margin-bottom: 14px;
`;

const Content = styled.div`
  overflow-y: auto;
`;

export default BottomSheet;

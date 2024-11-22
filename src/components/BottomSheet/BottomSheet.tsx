import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface BottomSheetProps {
  title: string;
  initialHeight: string;
  expandedHeight: string;
  children: React.ReactNode;
  background?: string;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { title, initialHeight, expandedHeight, children, background } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SheetOverlay>
      <SheetImageContainer height={isExpanded ? expandedHeight : initialHeight}>
        {!isExpanded && (
          <>
            <BongBongFace src="/assets/images/group/stamp/stamp-modal-bongbong-face.svg" />
            <BongBongHands src="/assets/images/group/stamp/stamp-modal-bongbong-hands.svg" />
          </>
        )}
        <SheetContainer
          height={isExpanded ? expandedHeight : initialHeight}
          background={isExpanded ? background : ''}
        >
          <Handle onClick={toggleExpand} />
          <Title>{title}</Title>
          <Content>{children}</Content>
        </SheetContainer>
      </SheetImageContainer>
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

const SheetImageContainer = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  max-width: 480px;
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  z-index: 5;
`;

const BongBongFace = styled.img`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
`;

const BongBongHands = styled.img`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
`;

const SheetContainer = styled.div<{ height: string; background?: string }>`
  width: 100%;
  max-width: 480px;
  height: ${({ height }) => height};
  padding: 0 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${theme.colors.gray00};
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px 0px 8px 0px rgba(201, 201, 201, 0.25);
  transition: height 0.3s ease;
  overflow: hidden;
  pointer-events: auto;
  z-index: 5;

  position: absolute;
  bottom: 0;
  left: 0;

  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -150px 200px;
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

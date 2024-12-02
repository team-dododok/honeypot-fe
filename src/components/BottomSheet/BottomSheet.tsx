import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

interface BottomSheetProps {
  title: string;
  initialMargin: number;
  expandedMargin: number;
  children: React.ReactNode;
  background?: string;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { title, initialMargin, expandedMargin, children, background } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialHeight, setInitialHeight] = useState<string>('0px');
  const [expandedHeight, setExpandedHeight] = useState<string>('0px');
  const startYRef = useRef<number | null>(null);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 브라우저 높이 기준 최대, 최소 높이 계산 */
  useEffect(() => {
    const calculateExpandedHeight = () => {
      const inital = `${window.innerHeight - initialMargin}px`;
      const expanded = `${window.innerHeight - expandedMargin}px`;
      setInitialHeight(inital);
      setExpandedHeight(expanded);
    };

    calculateExpandedHeight();
    window.addEventListener('resize', calculateExpandedHeight);

    return () => {
      window.removeEventListener('resize', calculateExpandedHeight);
    };
  }, []);

  /* 봉봉이에게 적용되는 이벤트 */
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePressStart = () => {
    pressTimerRef.current = setTimeout(toggleExpand, 10);
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const startY =
      e.type === 'touchstart'
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY;

    startYRef.current = startY;
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
  };

  /* Handle, Title에게 적용되는 이벤트 */
  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (startYRef.current === null) return;

    const currentY =
      e.type === 'touchmove'
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY;

    const diffY = startYRef.current - currentY;

    // 기준 거리 초과 시 상태 변경
    if (diffY > 10) {
      setIsExpanded(true);
      startYRef.current = null;
    } else if (diffY < -10) {
      setIsExpanded(false);
      startYRef.current = null;
    }
  };

  const handleEnd = () => {
    startYRef.current = null;
  };

  return (
    <SheetOverlay>
      <SheetImageContainer height={isExpanded ? expandedHeight : initialHeight}>
        {!isExpanded && (
          <>
            <BongBongFace
              src="/assets/images/group/stamp/stamp-modal-bongbong-face.svg"
              onMouseDown={handlePressStart}
              onTouchStart={handlePressStart}
              onMouseUp={handlePressEnd}
              onTouchEnd={handlePressEnd}
            />
            <BongBongHands
              src="/assets/images/group/stamp/stamp-modal-bongbong-hands.svg"
              onMouseDown={handlePressStart}
              onTouchStart={handlePressStart}
              onMouseUp={handlePressEnd}
              onTouchEnd={handlePressEnd}
            />
          </>
        )}
        <SheetContainer
          height={isExpanded ? expandedHeight : initialHeight}
          background={isExpanded ? background : ''}
        >
          <HandleWrapper
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
            onMouseUp={handleEnd}
          >
            <Handle />
          </HandleWrapper>
          <Title
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
            onMouseUp={handleEnd}
          >
            {title}
          </Title>
          <Content>{children}</Content>
        </SheetContainer>
      </SheetImageContainer>
    </SheetOverlay>
  );
};

export default BottomSheet;

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
  touch-action: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -webkit-touch-callout: none;
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
  pointer-events: auto;
  cursor: pointer;
  -webkit-user-drag: none;
`;

const BongBongHands = styled.img`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  pointer-events: auto;
  cursor: pointer;
  -webkit-user-drag: none;
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

  &::-webkit-scrollbar {
    display: none;
  }

  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -150px 200px;
`;

const HandleWrapper = styled.div`
  width: 100%;
  height: 32px;
  cursor: pointer;
`;

const Handle = styled.div`
  width: 56px;
  height: 6px;
  min-height: 6px;
  background: ${theme.colors.gray10};
  border-radius: 2px;
  margin: 14px auto 12px auto;
`;

const Title = styled.h2`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle1};
  margin-bottom: 14px;
  cursor: pointer;
  z-index: 20;
`;

const Content = styled.div`
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

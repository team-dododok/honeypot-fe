import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import Letter from './Letter';
import { css } from '@emotion/react';
import { marginFadeIn, marginFadeOut } from '@/styles/Animation';

interface ComplimentLetterProps {
  receiver: string;
  sender: string;
  content: string;
  groupName: string;
  honeyStampImage: string;
  stampName?: string;
  onClick?: () => void;
  readOnly?: boolean;
}

const ComplimentLetter = (props: ComplimentLetterProps) => {
  const {
    receiver,
    sender,
    content,
    groupName,
    honeyStampImage,
    stampName,
    onClick,
    readOnly = true,
  } = props;

  const [showBubble, setShowBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleShowTooltip = () => {
    if (!showBubble) {
      setShowBubble(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setShowBubble(false), 500);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
      setTimeout(() => setShowBubble(false), 300);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const stampImageToRender =
    !readOnly || honeyStampImage
      ? honeyStampImage || '/assets/images/stamp/stamp-select-default.svg'
      : undefined;

  return (
    <Container $readOnly={readOnly}>
      <Stamp>
        {!readOnly && !stampName && <Essential>*</Essential>}
        {stampImageToRender && (
          <Image
            data={stampImageToRender}
            onClick={readOnly && stampName ? handleShowTooltip : onClick}
          />
        )}
        {showBubble && stampName && (
          <TooltipBubble ref={tooltipRef} $visible={isVisible}>
            {stampName}
          </TooltipBubble>
        )}
      </Stamp>
      {readOnly && stampName && (
        <Guide>꿀도장 이미지를 누르면 도장 이름을 알 수 있어요!</Guide>
      )}
      <ProjectLabel>
        {groupName || <Span>{'그룹명을 찾을 수 없어요.'}</Span>}
      </ProjectLabel>
      <Letter
        receiver={receiver}
        sender={sender}
        content={content}
        lineColor={readOnly ? theme.colors.gray05 : theme.colors.gray10}
        totalLength={180}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default ComplimentLetter;

const Container = styled.div<{ $readOnly: boolean }>`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  background: ${theme.colors.gray00};
  ${({ $readOnly }) =>
    $readOnly &&
    css`
      border: 1px solid ${theme.colors.brand10};
    `}
`;

const Stamp = styled.button`
  width: 300px;
  height: 137px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

const Essential = styled.div`
  position: absolute;
  top: 15px;
  left: 90px;
  color: ${theme.colors.error60};
  ${theme.typography.subtitle};
`;

const Image = styled.div<{ data: string }>`
  width: 110px;
  height: 124px;
  background-image: url(${(props) => props.data});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Guide = styled.div`
  color: #5a5a5a5e;
  ${theme.typography.detail5};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const TooltipBubble = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  border-radius: 8px;
  background: ${theme.colors.gray80};
  color: ${theme.colors.gray00};
  ${theme.typography.detail5}
  text-align: left;
  z-index: 10;
  white-space: nowrap;
  animation: ${(props) =>
    props.$visible
      ? css`
          ${marginFadeIn} 0.3s ease-in-out forwards
        `
      : css`
          ${marginFadeOut} 0.3s ease-in-out forwards
        `};

  &::before {
    content: '';
    position: absolute;
    bottom: -5.5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${theme.colors.gray80};
  }
`;

const ProjectLabel = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
  border-radius: 12px;
  background: ${theme.colors.brand05};
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle3}
  text-align: center;
  justify-content: center;
`;

const Span = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.body4}
`;

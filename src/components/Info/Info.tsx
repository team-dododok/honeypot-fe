import { marginFadeIn, marginFadeOut } from '@/styles/Animation';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

interface InfoProps {
  children: React.ReactNode;
}

const Info = (props: InfoProps) => {
  const { children } = props;
  const [showBubble, setShowBubble] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleShowBubble = () => {
    if (!showBubble) {
      setShowBubble(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setShowBubble(false), 500);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
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

  return (
    <InfoContainer ref={infoRef}>
      <InfoIcon
        src="/assets/icons/info.svg"
        width={16}
        height={16}
        alt="자세히 보기"
        onClick={handleShowBubble}
      />
      {showBubble && <InfoBubble $visible={isVisible}>{children}</InfoBubble>}
    </InfoContainer>
  );
};

export default Info;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const InfoIcon = styled.img`
  cursor: pointer;
`;

const InfoBubble = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 33px;
  left: 0;
  transform: translateX(-60%);
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
    top: -6px;
    left: calc(60% + 2px);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${theme.colors.gray80};
  }
`;

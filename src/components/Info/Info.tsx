import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

interface InfoProps {
  children: React.ReactNode;
}

const Info = (props: InfoProps) => {
  const { children } = props;
  const [showBubble, setShowBubble] = useState<boolean>(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleShowBubble = () => {
    setShowBubble(!showBubble);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
      setShowBubble(false);
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
      {showBubble && <InfoBubble>{children}</InfoBubble>}
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

const InfoBubble = styled.div`
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

  &::before {
    content: '';
    position: absolute;
    top: -5.5px;
    left: calc(60% + 2px);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${theme.colors.gray80};
  }
`;

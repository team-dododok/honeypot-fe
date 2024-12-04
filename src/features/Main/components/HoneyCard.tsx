import React from 'react';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

interface HoneyCardProps {
  type: boolean;
  count: number;
  onClick: () => void;
}

const HoneyCard = (prop: HoneyCardProps) => {
  const { type, count, onClick } = prop;

  const titleText = `내가 ${type ? '받은' : '보낸'} 꿀`;
  const imagePosition = type ? 'right' : 'left';

  return (
    <Container onClick={onClick}>
      <Title>{titleText}</Title>
      <Number>{count}</Number>
      <HoneyImg
        src="/assets/images/main/honey-map.svg"
        alt="honey"
        $position={imagePosition}
      />
    </Container>
  );
};

export default HoneyCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border-radius: 8px;
  border: 1px solid ${theme.colors.gray10};
  background: ${theme.colors.gray00};

  width: 100%;
  min-height: 173px;
  max-height: 250px;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const Title = styled.div`
  ${theme.typography.body3};
  color: ${theme.colors.gray80};
  white-space: nowrap;
  z-index: 10;
`;

const Number = styled.div`
  ${theme.typography.heading3};
  color: ${theme.colors.gray80};
  z-index: 10;
`;

const HoneyImg = styled.img<{ $position: 'left' | 'right' }>`
  position: absolute;
  bottom: -30px;
  ${({ $position }) => $position}: -95px;
  z-index: 1;
`;

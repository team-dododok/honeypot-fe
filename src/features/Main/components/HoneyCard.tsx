import React from 'react';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

interface HoneyCardProps {
  type: boolean;
  count: number;
}

const HoneyCard = (prop: HoneyCardProps) => {
  const { type, count } = prop;

  return (
    <Container>
      <Title>내가 {type ? '받은' : '보낸'} 꿀</Title>
      <Number>{count}</Number>
      {type ? (
        <ReceivedImg src="/assets/images/main/received-honey.svg" alt="honey" />
      ) : (
        <SentImg src="/assets/images/main/sent-honey.svg" alt="honey" />
      )}
    </Container>
  );
};

export default HoneyCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 8px;
  border: 1px solid ${theme.colors.gray10};
  background: ${theme.colors.gray00};

  width: 100%;
  height: 100%;
  padding: 16px 16px 0 16px;
`;

const Title = styled.div`
  ${theme.typography.body3};
  color: ${theme.colors.gray80};
`;

const Number = styled.div`
  ${theme.typography.heading3};
  color: ${theme.colors.gray80};
`;

const ReceivedImg = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(22px, 12px);
`;

const SentImg = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(-18px, 6px);
`;

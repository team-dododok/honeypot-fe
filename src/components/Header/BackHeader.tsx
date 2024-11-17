import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import BackButton from '../Button/BackButton';

interface BackHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const BackHeader = (props: BackHeaderProps) => {
  const { title, children } = props;

  return (
    <Header>
      <BackButton />
      <Title>{title}</Title>
      {children}
    </Header>
  );
};

export default BackHeader;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const Title = styled.p`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
  white-space: nowrap;
`;

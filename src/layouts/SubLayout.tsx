import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import BackButton from '@/components/Button/BackButton';

interface SubLayoutProps {
  title: string;
}
const SubLayout: React.FC<SubLayoutProps> = ({ title }) => {
  return (
    <Container>
      <Header>
        <BackButton />
        <Title>{title}</Title>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default SubLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 26px;
  width: 100%;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.p`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
`;

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

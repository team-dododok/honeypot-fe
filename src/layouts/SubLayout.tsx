import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import BackHeader from '@/components/Header/BackHeader';

interface SubLayoutProps {
  title: string;
  padding?: string;
}
const SubLayout: React.FC<SubLayoutProps> = ({ title, padding = '26px' }) => {
  return (
    <Container $padding={padding}>
      <BackHeader title={title} />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default SubLayout;

const Container = styled.div<{ $padding: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ $padding }) => $padding || '26px'};
  width: 100%;
  height: 100vh;
`;

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

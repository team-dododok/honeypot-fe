import Header from '@/components/Header/Header';
import SidebarMenu from '@/components/Sidebar/SidebarMenu';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  background?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ background }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVerticalTab = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Layout $background={background}>
      <Header onMenuClick={toggleVerticalTab} />
      <Container>
        <Outlet />
        <SidebarMenu isOpen={isOpen} onClose={toggleVerticalTab} />
      </Container>
    </Layout>
  );
};

export default MainLayout;

const Layout = styled.div<{ $background?: string }>`
  width: 100%;
  height: 100vh;
  background: ${({ $background }) =>
    $background ? $background : 'transparent'};
  position: relative;
`;

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 64px 26px 26px 26px;
`;

// import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SidebarMenu from '@/components/Sidebar/SidebarMenu';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVerticalTab = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Header onMenuClick={toggleVerticalTab} />
      <Container>
        <Outlet />
        <SidebarMenu isOpen={isOpen} onClose={toggleVerticalTab} />
        {/* <Footer /> */}
      </Container>
    </>
  );
};

export default MainLayout;

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`;

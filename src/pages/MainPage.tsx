import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import React from 'react';
import MainBox from '@/features/Main/components/MainBox';

const MainPage = () => {
  return (
    <Container>
      <MainBox />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.gradient02};
  wdith: 100%;
  height: 100vh;
  margin: -87px -20px;
`;

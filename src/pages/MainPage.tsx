import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import React from 'react';
import MainBox from '@/features/Main/components/MainBox';
import MainBottomSheet from '@/features/Main/components/MainBottomSheet';

const MainPage = () => {
  return (
    <>
      <Container>
        <MainBox />
        <MainBottomSheet />
      </Container>
    </>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${theme.colors.gradient02};
  wdith: 100%;
  height: 100vh;
  margin: -20px;
  padding: 20px;
`;

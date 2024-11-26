import styled from '@emotion/styled';
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
  width: 100%;
  height: 100%;
`;

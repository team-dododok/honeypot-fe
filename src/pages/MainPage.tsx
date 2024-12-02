import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import MainBox from '@/features/Main/components/MainBox';
import MainBottomSheet from '@/features/Main/components/MainBottomSheet';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';

const MainPage = () => {
  const { clearState } = useSendComplimentStore();

  useEffect(() => {
    clearState();
  }, []);

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

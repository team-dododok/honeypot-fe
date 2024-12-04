import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import MainBox from '@/features/Main/components/MainBox';
import MainBottomSheet from '@/features/Main/components/MainBottomSheet';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';
import ToastModal from '@/components/Modal/ToastModal';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const { clearState } = useSendComplimentStore();

  /* 받은 꿀 저장 완료 모달 (전시회 임시 경로 변경)*/
  const [showToastModal, setShowToastModal] = useState<boolean>(false);

  /* 받은 꿀 저장 완료 안내 모달 */
  useEffect(() => {
    if (location.state?.showToast) {
      setShowToastModal(true);
      const timer = setTimeout(() => {
        setShowToastModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state?.showToast]);

  useEffect(() => {
    clearState();
  }, []);

  return (
    <>
      <Container>
        <MainBox />
        <MainBottomSheet />
        {/* 꿀 저장 성공 모달*/}
        <ToastModal
          isVisible={showToastModal}
          image={<object data="/assets/images/saved.svg" />}
          text="꿀이 저장되었어요!"
          onClose={() => {
            setShowToastModal(false);
          }}
        />
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

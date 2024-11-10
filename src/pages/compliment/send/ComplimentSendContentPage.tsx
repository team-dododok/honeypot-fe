import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import ComplimentLetter from '@/features/Compliment/components/Letter/ComplimentLetter';
import { CommonLayout } from '@/features/Signup';
import {
  BottomWrapper,
  Container,
  ProgressBarWrapper,
} from '@/features/Signup/layout/CommonLayout';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoModal from '@/features/Compliment/components/Modal/InfoModal';
import StampModal from '@/features/Stamp/components/Modal/StampModal';
import PreviewModal from '@/features/Compliment/components/Modal/PreviewModal';

const ComplimentSendContentPage = () => {
  const navigate = useNavigate();

  const [stampType, setStampType] = useState<number | null>(null);
  const receiver = '진주';
  const sender = '형준';
  const [content, setContent] = useState<string>('');

  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showSelectedStampModal, setShowSelectedStampModal] =
    useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const handleSelectedStamp = () => {
    setShowSelectedStampModal(true);
  };

  /* 모달 관련 함수 */
  const handleShowInfo = () => {
    setShowInfoModal(!showInfoModal);
  };

  const handleShowSelectedStamp = () => {
    setShowSelectedStampModal(!showSelectedStampModal);
  };

  const handleShowPreview = () => {
    setShowPreviewModal(!showPreviewModal);
  };

  const handleSendCompliment = () => {
    /* 칭찬 보내기 (카카오 공유하기) - 추후 구현 */
    navigate('/compliment/send/complete');
  };

  return (
    <CommonLayout>
      <ProgressBarWrapper marginBottom="52px">
        <InfoButton onClick={handleShowInfo}>
          <img src="/assets/icons/question.svg" alt="info" />
        </InfoButton>
        <ProgressBar current={2} total={2} />
      </ProgressBarWrapper>
      <Container>
        <ComplimentLetter
          stampType={stampType}
          receiver={receiver}
          sender={sender}
          content={content}
          setContent={setContent}
          onClick={handleSelectedStamp}
        />
      </Container>
      <BottomWrapper>
        <Button
          text="미리보기"
          variant="warning"
          onClick={handleShowPreview}
          disabled={!receiver || !sender || !content}
          disabledColor={theme.colors.gray10}
        />
        <Button
          text="칭찬 보내기"
          variant="activate"
          onClick={handleSendCompliment}
          disabled={!receiver || !sender || !content}
        />
      </BottomWrapper>
      {/* 모달 */}
      <InfoModal showModal={showInfoModal} onClose={handleShowInfo} />
      <StampModal
        showModal={showSelectedStampModal}
        onClose={handleShowSelectedStamp}
        stampType={stampType}
        setStampType={setStampType}
      />
      <PreviewModal
        showModal={showPreviewModal}
        onClose={handleShowPreview}
        receiver={receiver}
        sender={sender}
        content={content}
      />
    </CommonLayout>
  );
};

export default ComplimentSendContentPage;

const InfoButton = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 16px;
`;

import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import ComplimentLetter from '@/features/Compliment/components/Letter/ComplimentLetter';
import {
  CommonLayout,
  BottomWrapper,
  Container,
  ProgressBarWrapper,
} from '@/layouts/FormLayoutStyles';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoModal from '@/features/Compliment/components/Modal/InfoModal';
import StampModal from '@/features/Stamp/components/Modal/StampModal';
import PreviewModal from '@/features/Compliment/components/Modal/PreviewModal';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';
import { usePostSendPraise } from '@/hooks/sendPraise/usePostSendPraise';

const ComplimentSendContentPage = () => {
  const navigate = useNavigate();
  const { receiverName, content, groupId, ongoing, honeyStampId, clearState } =
    useSendComplimentStore();
  const sender = '형준';

  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showSelectedStampModal, setShowSelectedStampModal] =
    useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const { mutate: sendPraise } = usePostSendPraise();

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
    if (!receiverName || !content || !honeyStampId) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    sendPraise(
      {
        title: '', // 나중에 request body 바뀌면 제거
        content: content,
        projectStatus: ongoing === 1,
        receiverName: receiverName,
        groupId: groupId || 0,
        honeyStampId: honeyStampId,
      },
      {
        onSuccess: () => {
          clearState();
          navigate('/compliment/send/complete');
        },
      }
    );
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
          stampType={honeyStampId}
          receiver={receiverName}
          sender={sender}
          content={content}
          onClick={handleSelectedStamp}
          readOnly={false}
        />
      </Container>
      <BottomWrapper>
        <Button
          text="미리보기"
          variant="warning"
          onClick={handleShowPreview}
          disabled={!receiverName || !sender || !content}
          disabledColor={theme.colors.gray10}
        />
        <Button
          text="칭찬 보내기"
          variant="activate"
          onClick={handleSendCompliment}
          disabled={!receiverName || !sender || !content}
        />
      </BottomWrapper>
      {/* 모달 */}
      <InfoModal showModal={showInfoModal} onClose={handleShowInfo} />
      <StampModal
        showModal={showSelectedStampModal}
        onClose={handleShowSelectedStamp}
      />
      <PreviewModal
        showModal={showPreviewModal}
        onClose={handleShowPreview}
        receiver={receiverName}
        sender={sender}
        content={content}
        stampId={honeyStampId}
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

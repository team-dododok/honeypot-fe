import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import CenterModal from '@/components/Modal/CenterModal';
import ComplimentLetter from '@/features/Compliment/components/Letter/ComplimentLetter';
import KakaoPreview from '@/features/Compliment/components/KakaoPreview';
import { COMPLIMENT_WAY_DESCRIPTION } from '@/features/Compliment/constants/description';
import { CommonLayout } from '@/features/Signup';
import {
  BottomWrapper,
  Container,
  ProgressBarWrapper,
} from '@/features/Signup/layout/CommonLayout';
import StampLabel from '@/features/Stamp/components/StampLabel';
import { STAMP } from '@/features/Stamp/constants/stamp';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      {showInfoModal && (
        <CenterModal
          title="칭찬에는 두 가지 방법이 있어요."
          onConfirm={handleShowInfo}
        >
          <CenterModalContainer>
            {COMPLIMENT_WAY_DESCRIPTION.map((item) => (
              <InfoDiv key={item.id}>
                <Label>
                  {item.id}. {item.title}
                </Label>
                <Description>{item.description}</Description>
                <Content>{item.content}</Content>
              </InfoDiv>
            ))}
          </CenterModalContainer>
        </CenterModal>
      )}
      {showSelectedStampModal && (
        <CenterModal
          title="보내고 싶은 꿀도장을 선택하세요."
          confirmText="도장찍기"
          onConfirm={handleShowSelectedStamp}
          disabled={stampType === null}
        >
          <GridContainer>
            {STAMP.map((item) => (
              <StampLabel
                key={item.id}
                id={item.id}
                image={item.image}
                stampName={item.stampName}
                selected={stampType}
                onClick={() => {
                  if (item.id === stampType) {
                    setStampType(null);
                  } else {
                    setStampType(item.id);
                  }
                }}
              />
            ))}
          </GridContainer>
        </CenterModal>
      )}
      {showPreviewModal && (
        <CenterModal
          title="‘칭찬 전달’ 카카오톡 예시"
          onConfirm={handleShowPreview}
        >
          <PreviewContainer>
            <Description>
              {`카카오톡으로 칭찬을 보내면,\n아래와 같은 메시지가 전송됩니다.`}
            </Description>
            <KakaoPreview
              receiver={receiver}
              sender={sender}
              content={content}
            />
          </PreviewContainer>
        </CenterModal>
      )}
    </CommonLayout>
  );
};

export default ComplimentSendContentPage;

const InfoButton = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 16px;
`;

const CenterModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle3};
`;

const Description = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.detail4};
`;

const Content = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray60};
  ${theme.typography.detail4};
  border-radius: 16px;
  background: ${theme.colors.gray05};
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const PreviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

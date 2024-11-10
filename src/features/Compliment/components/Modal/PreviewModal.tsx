import React from 'react';
import CenterModal from '@/components/Modal/CenterModal';
import KakaoPreview from '@/features/Compliment/components/KakaoPreview';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface PreviewModalProps {
  showModal: boolean;
  onClose: () => void;
  receiver: string;
  sender: string;
  content: string;
}
const PreviewModal = (props: PreviewModalProps) => {
  const { showModal, onClose, receiver, sender, content } = props;

  if (!showModal) return null;

  return (
    <CenterModal title="‘칭찬 전달’ 카카오톡 예시" onConfirm={onClose}>
      <PreviewContainer>
        <Description>
          {`카카오톡으로 칭찬을 보내면,\n아래와 같은 메시지가 전송됩니다.`}
        </Description>
        <KakaoPreview receiver={receiver} sender={sender} content={content} />
      </PreviewContainer>
    </CenterModal>
  );
};

export default PreviewModal;

const PreviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.detail4};
`;

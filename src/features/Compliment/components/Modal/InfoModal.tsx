import React from 'react';
import CenterModal from '@/components/Modal/CenterModal';
import { COMPLIMENT_WAY_DESCRIPTION } from '@/features/Compliment/constants/description';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

interface InfoModalProps {
  showModal: boolean;
  onClose: () => void;
}

const InfoModal = (props: InfoModalProps) => {
  const { showModal, onClose } = props;

  if (!showModal) return null;

  return (
    <CenterModal title="칭찬에는 두 가지 방법이 있어요." onConfirm={onClose}>
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
  );
};

export default InfoModal;

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

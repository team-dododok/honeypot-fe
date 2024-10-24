import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import Button from '../Button/Button';

interface WaringModal {
  width?: string;
  height?: string;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  image?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}
const WarningModal = (props: WaringModal) => {
  const {
    title,
    description,
    cancelText,
    confirmText,
    image,
    onCancel,
    onConfirm,
  } = props;
  return (
    <ModalOverlay>
      <ModalContainer>
        {image}
        <ModalContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </ModalContent>
        <ButtonWrapper>
          <Button variant="default" text={cancelText} onClick={onCancel} />
          <Button variant="danger" text={confirmText} onClick={onConfirm} />
        </ButtonWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WarningModal;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(46, 44, 41, 0.8);
`;
const ModalContainer = styled.div`
  display: flex;
  width: 308px;
  padding: 16px 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 16px;
  background: ${theme.colors.gray00};
`;

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  color: ${theme.colors.error60};
  ${theme.typography.subtitle1}
`;

const Description = styled.div`
  color: ${theme.colors.gray60};
  ${theme.typography.detail4}
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

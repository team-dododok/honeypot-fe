import styled from '@emotion/styled';
import React from 'react';
import Button from '../Button/Button';
import { theme } from '@/styles/theme';

interface CenterModal {
  width?: string;
  height?: string;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  isVisible: boolean;
}
const ProcessModal = (props: CenterModal) => {
  const {
    width,
    height,
    title,
    description,
    cancelText = '취소',
    confirmText = '확인',
    children,
    onCancel,
    onConfirm,
    confirmDisabled = false,
    isVisible,
  } = props;
  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContainer width={width} height={height}>
        <Title>
          {title}
          {description && <Description>{description}</Description>}
        </Title>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
      <ButtonWrapper>
        <Button
          variant="deactivate"
          text={cancelText}
          onClick={onCancel}
          background={theme.colors.gray10}
        />
        <Button
          variant="activate"
          text={confirmText}
          onClick={onConfirm}
          disabled={confirmDisabled}
        />
      </ButtonWrapper>
    </ModalOverlay>
  );
};

export default ProcessModal;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 26px;
  align-items: center;
  gap: 16px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(46, 44, 41, 0.8);
  z-index: 30;
`;

const ModalContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  max-width: 424px;
  height: ${({ height }) => height || 'auto'};
  padding: 16px 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 16px;
  background: ${theme.colors.gray00};
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle1}
  text-align: left;
`;

const Description = styled.div`
  width: 100%;
  color: ${theme.colors.gray50};
  ${theme.typography.body4}
  text-align: left;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 424px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

import styled from '@emotion/styled';
import React from 'react';
import Button from '../Button/Button';
import { theme } from '@/styles/theme';

interface BottomModal {
  width?: string;
  height?: string;
  title: string;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  isVisible: boolean;
}
const BottomModal = (props: BottomModal) => {
  const {
    width,
    height,
    title,
    cancelText = '취소',
    confirmText = '완료',
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
        <ModalTop>
          <Title>{title}</Title>
          <ModalContent>{children}</ModalContent>
        </ModalTop>
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
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BottomModal;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(46, 44, 41, 0.8);
  z-index: 20;
`;

const ModalContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  max-width: 480px;
  height: ${({ height }) => height || 'auto'};
  padding: 32px 26px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-radius: 24px 24px 0 0;
  background: ${theme.colors.gray00};
  position: relative;
`;

const ModalTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  width: 100%;
  color: ${theme.colors.gray80};
  ${theme.typography.body2}
  text-align: left;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 13px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 25px;
`;

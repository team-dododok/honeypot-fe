import styled from '@emotion/styled';
import React from 'react';
import Button from '../Button/Button';
import { theme } from '@/styles/theme';

interface CloseModal {
  width?: string;
  height?: string;
  gap?: string;
  confirmText?: string;
  buttonIcon?: React.ReactNode;
  children?: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}
const CloseModal = (props: CloseModal) => {
  const {
    width,
    height,
    gap,
    confirmText = '저장',
    buttonIcon,
    children,
    onConfirm,
    onClose,
  } = props;
  return (
    <ModalOverlay>
      <ModalContainer width={width} height={height} gap={gap}>
        <Top>
          <CloseButton onClick={onClose}>
            <img
              src="/assets/icons/close.svg"
              width={20}
              height={20}
              alt="닫기"
            />
          </CloseButton>
        </Top>
        <ModalContent>
          {children}
          {confirmText && (
            <ButtonWrapper>
              <Button
                variant="normal"
                text={confirmText}
                icon={buttonIcon}
                onClick={onConfirm}
              />
            </ButtonWrapper>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CloseModal;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0 26px;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(46, 44, 41, 0.8);
  z-index: 10;
`;

const ModalContainer = styled.div<{
  width?: string;
  height?: string;
  gap?: string;
}>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  max-width: 424px;
  height: ${({ height }) => height || 'auto'};
  padding: 16px 20px;
  flex-direction: column;
  align-items: center;
  gap: ${({ gap }) => gap || '20px'};
  border-radius: 16px;
  background: ${theme.colors.gray00};
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

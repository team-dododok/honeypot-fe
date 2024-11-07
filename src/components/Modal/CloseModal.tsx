import styled from '@emotion/styled';
import React from 'react';
import Button from '../Button/Button';
import { theme } from '@/styles/theme';

interface CloseModal {
  width?: string;
  height?: string;
  confirmText?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
}
const CloseModal = (props: CloseModal) => {
  const { width, height, confirmText = '저장', children, onConfirm } = props;
  return (
    <ModalOverlay>
      <ModalContainer width={width} height={height}>
        {/* <CloseButton></CloseButton> */}
        <ModalContent>
          {children}
          <ButtonWrapper>
            <Button variant="normal" text={confirmText} onClick={onConfirm} />
          </ButtonWrapper>
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
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

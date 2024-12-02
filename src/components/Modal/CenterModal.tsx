import styled from '@emotion/styled';
import React from 'react';
import Button from '../Button/Button';
import { theme } from '@/styles/theme';
import { AnimatePresence, motion } from 'framer-motion';

interface CenterModal {
  width?: string;
  height?: string;
  title: string;
  confirmText?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  disabled?: boolean;
  isVisible: boolean;
}
const CenterModal = (props: CenterModal) => {
  const {
    width,
    height,
    title,
    confirmText = '확인',
    children,
    onConfirm,
    disabled = false,
    isVisible,
  } = props;
  return (
    <AnimatePresence>
      {isVisible && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalContainer
            width={width}
            height={height}
            initial={{ transform: 'translateY(5%)' }}
            animate={{ transform: 'translateY(0)' }}
            exit={{ transform: 'translateY(100%)' }}
            transition={{ duration: 0.4 }}
          >
            <Title>{title}</Title>
            <ModalContent>
              {children}
              <ButtonWrapper>
                <Button
                  variant="activate"
                  text={confirmText}
                  onClick={onConfirm}
                  disabled={disabled}
                />
              </ButtonWrapper>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CenterModal;

const ModalOverlay = styled(motion.div)`
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

const ModalContainer = styled(motion.div)<{ width?: string; height?: string }>`
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

const Title = styled.div`
  width: 100%;
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle1}
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

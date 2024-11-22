import { fadeIn, fadeOut } from '@/styles/Animation';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

interface ToastModalProps {
  isVisible: boolean;
  image: React.ReactNode;
  text: string;
  onClose: () => void;
}
const ToastModal = (props: ToastModalProps) => {
  const { isVisible, image, text, onClose } = props;

  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContainer $visible={show}>
        <Gif src="/assets/gif/congratulation.gif" />
        {image}
        <Text>{text}</Text>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ToastModal;

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
  z-index: 10;
  overflow: hidden;
`;

const ModalContainer = styled.div<{
  $visible: boolean;
}>`
  width: 100%;
  max-width: 424px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 66px 20px;
  border-radius: 16px;
  background: ${theme.colors.gray00};
  position: relative;
  animation: ${(props) =>
    props.$visible
      ? css`
          ${fadeIn} 0.5s ease-in-out
        `
      : css`
          ${fadeOut} 0.5s ease-in-out
        `};
`;

const Gif = styled.img`
  width: 1200px;
  height: 600px;
  max-width: 424px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 50px));
  z-index: 100;
`;

const Text = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle1};
`;

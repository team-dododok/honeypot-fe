import React from 'react';
import { fadeIn, fadeOut } from '@/styles/Animation';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useToast } from '@/store/useToast';

const Toast = () => {
  const { message, isVisible, isMove, top, bottom, left, right, link } =
    useToast();

  if (!isVisible) return null;

  const handleMovePage = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <ToastContainer
      $visible={isVisible}
      $top={top}
      $bottom={bottom}
      $left={left}
      $right={right}
    >
      <Message>{message}</Message>
      {isMove && <MoveButton onClick={handleMovePage}>이동</MoveButton>}
    </ToastContainer>
  );
};

export default Toast;

const ToastContainer = styled.div<{
  $visible: boolean;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}>`
  width: calc(100% - 50px);
  max-width: 430px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 12px;
  background: rgba(74, 70, 66, 0.8);
  backdrop-filter: blur(8px);
  color: ${theme.colors.gray00};
  z-index: 1000;
  position: absolute;
  top: ${({ $top }) => $top};
  bottom: ${({ $bottom }) => $bottom};
  left: ${({ $left }) => $left};
  right: ${({ $right }) => $right};
  transform: translateX(-50%);
  ${theme.typography.body4};
  animation: ${(props) =>
    props.$visible
      ? css`
          ${fadeIn} 0.5s ease-in-out
        `
      : css`
          ${fadeOut} 0.5s ease-in-out
        `};
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 60px;
`;

const MoveButton = styled.button`
  width: 48px;
  height: 32px;
  border-radius: 70px;
  background: ${theme.colors.gray50};
  color: ${theme.colors.gray00};
  ${theme.typography.body4};
`;

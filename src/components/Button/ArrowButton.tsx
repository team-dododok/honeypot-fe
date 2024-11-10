import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface ArrowButtonProps {
  text: string;
  direction: 'left' | 'right' | 'up' | 'down';
  onClick: () => void;
  disabled?: boolean;
}

const ArrowButton = ({
  text,
  direction,
  onClick,
  disabled,
}: ArrowButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction} arrow button`}
    >
      <TextWrapper>{text}</TextWrapper>
      {direction === 'right' && (
        <img src="/assets/icons/icn-upwardarrow.svg" alt="arrow" />
      )}
    </Button>
  );
};

ArrowButton.defaultProps = {
  disabled: false,
};

export default ArrowButton;

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
  gap: 8px;

  border-radius: 16px;
  border: 1px solid ${theme.colors.gray10};
  background: ${theme.colors.white};

  ${theme.typography.subtitle2};
  color: ${theme.colors.gray80};
`;

const TextWrapper = styled.span`
  flex: 1;
  text-align: left;
`;

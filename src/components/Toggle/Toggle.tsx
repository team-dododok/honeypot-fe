import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface ToggleProps {
  disabled?: boolean;
  isChecked: boolean;
  onChange: () => void;
}

const Toggle = ({ disabled = false, isChecked, onChange }: ToggleProps) => {
  const handleClick = () => {
    if (!disabled) {
      onChange();
    }
  };

  return (
    <ToggleWrapper onClick={handleClick} disabled={disabled}>
      <ToggleButton isChecked={isChecked} disabled={disabled}>
        <ToggleCircle isChecked={isChecked} />
      </ToggleButton>
    </ToggleWrapper>
  );
};

export default Toggle;

const ToggleWrapper = styled.div<{ disabled: boolean }>`
  display: inline-block;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ToggleButton = styled.div<{ isChecked: boolean; disabled: boolean }>`
  width: 54px;
  height: 30px;
  background-color: ${({ isChecked, disabled }) =>
    disabled
      ? theme.colors.brand10
      : isChecked
        ? theme.colors.brand50
        : theme.colors.gray30};
  border-radius: 15px;
  position: relative;
  transition: background-color 0.3s ease;
`;

const ToggleCircle = styled.div<{ isChecked: boolean }>`
  width: 23px;
  height: 23px;
  background: ${theme.colors.gray00};
  border-radius: 50%;
  position: absolute;
  top: 3.5px;
  left: ${({ isChecked }) => (isChecked ? '28px' : '3px')};
  transition: left 0.3s ease;
`;

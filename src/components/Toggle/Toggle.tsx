import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface ToggleProps {
  isChecked: boolean;
  onChange: () => void;
}

const Toggle = ({ isChecked, onChange }: ToggleProps) => {
  return (
    <ToggleWrapper onClick={onChange}>
      <ToggleButton isChecked={isChecked}>
        <ToggleCircle isChecked={isChecked} />
      </ToggleButton>
    </ToggleWrapper>
  );
};

export default Toggle;

const ToggleWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const ToggleButton = styled.div<{ isChecked: boolean }>`
  width: 54px;
  height: 30px;
  background-color: ${({ isChecked }) =>
    isChecked ? theme.colors.brand50 : theme.colors.gray30};
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

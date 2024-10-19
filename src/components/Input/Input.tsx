import { theme } from '@/styles/theme';
import { InputProps } from '@/types/common/InputProps';
import styled from '@emotion/styled';
import React from 'react';
// import { EraseIcon } from '../../../public/assets/index';

const Input: React.FC<InputProps> = ({
  width,
  placeholder,
  clear = false,
  value,
  onChange,
}) => {
  const handleClear = () => {
    onChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <InputContainer width={width}>
      <StyledInput
        type="text"
        value={value}
        onChange={onChange}
        hasValue={!!value}
        placeholder={placeholder}
      />
      {clear && (
        <ClearIconContainer onClick={handleClear} hasValue={!!value}>
          <img src="/assets/icons/erase.svg" alt="Clear" />
        </ClearIconContainer>
      )}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${({ width }) => width || 'auto'};
  height: 54px;
`;

const StyledInput = styled.input<{ hasValue: boolean }>`
  width: 100%;
  height: 100%;
  padding: 24px 20px;
  border-radius: 16px;
  border: 1px solid
    ${({ hasValue, theme }) =>
      hasValue ? theme.colors.gray60 : theme.colors.gray10};
  background: ${theme.colors.gray00};
  color: ${theme.colors.gray80};
  ${theme.typography.body3};

  outline: none;

  &:focus {
    border: 1px solid ${theme.colors.gray60};
  }
  &::placeholder {
    color: ${theme.colors.gray30};
  }
`;

const ClearIconContainer = styled.div<{ hasValue: boolean }>`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  .svg {
    fill: ${({ hasValue, theme }) =>
      hasValue ? theme.colors.gray60 : theme.colors.gray30};
  }
`;

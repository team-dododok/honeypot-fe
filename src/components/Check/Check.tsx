import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

type checkType = 'circle' | 'default' | 'radio';

interface CheckProps {
  variant?: checkType;
  label: string;
  isChecked?: boolean;
  children?: React.ReactNode;
  fontSize?: string;
  color?: string;
  marginRight?: string;
  disabled?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const Check: React.FC<CheckProps> = ({
  variant = 'default',
  label,
  isChecked = false,
  onChange,
  children,
  fontSize = 'subtitle2',
  color = 'gray90',
  marginRight = '12px',
  disabled = false,
}) => {
  const iconPath =
    variant === 'circle'
      ? `/assets/icons/check-circle${isChecked ? '-yellow' : ''}.svg`
      : `/assets/icons/check${isChecked ? '-yellow' : ''}.svg`;

  return (
    <StyledCheck>
      <CheckInput
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange && onChange(!isChecked)}
        disabled={disabled}
      />
      {variant === 'radio' ? (
        <StyledRadio isChecked={isChecked} marginRight={marginRight} />
      ) : (
        <Icon src={iconPath} marginRight={marginRight} />
      )}
      {label && (
        <LabelText fontSize={fontSize} color={color}>
          {label}
          {children}
        </LabelText>
      )}
    </StyledCheck>
  );
};

export default Check;

const StyledCheck = styled.label`
  display: flex;
  align-items: center;
  position: relative;
`;

const CheckInput = styled.input`
  display: none;
`;

const Icon = styled.img<{ marginRight: string }>`
  width: 24px;
  height: 24px;
  margin-right: ${(props) => props.marginRight};
`;

const StyledRadio = styled.div<{ isChecked: boolean; marginRight: string }>`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${({ isChecked }) => (isChecked ? '2px' : '1px')} solid
    ${({ theme }) => theme.colors.brand60};
  background-color: ${theme.colors.gray00};
  position: relative;
  margin-right: ${(props) => props.marginRight};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ isChecked }) => (isChecked ? '10px' : '0px')};
    height: ${({ isChecked }) => (isChecked ? '10px' : '0px')};
    background-color: ${theme.colors.brand60};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ isChecked }) => (isChecked ? '1' : '0')};
    transition: opacity 0.2s ease;
  }
`;

const LabelText = styled.span<{ fontSize: string; color: string }>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.typography[props.fontSize]};
  white-space: nowrap;
`;

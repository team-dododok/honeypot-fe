import styled from '@emotion/styled';
import React from 'react';

type checkType = 'circle' | 'default';

interface CheckProps {
  variant?: checkType;
  label: string;
  isChecked?: boolean;
  children?: React.ReactNode;
  fontSize?: string;
  color?: string;
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
      <Icon src={iconPath} />
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

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
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

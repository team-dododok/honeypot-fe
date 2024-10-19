import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { variantStyles } from '@/styles/varientStyles';
import { ButtonProps } from '@/types/common/ButtonProps';

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant = 'normal',
  height = '54px',
  ...props
}) => {
  return (
    <StyledButton text={text} variant={variant} height={height} {...props}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height};
  padding: 10px 20px;
  border-radius: 5px;

  background-color: ${(props) =>
    variantStyles[props.variant || 'normal']?.backgroundColor(props.theme)};
  color: ${(props) =>
    variantStyles[props.variant || 'normal']?.color(props.theme)};
  border: ${(props) =>
    variantStyles[props.variant || 'normal']?.border || 'none'};

  ${theme.typography.body3};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => {
      switch (props.variant) {
        case 'normal':
          return props.theme.colors.gray90;
        case 'default':
          return props.theme.colors.gray30;
        case 'deactivate':
          return props.theme.colors.gray50;
        case 'activate':
          return props.theme.colors.brand60;
        case 'danger':
          return props.theme.colors.error90;
        case 'warning':
          return props.theme.colors.warning20;
        default:
          return props.theme.colors.gray30;
      }
    }};
  }

  &:disabled {
    color: ${theme.colors.gray80};
    background-color: ${theme.colors.gray30};
    border: none;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { variantStyles } from '@/styles/varientStyles';
import { ButtonProps } from '@/types/components/ButtonProps';

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant,
  disabledColor,
  loading,
  border,
  ...props
}) => {
  return (
    <StyledButton
      text={text}
      variant={variant}
      disabledColor={disabledColor}
      loading={loading}
      border={border}
      {...props}
    >
      {icon && <IconContainer $isText={!!text}>{icon}</IconContainer>}
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '54px'};
  padding: ${(props) => props.padding || '10px'};
  border-radius: ${(props) => props.borderRadius || '16px'};

  background-color: ${(props) =>
    props.background ||
    variantStyles[props.variant || 'normal']?.backgroundColor(props.theme)};
  color: ${(props) =>
    props.color ||
    variantStyles[props.variant || 'normal']?.color(props.theme)};
  border: ${(props) =>
    props.border || variantStyles[props.variant || 'normal']?.border || 'none'};

  ${(props) =>
    props.typography
      ? theme.typography[props.typography]
      : theme.typography.body3};
  white-space: nowrap;
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
          return props.theme.colors.gray00;
        // case 'warning':
        //   return props.theme.colors.warning90;
        default:
          return;
      }
    }};
  }

  &:disabled {
    ${({ variant }) =>
      variant === 'warning'
        ? `
        color: ${theme.colors.gray50};
        border: 1px solid ${theme.colors.gray30};
        background: ${theme.colors.gray00};
      `
        : `
        color: ${theme.colors.gray80};
        background-color: ${theme.colors.gray30};
        border: none;
      `};
    ${({ disabledColor }) =>
      disabledColor && `background-color: ${disabledColor};`}
  }

  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

const IconContainer = styled.span<{ $isText: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ $isText }) => ($isText ? '8px' : '0px')};
`;

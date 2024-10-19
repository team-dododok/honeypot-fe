import { Theme } from "@emotion/react";

export const variantStyles = {
  normal: {
    backgroundColor: (theme: Theme) => theme.colors.gray80,
    color: (theme: Theme) => theme.colors.gray00,
    border: 'none',
  },
  default: {
    backgroundColor: (theme: Theme) => theme.colors.gray10,
    color: (theme: Theme) => theme.colors.gray80,
    border: 'none',
  },
  deactivate: {
    backgroundColor: (theme: Theme) => theme.colors.gray30,
    color: (theme: Theme) => theme.colors.gray80,
    border: 'none',
  },
  activate: {
    backgroundColor: (theme: Theme) => theme.colors.brand50,
    color: (theme: Theme) => theme.colors.gray80,
    border: 'none',
  },
  danger: {
    backgroundColor: (theme: Theme) => theme.colors.error60,
    color: (theme: Theme) => theme.colors.gray00,
    border: 'none',
  },
  warning: {
    backgroundColor: (theme: Theme) => theme.colors.gray00,
    color: (theme: Theme) => theme.colors.warning90,
    border: '1px solid',
  },
} as const;

type ButtonType =
  | 'normal'
  | 'default'
  | 'deactivate'
  | 'activate'
  | 'danger'
  | 'warning';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  padding?: string;
  text: string;
  icon?: React.ReactNode;
  background?: string;
  color?: string;
  borderRadius?: string;
  typography?: string;
  variant?: ButtonType;
  disabled?: boolean;
  disabledColor?: string;
  loading?: boolean;
  onClick?: () => void;
}

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
  text: string;
  icon?: React.ReactNode;
  variant?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
}

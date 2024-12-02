export interface InputProps {
  type?: string;
  width?: string;
  placeholder?: string;
  clear?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  successMsg?: string;
  errorMsg?: string;
  readOnly?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  pattern?: string;
  inputMode?: inputModeType;
}

export interface MessageProps {
  successMsg?: string;
  errorMsg?: string;
}

export type inputModeType =
  | 'search'
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'none'
  | 'numeric'
  | 'decimal'
  | undefined;

export interface InputProps {
  width?: string;
  placeholder?: string;
  clear?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  successMsg?: string;
  errorMsg?: string;
  readOnly?: boolean;
}

export interface MessageProps {
  successMsg?: string;
  errorMsg?: string;
}

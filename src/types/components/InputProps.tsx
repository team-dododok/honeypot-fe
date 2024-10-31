export interface InputProps {
  width?: string;
  placeholder?: string;
  clear?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  successMsg?: string;
  errorMsg?: string;
}

export interface MessageProps {
  successMsg?: string;
  errorMsg?: string;
}

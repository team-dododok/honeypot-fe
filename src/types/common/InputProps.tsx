export interface InputProps {
  width?: string;
  placeholder?: string;
  clear?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

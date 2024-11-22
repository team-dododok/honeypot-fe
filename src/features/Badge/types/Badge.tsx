import { RefObject } from 'react';

export interface Badge {
  id: number;
  name: string;
  image?: string;
  goal: string;
  isObtain?: boolean;
  date?: string;
}

export interface BadgeModal extends Badge {
  onConfirm: () => void;
  onClose: () => void;
  ref: RefObject<HTMLDivElement>;
}

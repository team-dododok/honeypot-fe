import { RefObject } from 'react';

export interface Badge {
  id: number;
  name: string;
  image?: string;
  description: string;
  completedDate: string | null;
}

export interface BadgeModal extends Badge {
  onConfirm: () => void;
  onClose: () => void;
  ref: RefObject<HTMLDivElement>;
}

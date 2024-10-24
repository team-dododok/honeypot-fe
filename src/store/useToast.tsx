import { create } from 'zustand';

interface ToastState {
  message: string;
  isVisible: boolean;
  isMove: boolean;
  duration: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  link?: string | null;
  showToast: (
    message: string,
    duration?: number,
    position?: { top?: string; bottom?: string; left?: string; right?: string }
  ) => void;
  showMoveToast: (
    message: string,
    link: string,
    duration?: number,
    position?: { top?: string; bottom?: string; left?: string; right?: string }
  ) => void;
  hideToast: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: '',
  isVisible: false,
  isMove: false,
  duration: 3000,
  top: undefined,
  bottom: undefined,
  left: '50%',
  right: undefined,
  showToast: (message, duration = 3000, position = {}) => {
    set({
      message,
      duration,
      ...position,
      isVisible: true,
      isMove: false,
    });

    setTimeout(() => {
      set({ isVisible: false });
    }, duration);
  },
  showMoveToast: (message, link, duration = 3000, position = {}) => {
    set({
      message,
      link,
      duration,
      ...position,
      isVisible: true,
      isMove: true,
    });

    setTimeout(() => {
      set({ isVisible: false });
    }, duration);
  },
  hideToast: () => set({ isVisible: false }),
}));

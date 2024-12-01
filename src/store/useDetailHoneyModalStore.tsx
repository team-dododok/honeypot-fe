import { create } from 'zustand';

interface DetailHoneyModalState {
  isDetailModalOpen: boolean;
  modalContent: {
    id: number;
    profileImg: string;
    nameType: 'receiver' | 'sender';
    name: string;
    content: string;
    imgUrl: string;
    date: string;
  };
  openDetailModal: (content: DetailHoneyModalState['modalContent']) => void;
  closeDetailModal: () => void;
}

export const useDetailHoneyModalStore = create<DetailHoneyModalState>(
  (set) => ({
    isDetailModalOpen: false,
    modalContent: {
      id: 0,
      profileImg: '',
      nameType: 'sender',
      name: '',
      content: '',
      imgUrl: '',
      date: '',
    },
    openDetailModal: (content) =>
      set({ isDetailModalOpen: true, modalContent: content }),
    closeDetailModal: () => set({ isDetailModalOpen: false }),
  })
);

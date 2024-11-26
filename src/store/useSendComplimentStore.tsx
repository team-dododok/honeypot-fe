import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SendComplimentState {
  receiverName: string;
  groupId: number | null;
  groupName: string;
  ongoing: number | null;
  content: string;
  honeyStampId: number | null;
  honeyStampImage: string;
  setReceiverName: (receiverName: string) => void;
  setGroupId: (groupId: number | null) => void;
  setGroupName: (groupName: string) => void;
  setOngoing: (ongoing: number) => void;
  setContent: (ongoing: string) => void;
  setHoneyStampId: (honeyStampId: number | null) => void;
  setHoneyStampImage: (honeyStampImage: string) => void;
  clearState: () => void;
}

export const useSendComplimentStore = create<SendComplimentState>()(
  persist(
    (set) => ({
      receiverName: '',
      groupName: '',
      groupId: null,
      ongoing: null,
      content: '',
      honeyStampId: null,
      honeyStampImage: '',
      setReceiverName: (receiverName) => set({ receiverName }),
      setGroupId: (groupId) => set({ groupId }),
      setGroupName: (groupName) => set({ groupName }),
      setOngoing: (ongoing) => set({ ongoing }),
      setContent: (content) => set({ content }),
      setHoneyStampId: (honeyStampId) => set({ honeyStampId }),
      setHoneyStampImage: (honeyStampImage) => set({ honeyStampImage }),
      clearState: () =>
        set({
          receiverName: '',
          groupId: null,
          groupName: '',
          ongoing: null,
          content: '',
          honeyStampId: null,
          honeyStampImage: '',
        }),
    }),
    {
      name: 'send-compliment-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

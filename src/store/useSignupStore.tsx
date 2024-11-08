import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type IsCheckedTermsType = { 0: boolean; 1: boolean; 2: boolean };

interface SignUpState {
  isCheckedTerms: IsCheckedTermsType;
  name: string;
  email: string;
  emailAuth: string;
  isAuthCompleted: boolean;
  profileIdx: number | null;
  setIsCheckedTerms: (terms: IsCheckedTermsType) => void;
  setIsCheckedTerm: (id: 0 | 1 | 2, checked: boolean) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setEmailAuth: (auth: string) => void;
  setIsAuthCompleted: (completed: boolean) => void;
  setProfileIdx: (index: number | null) => void;
  clearState: () => void;
}

export const useSignUpStore = create<SignUpState>()(
  persist(
    (set) => ({
      isCheckedTerms: {
        0: false,
        1: false,
        2: false,
      },
      name: '',
      email: '',
      emailAuth: '',
      isAuthCompleted: false,
      profileIdx: null,
      setIsCheckedTerms: (terms) => set({ isCheckedTerms: terms }),
      setIsCheckedTerm: (id, checked) =>
        set((state) => {
          const updatedTerms = { ...state.isCheckedTerms, [id]: checked };
          return { isCheckedTerms: updatedTerms };
        }),
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setEmailAuth: (auth) => set({ emailAuth: auth }),
      setIsAuthCompleted: (completed) => set({ isAuthCompleted: completed }),
      setProfileIdx: (index) => set({ profileIdx: index }),
      clearState: () =>
        set({
          isCheckedTerms: {
            0: false,
            1: false,
            2: false,
          },
          name: '',
          email: '',
          emailAuth: '',
          isAuthCompleted: false,
          profileIdx: null,
        }),
    }),
    {
      name: 'signUp-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

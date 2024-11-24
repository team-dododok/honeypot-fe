import axios from 'axios';

import { useToast } from '@/store/useToast';

export const handleMutationError = (error: unknown) => {
  const { showToast } = useToast.getState();

    if (axios.isAxiosError(error) && error.response) {
    const httpMessage = error.response?.data?.message || '오류가 발생했습니다.';
        showToast(httpMessage);
  } else {
    showToast('일시적인 오류가 발생했습니다.\n다시 시도해주세요.');
  }
};

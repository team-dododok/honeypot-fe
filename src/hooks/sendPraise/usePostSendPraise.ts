import { useMutation } from '@tanstack/react-query';
import { postSendPraise } from '@/api/sendPraise/postSendPraise';
import { handleMutationError } from '@/utils/error';
import { useToast } from '@/store/useToast';

export const usePostSendPraise = () => {
    const { showToast } = useToast.getState();

    return useMutation(postSendPraise, {
      onError: (error) => {
        handleMutationError(error);
        showToast(`칭찬을 전송에 실패했습니다. 다시 시도해주세요.`);
      },
      onSuccess: (data) => {
          return data;
      },
    });
};

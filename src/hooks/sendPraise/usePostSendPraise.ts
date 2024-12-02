import { useMutation } from '@tanstack/react-query';
import { postSendPraise } from '@/api/sendPraise/postSendPraise';

export const usePostSendPraise = () => {
    return useMutation(postSendPraise, {
      onSuccess: (data) => {
          return data;
      },
    });
};

import { postSendEmail } from '@/api/email/postSendEmail';
import { handleMutationError } from '@/utils/error';
import { useMutation } from '@tanstack/react-query';

export const useSendEmail = () => {

  return useMutation(postSendEmail, {
    onSuccess: () => {
      // showToast('인증번호가 전송되었어요.', 3000, {
      //   bottom: '81px',
      // });
    },
    onError: (error) => {
      handleMutationError(error);
      // showToast('인증번호 발송에 실패했습니다.', 3000, {
      //   bottom: '81px',
      // });
    },
  });
};

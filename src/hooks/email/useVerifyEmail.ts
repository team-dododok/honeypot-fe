import { useMutation } from '@tanstack/react-query';
import { getVerifyEmail } from '@/api/email/getVerifyEmail';
import { useToast } from '@/store/useToast';
import { handleMutationError } from '@/utils/error';

export const useVerifyEmail = () => {
  const { showToast } = useToast();

  return useMutation(
    ({ email, code }: { email: string; code: string }) =>
      getVerifyEmail(email, code),
    {
      onError: (error) => {
        handleMutationError(error);
        showToast('인증번호 검증에 실패했습니다.');
      },
    }
  );
};

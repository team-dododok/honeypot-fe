import { useMutation } from '@tanstack/react-query';
import { getVerifyEmail } from '@/api/email/getVerifyEmail';

export const useVerifyEmail = () => {

  return useMutation(
    ({ email, code }: { email: string; code: string }) =>
      getVerifyEmail(email, code),
  );
};

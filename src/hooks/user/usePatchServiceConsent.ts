import { queryClient } from '@/api/queryClient';
import { patchServiceConsent } from '@/api/user/patchServiceConsent';
import { useToast } from '@/store/useToast';
import { useMutation } from '@tanstack/react-query';

export const usePatchServiceConsent = () => {
  const { showToast } = useToast.getState();

  return useMutation({
    mutationKey: ['services'],
    mutationFn: (updatedData: unknown) => patchServiceConsent(updatedData),
    onSuccess: () => {
      showToast('약관 동의를 변경했어요');
      queryClient.invalidateQueries(['services']);
    },
    onError: () => {
      showToast('약관 동의를 변경하는 중 오류가 발생했어요.');
    },
  });
};

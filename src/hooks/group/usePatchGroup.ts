import { patchGroup } from '@/api/group/patchGroup';
import { useToast } from '@/store/useToast';
import { useMutation } from '@tanstack/react-query';

export const usePatchGroup = () => {
  const { showToast } = useToast.getState();
  
  return useMutation(patchGroup, {
    onSuccess: () => {
      showToast('그룹명 변경이 완료되었어요');
    },
    onError: () => {
      showToast('그룹명 변경 중 오류가 발생했어요. 다시 시도해주세요.');
    },
  });
};

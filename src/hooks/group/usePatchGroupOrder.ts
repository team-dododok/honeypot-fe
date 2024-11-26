import { PatchGroupParams } from '@/api/group/types/Group';
import { patchGroupOrder } from '@/api/group/patchGroupOrder';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';

export const usePatchGroupOrder = () => {
  const { showToast } = useToast.getState();

  return useMutation({
    mutationKey: ['groupOrder'],
    mutationFn: ({ groupId, groupName }: PatchGroupParams) =>
      patchGroupOrder({ groupId, groupName }),
    onSuccess: () => {
      showToast('변경된 내용을 저장했어요');
    },
    onError: () => {
      showToast('변경 사항을 저장하는 중 오류가 발생했어요.');
    },
  });
};

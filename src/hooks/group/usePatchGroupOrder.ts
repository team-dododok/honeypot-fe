import { patchGroupOrder } from '@/api/group/patchGroupOrder';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';
import { PatchGroupOrder } from '@/api/group/types/Group';

export const usePatchGroupOrder = () => {
  const { showToast } = useToast.getState();

  return useMutation({
    mutationKey: ['groupOrder'],
    mutationFn: (patchData: PatchGroupOrder) => patchGroupOrder(patchData),
    onSuccess: () => {
      showToast('그룹 순서를 변경했어요');
    },
    onError: () => {
      showToast('그룹 순서를 변경하는 중 오류가 발생했어요.');
    },
  });
};

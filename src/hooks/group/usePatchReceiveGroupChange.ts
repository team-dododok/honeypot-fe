import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';
import { patchReceiveGroupChange } from '@/api/group/patchReceiveGroupChange';
import { PatchGroupChange } from '@/api/group/types/Group';

export const usePatchGroupOrder = () => {
  const { showMoveToast } = useToast.getState();

  return useMutation({
    mutationKey: ['groupOrder'],
    mutationFn: (patchData: PatchGroupChange) =>
      patchReceiveGroupChange(patchData),
    onSuccess: (patchData: PatchGroupChange) => {
      showMoveToast('성공적으로 꿀을 옮겼어요.', `/group/${patchData.groupId}`);
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';
import { PatchGroupChange } from '@/api/group/types/Group';
import { patchSendGroupChange } from '@/api/group/patchSendGroupChange';

export const usePatchSendGroupChange = () => {
  const { showMoveToast } = useToast.getState();

  return useMutation({
    mutationKey: ['groupOrder'],
    mutationFn: (patchData: PatchGroupChange) =>
      patchSendGroupChange(patchData),
    onSuccess: (patchData: PatchGroupChange) => {
      showMoveToast('성공적으로 꿀을 옮겼어요.', `/group/${patchData.groupId}`);
    },
  });
};

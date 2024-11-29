import { deleteGroup } from '@/api/group/deleteGroup';
import { useMutation } from '@tanstack/react-query';
import { handleMutationError } from '@/utils/error';
import { useToast } from '@/store/useToast';
import { queryClient } from '@/api/queryClient';

export const useDeleteGroup = () => {
  const { showToast } = useToast.getState();

  return useMutation((groupId: string) => deleteGroup(groupId), {
    onError: (error) => {
      handleMutationError(error);
      showToast(`그룹을 삭제하는 데 실패했습니다.`);
    },
    onSuccess: () => {
      showToast('그룹을 성공적으로 삭제하였습니다.');
      queryClient.invalidateQueries(['groupData']);
    },
  });
};

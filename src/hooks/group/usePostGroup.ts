import { postGroup } from '@/api/group/postGroup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';

export const usePostGroup = () => {
  const { showToast } = useToast.getState();
  const queryClient = useQueryClient();

  return useMutation(postGroup, {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast(`그룹을 추가하는 데 실패했습니다.`);
    // },
    onSuccess: (data) => {
      showToast('그룹이 성공적으로 추가되었습니다.');
      queryClient.invalidateQueries(['group']);
      return data;
    },
  });
};

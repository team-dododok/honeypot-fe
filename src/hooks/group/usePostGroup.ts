import { postGroup } from '@/api/group/postGroup';
import { useMutation } from '@tanstack/react-query';
// import { handleMutationError } from '@/utils/error';
// import { useToast } from '@/store/useToast';

export const usePostGroup = () => {
  // const { showToast } = useToast.getState();
  // const queryClient = useQueryClient();

  return useMutation(postGroup, {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast(`그룹을 추가하는 데 실패했습니다.`);
    // },
    onSuccess: (data) => {
      return data;
      // showToast('그룹이 성공적으로 추가되었습니다.');
      // queryClient.invalidateQueries(['group']);
    },
  });
};

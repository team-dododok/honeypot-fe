import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';
import { getGroupDetail } from '@/api/group/getGroupDetail';

export const useGroupDetail = (groupId: number) => {
  const { showToast } = useToast.getState();

  return useQuery(['group', groupId], () => getGroupDetail(groupId), {
    onError: (error) => {
      handleMutationError(error);
      showToast('그룹 정보를 불러오는 데 실패했습니다.');
    },
  });
};
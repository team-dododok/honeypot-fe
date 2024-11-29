import { useQuery } from '@tanstack/react-query';
import { getGroupDetail } from '@/api/group/getGroupDetail';

export const useGroupDetail = (groupId: number) => {

  return useQuery(['group', groupId], () => getGroupDetail(groupId), {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast('그룹 정보를 불러오는 데 실패했습니다.');
    // },
  });
};
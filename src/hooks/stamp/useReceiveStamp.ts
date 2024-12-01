import { getReceiveStamp } from '@/api/stamp/getReceiveStamp';
// import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useReceiveStamp = (groupId: number) => {
  // const { showToast } = useToast.getState();

  return useQuery(['stamp', groupId], () => getReceiveStamp(groupId), {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast('받은 꿀도장 정보를 불러오는 데 실패했습니다.');
    // },
  });
};

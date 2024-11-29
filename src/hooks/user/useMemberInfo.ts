import { getMemberInfo } from '@/api/user/getMemberInfo';
// import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useMemberInfo = () => {
  // const { showToast } = useToast.getState();

  return useQuery(['users'], getMemberInfo, {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast('유저 정보를 불러오는 데 실패했습니다.');
    // },
  });
};

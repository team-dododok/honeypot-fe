import { getMemberProfileImage } from '@/api/user/getMemberProfileImage';
// import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useMemberProfileImage = () => {
  // const { showToast } = useToast.getState();

  return useQuery(['profileImages'], getMemberProfileImage, {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast('프로필 이미지를 불러오는 데 실패했습니다.');
    // },
  });
};

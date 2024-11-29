import { getStampImage } from '@/api/stamp/getStampImage';
// import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useStampImage = () => {
  // const { showToast } = useToast.getState();

  return useQuery(['stamp'], getStampImage, {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast('꿀도장 정보를 불러오는 데 실패했습니다.');
    // },
  });
};

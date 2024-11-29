import { getServiceConsent } from '@/api/user/getServiceConsent';
// import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useServiceConsent = () => {
  // const { showToast } = useToast.getState();

  return useQuery(['services'], getServiceConsent, {
    // onError: (error) => {
    //   handleMutationError(error);
    //   showToast('약관 동의를 실패했습니다.');
    // },
  });
};

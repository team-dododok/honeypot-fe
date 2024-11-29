import { PostReceivedPraise } from '@/api/receivedPraise/types/ReceivedPraise';
import { postReceivedPraise } from '@/api/receivedPraise/postReceivedPraise';
import { useMutation } from '@tanstack/react-query';
// import { useToast } from '@/store/useToast';
// import { handleMutationError } from '@/utils/error';

export const usePostReceivedPraise = () => {
  // const { showToast } = useToast.getState();
  
  return useMutation(
    (receivedPraise: PostReceivedPraise) => postReceivedPraise(receivedPraise),
    {
      // onError: (error) => {
      //   handleMutationError(error);
      //   showToast(`칭찬 저장에 실패했습니다. 다시 시도해주세요.`);
      // },
    }
  );
};
import { PostReceivedPraise } from '@/api/receivedPraise/types/ReceivedPraise';
import { postReceivedPraise } from '@/api/receivedPraise/postReceivedPraise';
import { useMutation } from '@tanstack/react-query';

export const usePostReceivedPraise = () => {
  
  return useMutation(
    (receivedPraise: PostReceivedPraise) => postReceivedPraise(receivedPraise),
  );
};
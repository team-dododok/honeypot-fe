import { PostReceivedPraise } from '@/api/receivedPraise/types/ReceivedPraise';
import { postReceivedPraise } from '@/api/receivedPraise/postReceivedPraise';
import { useQuery } from '@tanstack/react-query';

export const usePostReceivedPraise = (receivedParise: PostReceivedPraise) => {
  return useQuery(['receivedPraise'], () => postReceivedPraise(receivedParise));
};

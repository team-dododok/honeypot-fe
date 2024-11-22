import { deleteReceivedPraise } from '@/api/receivedPraise/deleteReceivedPraise';
import { useQuery } from '@tanstack/react-query';

export const useDeleteReceivedPraise = () => {
  return useQuery(['receivedPraise'], () => deleteReceivedPraise());
};

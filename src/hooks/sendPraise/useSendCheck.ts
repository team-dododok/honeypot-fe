import { getSendCheck } from '@/api/sendPraise/getSendCheck';
import { useQuery } from '@tanstack/react-query';

export const useSendCheck = (uuid: string, options = {}) => {
  return useQuery(['sendCheck', uuid], () => getSendCheck(uuid), {
    enabled: !!uuid,
    refetchOnWindowFocus: false,
    ...options,
  });
};

import { getSendCheck } from '@/api/sendPraise/getSendCheck';
import { SendCheckData } from '@/api/sendPraise/types/SendPraise';
import { useQuery } from '@tanstack/react-query';

export const useSendCheck = (uuid: string, options = {}) => {
  return useQuery<SendCheckData, Error>(
    ['sendCheck', uuid],
    () => getSendCheck(uuid),
    {
      enabled: !!uuid,
      refetchOnWindowFocus: false,
      ...options,
    }
  );
};

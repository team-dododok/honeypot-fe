import { getUuidReceivedPraise } from '@/api/receivedPraise/getUuidReceivedPraise';
import { UuidReceivedPraiseParams } from '@/api/receivedPraise/interfaces/ReceivedPraise';
import { useQuery } from '@tanstack/react-query';

export const useUuidReceivedPraise = (uuid: UuidReceivedPraiseParams) => {
  return useQuery(['receivedPraise', uuid], () => getUuidReceivedPraise(uuid));
};

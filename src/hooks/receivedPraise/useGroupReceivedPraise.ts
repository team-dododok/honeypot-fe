import { getGroupReceivedPraise } from '@/api/receivedPraise/getGroupReceivedPraise';
import { GroupReceivedPraiseParams } from '@/api/receivedPraise/interfaces/ReceivedPraise';
import { useQuery } from '@tanstack/react-query';

export const useGroupReceivedPraise = (Group: GroupReceivedPraiseParams) => {
  return useQuery(['receivedPraise', Group], () =>
    getGroupReceivedPraise(Group)
  );
};

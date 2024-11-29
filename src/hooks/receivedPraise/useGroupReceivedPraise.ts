import { getGroupReceivedPraise } from '@/api/receivedPraise/getGroupReceivedPraise';
import { GroupReceivedPraiseParams, GroupReceivePraiseInfo } from '@/api/receivedPraise/types/ReceivedPraise';
import { useInfiniteQuery} from '@tanstack/react-query';

export const useGroupReceivedPraise = (Group: GroupReceivedPraiseParams) => {
  return useInfiniteQuery<GroupReceivePraiseInfo>(
    ['receivedPraise', Group],
      ({ pageParam = 0 }) =>
        getGroupReceivedPraise({
          ...Group,
          page: pageParam,
        }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.pageInfo) {
          const nextPage = lastPage.pageInfo.pageNum + 1;
          if (nextPage < lastPage.pageInfo.totalPages) {
            return nextPage;
          }
        }
        return undefined;
      },
    }
  );
};

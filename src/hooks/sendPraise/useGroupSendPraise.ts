import { getGroupSendPraise } from '@/api/sendPraise/getGroupSendPraise';
import { GroupSendPraiseInfo, GroupSendPraiseParams } from '@/api/sendPraise/types/SendPraise';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGroupSendPraise = (Group: GroupSendPraiseParams) => {
  return useInfiniteQuery<GroupSendPraiseInfo>(
    ['sendPraise', Group],
    ({ pageParam = 0 }) =>
      getGroupSendPraise({
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

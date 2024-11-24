import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';
import { getGroupSearch } from '@/api/group/getGroupSearch';

export const useGroupSearch = (groupName: string) => {
  const { showToast } = useToast.getState();

  return useQuery(
    ['groupSearch', groupName],
    () => getGroupSearch({ groupName }),
    {
      onError: (error) => {
        handleMutationError(error);
        showToast('그룹 검색에 실패했습니다.');
      },
    }
  );
};

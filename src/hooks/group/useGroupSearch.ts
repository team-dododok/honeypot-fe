import { useQuery } from '@tanstack/react-query';
import { getGroupSearch } from '@/api/group/getGroupSearch';

export const useGroupSearch = (groupName: string) => {

  return useQuery(
    ['groupSearch', groupName],
    () => getGroupSearch({ groupName }),
  );
};

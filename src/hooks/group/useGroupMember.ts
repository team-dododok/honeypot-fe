import { useQuery } from '@tanstack/react-query';
import { getGroupMember } from '@/api/group/getGroupMember';

export const useGroupMember = (groupId: number[]) => {
  return useQuery(['groupMember', groupId], () => getGroupMember( groupId ));
};

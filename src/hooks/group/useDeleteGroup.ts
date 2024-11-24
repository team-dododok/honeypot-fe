import { deleteGroup } from '@/api/group/deleteGroup';
import { DeleteGroupParams } from '@/api/group/types/Group';
import { useQuery } from '@tanstack/react-query';

export const useDeleteGroup = (groupId: DeleteGroupParams) => {
  return useQuery(['group'], () => deleteGroup(groupId));
};

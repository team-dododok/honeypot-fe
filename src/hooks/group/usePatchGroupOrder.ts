import { PatchGroupParams } from '@/api/group/types/Group';
import { patchGroupOrder } from '@/api/group/patchGroupOrder';
import { useQuery } from '@tanstack/react-query';

export const usePatchGroupOrder = ({
  groupId,
  groupName,
}: PatchGroupParams) => {
  return useQuery(['group'], () => patchGroupOrder({ groupId, groupName }));
};

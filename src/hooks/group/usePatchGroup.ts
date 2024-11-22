import { PatchGroupParams } from '@/api/group/types/Group';
import { patchGroup } from '@/api/group/patchGroup';
import { useQuery } from '@tanstack/react-query';

export const usePatchGroup = ({ groupId, groupName }: PatchGroupParams) => {
  return useQuery(['group'], () => patchGroup({ groupId, groupName }));
};

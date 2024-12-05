import { GroupCheckParams } from '@/api/group/types/Group';
import { getGroupCheck } from '../../api/group/getGroupCheck';
import { useQuery } from '@tanstack/react-query';

export const useGroupCheck = ({ groupName }: GroupCheckParams) => {
  return useQuery(['group', groupName], () => getGroupCheck({ groupName }));
};

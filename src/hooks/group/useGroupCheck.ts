import { GroupCheckParams } from '@/api/group/interfaces/Group';
import { getGroupCheck } from '../../api/group/getGroupCheck';
import { useQuery } from '@tanstack/react-query';

export const useGroupCheck = ({ id, groupName }: GroupCheckParams) => {
  return useQuery(['group'], () => getGroupCheck({ id, groupName }));
};

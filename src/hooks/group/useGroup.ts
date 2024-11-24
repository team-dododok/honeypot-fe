import { getGroup } from '../../api/group/getGroup';
import { useQuery } from '@tanstack/react-query';

export const useGroup = () => {
  return useQuery(['group'], getGroup);
};

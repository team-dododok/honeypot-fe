import { patchMember } from '@/api/user/patchMember';
import { useQuery } from '@tanstack/react-query';

export const usePatchMember = () => {
  return useQuery(['users'], patchMember);
};

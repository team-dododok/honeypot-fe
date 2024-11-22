import { getMemberInfo } from '@/api/user/getMemberInfo';
import { useQuery } from '@tanstack/react-query';

export const useMemberInfo = () => {
  return useQuery(['users'], getMemberInfo);
};

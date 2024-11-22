import { getMemberProfileImage } from '@/api/user/getMemberProfileImage';
import { useQuery } from '@tanstack/react-query';

export const useMemberInfo = () => {
  return useQuery(['users'], getMemberProfileImage);
};

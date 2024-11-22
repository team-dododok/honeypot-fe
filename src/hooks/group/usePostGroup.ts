import { PostGroupParams } from '@/api/group/interfaces/Group';
import { postGroup } from '@/api/group/postGroup';
import { useQuery } from '@tanstack/react-query';

export const usePostGroup = (groupName: PostGroupParams) => {
  return useQuery(['group'], () => postGroup(groupName));
};

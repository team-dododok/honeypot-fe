import { postGroup } from '@/api/group/postGroup';
import { useMutation } from '@tanstack/react-query';

export const usePostGroup = () => {
  return useMutation(postGroup);
};

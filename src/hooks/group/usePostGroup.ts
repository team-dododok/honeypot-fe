import { postGroup } from '@/api/group/postGroup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostGroup = () => {
  const queryClient = useQueryClient();

  return useMutation(postGroup, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['group']);
      return data;
    },
  });
};

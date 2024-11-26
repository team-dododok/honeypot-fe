import { handleMutationError } from '@/utils/error';
import { getGroup } from '../../api/group/getGroup';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/store/useToast';

export const useGroup = () => {
  const { showToast } = useToast();

  return useQuery(['group'], getGroup, {
    onError: (error) => {
      handleMutationError(error);
      showToast('그룹 정보를 불러오는 데 실패했습니다.');
    },
  });
};

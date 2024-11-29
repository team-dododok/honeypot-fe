import { getBadge } from '@/api/badge/getBadge';
import { useToast } from '@/store/useToast';
import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useBadge = () => {
  const { showToast } = useToast.getState();
  
  return useQuery(['badge'], getBadge, {
    onError: (error) => {
    
      handleMutationError(error);
      showToast(`뱃지 리스트를 불러오는 데에 실패했습니다.`);
    }
  });
};

import { getSendStamp } from '@/api/stamp/getSendStamp';
import { useToast } from '@/store/useToast';
import { handleMutationError } from '@/utils/error';
import { useQuery } from '@tanstack/react-query';

export const useSendStamp = (groupId: number) => {
  const { showToast } = useToast.getState();

  return useQuery(
    ['stamp', groupId],
    ()=> getSendStamp(groupId),
    {
      onError: (error) => {
        handleMutationError(error);
        showToast('보낸 꿀도장 정보를 불러오는 데 실패했습니다.');
      },
    }
  );
};

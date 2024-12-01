import { deleteReceivedPraise } from '@/api/receivedPraise/deleteReceivedPraise';
import { useToast } from '@/store/useToast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteReceivedPraise = () => {
  const { showToast } = useToast.getState();
   return useMutation((ids: number[]) => deleteReceivedPraise(ids), {
     onSuccess: () => {
      showToast('선택한 꿀을 성공적으로 삭제하였습니다.');
     },
   });
};

import { patchMember } from '@/api/user/patchMember';
import { useToast } from '@/store/useToast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePatchMember = () => {
  const navigate = useNavigate();
  const { showToast } = useToast.getState();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (updatedData: unknown) => patchMember(updatedData),
    onSuccess: () => {
      showToast('변경된 내용을 저장했어요');
      navigate('/profile');
    },
    onError: () => {
      showToast('변경 사항을 저장하는 중 오류가 발생했어요.');
    },
  });
};

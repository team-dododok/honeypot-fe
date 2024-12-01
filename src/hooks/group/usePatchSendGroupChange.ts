import { useMutation } from '@tanstack/react-query';
import { patchSendGroupChange } from '@/api/group/patchSendGroupChange';
import { PatchGroupChange } from '@/api/group/types/Group';

export const usePatchSendGroupChange = () => {
  return useMutation(
    (patchGroupChange: PatchGroupChange) => patchSendGroupChange(patchGroupChange),
  );
};

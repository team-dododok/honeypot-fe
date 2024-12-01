import { useMutation } from '@tanstack/react-query';
import { patchReceiveGroupChange } from '@/api/group/patchReceiveGroupChange';
import { PatchGroupChange } from '@/api/group/types/Group';

export const usePatchReceiveGroupChange = () => {
  return useMutation((patchGroupChange: PatchGroupChange) =>
    patchReceiveGroupChange(patchGroupChange)
  );
};


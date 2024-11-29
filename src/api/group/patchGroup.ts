import { authAxios as axios } from '../authAxios';
import { PatchGroupParams } from './types/Group';

export const patchGroup = async ({ groupId, groupName }: PatchGroupParams) => {
  const response = await axios.patch(`/api/group/name`, {
    groupId,
    groupName,
  });
  return response.data;
};

import { authAxios as axios } from '../authAxios';
import { PatchGroupParams } from './types/Group';

export const patchGroupOrder = async ({
  groupId,
  groupName,
}: PatchGroupParams) => {
  const response = await axios.patch(`/api/group/order`, {
    groupId,
    groupName,
  });
  return response.data;
};

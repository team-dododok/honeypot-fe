import axios from '../basicAxios';
import { PatchGroupParams } from './interfaces/Group';

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

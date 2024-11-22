import axios from '../basicAxios';
import { PatchGroupParams } from './interfaces/Group';

export const patchGroup = async ({ groupId, groupName }: PatchGroupParams) => {
  const response = await axios.patch(`/api/group?id=${groupId}`, {
    groupName,
  });
  return response.data;
};

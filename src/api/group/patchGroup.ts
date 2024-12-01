import { authAxios as axios } from '../authAxios';
import { GroupInfo } from './types/Group';

export const patchGroup = async ({ groupId, groupName }: GroupInfo) => {
  const response = await axios.patch(`/api/group/name`, {
    groupId,
    groupName,
  });
  return response.data;
};

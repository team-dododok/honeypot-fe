import { authAxios as axios } from '../authAxios';
import { PatchGroupChange } from './types/Group';

export const patchReceiveGroupChange = async ({
  praiseIdList,
  groupId,
}: PatchGroupChange) => {
  const response = await axios.patch(`/api/group/receive-praise/change`, {
    praiseIdList,
    groupId,
  });
  return response.data.data;
};

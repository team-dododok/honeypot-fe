import { authAxios as axios } from '../authAxios';
import { PatchGroupChange } from './types/Group';

export const patchSendGroupChange = async ({ praiseIdList, groupId }: PatchGroupChange) => {
  const response = await axios.patch(`/api/group/send-praise/change`, {
    praiseIdList,
    groupId,
  });
  return response.data.data;
};

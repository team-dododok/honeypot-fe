import { authAxios as axios } from '../authAxios';
import { GroupCheckParams, GroupCheckResponse } from './types/Group';

export const getGroupCheck = async ({
  groupName,
}: GroupCheckParams): Promise<GroupCheckResponse> => {
  const response = await axios.get(
    `/api/group/check?groupName=${groupName}`
  );
  return response.data.data;
};

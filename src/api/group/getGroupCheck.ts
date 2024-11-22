import axios from '../basicAxios';
import { GroupCheckParams, GroupCheckResponse } from './interfaces/Group';

export const getGroupCheck = async ({
  id,
  groupName,
}: GroupCheckParams): Promise<GroupCheckResponse> => {
  const response = await axios.get(
    `/api/group/check?id=${id}&groupName=${groupName}`
  );
  return response.data;
};

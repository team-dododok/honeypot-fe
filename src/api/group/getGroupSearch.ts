import { authAxios as axios } from '../authAxios';
import { GroupSearchParams, GroupSearchResponse } from './types/Group';

export const getGroupSearch = async ({
  groupName,
}: GroupSearchParams): Promise<GroupSearchResponse> => {
  const response = await axios.get(
    `/api/group/search?groupName=${groupName}`
  );
  return response.data.data;
};

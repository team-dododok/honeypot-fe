import { authAxios as axios } from '../authAxios';
import { GroupDetailResponse } from './types/Group';

export const getGroupDetail = async (groupId: number): Promise<GroupDetailResponse> => {
  const response = await axios.get(`/api/group/info?groupId=${groupId}`);
  return response.data.data;
};

import { authAxios as axios } from '../authAxios';
import { GroupResponse } from './types/Group';

export const getGroup = async (): Promise<GroupResponse> => {
  const response = await axios.get(`/api/group`);
  return response.data;
};

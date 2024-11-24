import { authAxios as axios } from '../authAxios';
import { PostGroupParams } from './types/Group';

export const postGroup = async ({ groupName }: PostGroupParams) => {
  const response = await axios.post(`/api/group`, {
    groupName,
  });
  return response.data;
};

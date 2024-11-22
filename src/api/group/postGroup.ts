import axios from '../basicAxios';
import { PostGroupParams } from './interfaces/Group';

export const postGroup = async ({ groupName }: PostGroupParams) => {
  const response = await axios.post(`/api/group`, {
    groupName,
  });
  return response.data;
};

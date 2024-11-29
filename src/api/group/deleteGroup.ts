import { authAxios as axios } from '../authAxios';

export const deleteGroup = async (groupId: string) => {
  const response = await axios.delete(`/api/group/${groupId}`);
  return response.data;
};

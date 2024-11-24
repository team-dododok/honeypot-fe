import { authAxios as axios } from '../authAxios';
import { DeleteGroupParams } from './types/Group';

export const deleteGroup = async (groupId: DeleteGroupParams) => {
  const response = await axios.delete(`/api/group/${groupId}`);
  return response.data;
};

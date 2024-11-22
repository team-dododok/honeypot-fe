import axios from '../basicAxios';
import { DeleteGroupParams } from './interfaces/Group';

export const deleteGroup = async (groupId: DeleteGroupParams) => {
  const response = await axios.delete(`/api/group/${groupId}`);
  return response.data;
};

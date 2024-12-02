import { authAxios as axios } from '../authAxios';
import { GroupMemberResponse } from './types/Group';

export const getGroupMember = async (
  groupId: number[]
): Promise<GroupMemberResponse> => {
  const params = new URLSearchParams();
  groupId.forEach((id) => params.append('groupId', id.toString()));

  const response = await axios.get(`/api/group/members?${params.toString()}`);
  return response.data.data;
};

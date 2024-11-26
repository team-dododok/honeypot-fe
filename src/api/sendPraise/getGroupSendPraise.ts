import { authAxios as axios } from '../authAxios';
import { GroupSendPraiseInfo, GroupSendPraiseParams } from './types/SendPraise';

export const getGroupReceivedPraise = async ({
  groupId,
  size,
  page,
}: GroupSendPraiseParams): Promise<GroupSendPraiseInfo[]> => {
  const response = await axios.get(
    `/api/send-praise/group?&groupId=${groupId}&size=${size}&page=${page}`
  );
  return response.data;
};

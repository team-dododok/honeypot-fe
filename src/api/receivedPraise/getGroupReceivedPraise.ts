import axios from '../basicAxios';
import {
  GroupReceivedPraiseParams,
  GroupReceivePraiseInfo,
} from './interfaces/ReceivedPraise';

export const getGroupReceivedPraise = async ({
  id,
  groupId,
  size,
  page,
}: GroupReceivedPraiseParams): Promise<GroupReceivePraiseInfo[]> => {
  const response = await axios.get(
    `/api/receive-praise/group?id=${id}&groupId=${groupId}&size=${size}&page=${page}`
  );
  return response.data;
};

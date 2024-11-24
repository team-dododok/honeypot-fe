import { authAxios as axios } from '../authAxios';
import {
  GroupReceivedPraiseParams,
  GroupReceivePraiseInfo,
} from './types/ReceivedPraise';

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

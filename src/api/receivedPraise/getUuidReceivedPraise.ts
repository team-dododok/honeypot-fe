import axios from '../authAxios';
import {
  UuidReceivedPraiseParams,
  UuidReceivePraiseInfo,
} from './types/ReceivedPraise';

export const getUuidReceivedPraise = async ({
  uuid,
}: UuidReceivedPraiseParams): Promise<UuidReceivePraiseInfo> => {
  const response = await axios.get(`/api/receive-praise/uuid=${uuid}`);
  return response.data;
};

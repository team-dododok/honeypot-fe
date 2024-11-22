import axios from '../basicAxios';
import {
  UuidReceivedPraiseParams,
  UuidReceivePraiseInfo,
} from './interfaces/ReceivedPraise';

export const getUuidReceivedPraise = async ({
  uuid,
}: UuidReceivedPraiseParams): Promise<UuidReceivePraiseInfo> => {
  const response = await axios.get(`/api/receive-praise/uuid=${uuid}`);
  return response.data;
};

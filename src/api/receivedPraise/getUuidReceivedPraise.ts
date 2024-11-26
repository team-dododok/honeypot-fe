import { authAxios } from '../authAxios';
import { getAccessToken } from '@/utils/storage';
import {
  UuidReceivedPraiseParams,
  UuidReceivePraiseInfo,
} from './types/ReceivedPraise';
import basicAxios from '../basicAxios';

export const getUuidReceivedPraise = async ({
  uuid,
}: UuidReceivedPraiseParams): Promise<UuidReceivePraiseInfo> => {
  const accessToken = getAccessToken();
  const axiosInstance = accessToken ? authAxios : basicAxios;

  const response = await axiosInstance.get(`/api/receive-praise?uuid=${uuid}`);
  return response.data.data;
};

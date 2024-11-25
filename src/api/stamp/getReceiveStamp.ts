import { authAxios } from "../authAxios";
import { StampInfoByGroupDtos } from "./types/Stamp";

export const getReceiveStamp = async (groupId: number): Promise<StampInfoByGroupDtos> => {
  const response = await authAxios.get(`/api/stamp/received?group=${groupId}`);
  return response.data;
};

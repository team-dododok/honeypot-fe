import { authAxios } from "../authAxios";
import { StampInfoByGroupDtos } from "./types/Stamp";

export const getSendStamp = async (groupId: number): Promise<StampInfoByGroupDtos> => {
  const response = await authAxios.get(`/api/stamp/sent?group=${groupId}`);
  return response.data;
};

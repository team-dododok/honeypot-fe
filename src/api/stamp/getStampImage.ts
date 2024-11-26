import basicAxios from "../basicAxios";
import { StampDtos } from "./types/Stamp";

export const getStampImage = async (): Promise<StampDtos> => {
  const response = await basicAxios.get(`/api/stamp`);
  return response.data.data;
};

type StampDto = {
  id: number;
  imageUrl: string;
  stampName: string;
};

export type StampDtos = {
  stampDtos: StampDto[];
};

type StampInfoByGroupDto = {
  imageUrl: string;
  stampName: string;
  count: number;
  totalCount: number;
};

export type StampInfoByGroupDtos = {
    stampInfoByGroupDtos: StampInfoByGroupDto[];
};
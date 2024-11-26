export type PostReceivedPraise = {
  praiseUuid: string;
};

export type GroupReceivedPraiseParams = {
  id: number;
  groupId: number;
  size: number;
  page: number;
};

export type receivePraiseInfo = {
  receivedPariseId: number;
  name: string;
  content: string;
  stampUrl: string;
  receivedDate: string;
};

export type pageInfo = {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type GroupReceivePraiseInfo = {
  receivePraiseInfos: receivePraiseInfo[];
  pageInfo: pageInfo;
};

export type UuidReceivedPraiseParams = {
  uuid: string;
};

export type UuidReceivePraiseInfo = {
  content: string;
  senderName: string;
  receiverName: string;
  groupName: string;
  groupId: number;
  imageUrl: string;
};

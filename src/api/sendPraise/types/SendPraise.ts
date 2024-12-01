export type PostSendPraise = {
  content: string;
  projectStatus: boolean;
  receiverName: string;
  groupId: number;
  honeyStampId: number;
};

export type GroupSendPraiseParams = {
  groupId: number;
  size: number;
  page: number;
};

export type sendPraiseInfo = {
  sendPraiseId: number;
  name: string;
  content: string;
  stampUrl: string;
  profileImageUrl: string;
  sendDate: string;
};

export type pageInfo = {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type GroupSendPraiseInfo = {
  sendPraiseInfos: sendPraiseInfo[];
  pageInfo: pageInfo;
};
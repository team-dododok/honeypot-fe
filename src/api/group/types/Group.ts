export type PostGroupParams = {
  groupName: string;
};

export type DeleteGroupParams = {
  groupId: number;
};

export type GroupCheckParams = {
  groupName: string;
};

export type GroupCheckResponse = {
  isDuplicate: boolean;
};

export type GroupOrder = {
  groupId: number;
  orderIdx: number;
};

export type PatchGroupOrder = {
  groupOrderList: GroupOrder[];
};

export type GroupSearchParams = {
  groupName: string;
};

type GroupMember = {
  id: number;
};

export type GroupWithMembersInfo = {
  groupId: number;
  groupName: string;
  orderIdx: number;
  receiveCount: number;
  sendCount: number;
  groupMembers: GroupMember[];
};

export type GroupResponse = {
  groupWithMembersInfos: GroupWithMembersInfo[];
};

export type GroupDetailResponse = {
  groupId: number;
  groupName: string;
  praiseCount: number;
};

type GroupInfo = {
  groupId: number;
  groupName: string;
};

export type GroupSearchResponse = {
  groupInfos: GroupInfo[];
};

export type PatchGroupChange = {
  praiseIdList: number[];
  groupId: number;
};
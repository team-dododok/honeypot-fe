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

export type PatchGroupOrder = {
  groupOrderList: Array<{
    groupId: number;
    orderIdx: number;
  }>;
};

export type GroupSearchParams = {
  groupName: string;
};

type GroupMember = {
  name: string;
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

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

export type PatchGroupParams = {
  groupId: number;
  groupName: string;
};

export type GroupSearchParams = {
  groupName: string;
}

type GroupMember = {
  id: number;
};

type GroupWithMembersInfo = {
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


type GroupInfo = {
  groupId: number;
  groupName: string;
}

export type GroupSearchResponse = {
  groupInfos: GroupInfo[];
};
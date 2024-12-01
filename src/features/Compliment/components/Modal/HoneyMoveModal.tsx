import ProcessModal from '@/components/Modal/ProcessModal';
import GroupListBox from '@/features/Group/components/GroupListBox';
import { useGroupSearch } from '@/hooks/group/useGroupSearch';
import styled from '@emotion/styled';
import React from 'react';

interface HoneyMoveModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (selectedGroup: number | null) => void;
  selectedGroup: number | null;
  setSelectedGroup: React.Dispatch<React.SetStateAction<number | null>>;
  groupId: number;
}

const HoneyMoveModal = (props: HoneyMoveModalProps) => {
  const {
    isVisible,
    onClose,
    onConfirm,
    selectedGroup,
    setSelectedGroup,
    groupId,
  } = props;

  const { data: groupData } = useGroupSearch('');
  const groupList = groupData?.groupInfos || [];

  const handleSelectGroup = (groupId: number) => {
    if (selectedGroup === groupId) {
      setSelectedGroup(null);
    } else {
      setSelectedGroup(groupId);
    }
  };

  return (
    <ProcessModal
      height="400px"
      title="다른 그룹으로 꿀 옮기기"
      description="옮기고 싶은 그룹을 선택해주세요."
      confirmText="다음"
      onCancel={onClose}
      onConfirm={() => onConfirm(selectedGroup)}
      confirmDisabled={selectedGroup === null}
      isVisible={isVisible}
    >
      <GroupList>
        {groupList?.map((group) => (
          <GroupListBox
            key={group.groupId}
            id={group.groupId}
            currentId={groupId}
            groupName={group.groupName}
            selected={group.groupId === selectedGroup}
            onClick={() => handleSelectGroup(group.groupId)}
          />
        ))}
      </GroupList>
    </ProcessModal>
  );
};

export default HoneyMoveModal;

const GroupList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: scroll;
`;

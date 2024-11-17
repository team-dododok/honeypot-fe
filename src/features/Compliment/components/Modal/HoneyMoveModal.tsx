import ProcessModal from '@/components/Modal/ProcessModal';
import GroupListBox from '@/features/Group/components/GroupListBox';
import { GROUP_LIST_DUMMY } from '@/features/Group/constant/dummy/groupList';
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
      description="옮기고 싶은 그룹을 선택해 주세요."
      confirmText="다음"
      onCancel={onClose}
      onConfirm={() => onConfirm(selectedGroup)}
      confirmDisabled={selectedGroup === null}
      isVisible={isVisible}
    >
      {GROUP_LIST_DUMMY.map((group) => (
        <GroupListBox
          key={group.id}
          id={group.id}
          currentId={groupId}
          groupName={group.groupName}
          selected={group.id === selectedGroup}
          onClick={() => handleSelectGroup(group.id)}
        />
      ))}
    </ProcessModal>
  );
};

export default HoneyMoveModal;

import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import BottomModal from '@/components/Modal/BottomModal';
import GroupListBox from '@/features/Group/components/GroupListBox';
import { GROUP_LIST_DUMMY } from '@/features/Group/constant/dummy/groupList';

interface GroupModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (selectedGroup: number | null) => void;
  selectedGroup: number | null;
  setSelectedGroup: React.Dispatch<React.SetStateAction<number | null>>;
}

const GroupModal: React.FC<GroupModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  selectedGroup,
  setSelectedGroup,
}) => {
  const [groupName, setGroupName] = useState<string>('');

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleSelectGroup = (groupId: number) => {
    if (selectedGroup === groupId) {
      setSelectedGroup(null);
    } else {
      setSelectedGroup(groupId);
    }
  };

  return (
    <BottomModal
      height="516px"
      title="그룹 추가 및 선택"
      onCancel={onClose}
      onConfirm={() => onConfirm(selectedGroup)}
      confirmDisabled={selectedGroup === null}
      isVisible={isVisible}
    >
      <Input
        width="100%"
        placeholder="추가할 그룹명을 입력해 주세요."
        clear={true}
        value={groupName}
        onChange={handleGroupChange}
      />
      {GROUP_LIST_DUMMY.map((group) => (
        <GroupListBox
          key={group.id}
          id={group.id}
          groupName={group.groupName}
          selected={group.id === selectedGroup}
          onClick={() => handleSelectGroup(group.id)}
        />
      ))}
    </BottomModal>
  );
};

export default GroupModal;

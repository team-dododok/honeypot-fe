import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import BottomModal from '@/components/Modal/BottomModal';
import GroupListBox from '@/features/Group/components/GroupListBox';
import { GROUP_LIST_DUMMY } from '@/features/Group/constant/dummy/groupList';
import styled from '@emotion/styled';

interface GroupModalProps {
  isVisible: boolean;
  placeholder?: string;
  onClose: () => void;
  onConfirm: (selectedGroup: number | null) => void;
  selectedGroup: number | null;
  setSelectedGroup: React.Dispatch<React.SetStateAction<number | null>>;
}

const GroupModal: React.FC<GroupModalProps> = ({
  isVisible,
  placeholder,
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

  const handleAddGroup = () => {
    // 그룹 생성 API
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
        placeholder={
          placeholder ? placeholder : '추가할 그룹명을 입력해 주세요.'
        }
        clear={true}
        value={groupName}
        onChange={handleGroupChange}
      />
      <GroupList>
        {groupName.length > 0 && (
          <GroupListBox
            id={-1}
            groupName={`'${groupName}' 그룹 추가하기`}
            currentId={0}
            selected={0 === selectedGroup}
            onClick={handleAddGroup}
          />
        )}
        {GROUP_LIST_DUMMY.map((group) => (
          <GroupListBox
            key={group.id}
            id={group.id}
            groupName={group.groupName}
            currentId={0}
            selected={group.id === selectedGroup}
            onClick={() => handleSelectGroup(group.id)}
          />
        ))}
      </GroupList>
    </BottomModal>
  );
};

export default GroupModal;

const GroupList = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 10px;
  overflow-y: scroll;
`;

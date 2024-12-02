import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import BottomModal from '@/components/Modal/BottomModal';
import GroupListBox from '@/features/Group/components/GroupListBox';
import styled from '@emotion/styled';
import { usePostGroup } from '@/hooks/group/usePostGroup';
import { useGroupSearch } from '@/hooks/group/useGroupSearch';
import { css } from '@emotion/react';

interface GroupModalProps {
  isVisible: boolean;
  placeholder?: string;
  onClose: () => void;
  onConfirm: (groupName: string, groupId: number) => void;
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
  const [localGroupName, setLocalGroupName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { data: groupData, refetch } = useGroupSearch(localGroupName);
  const { mutate: addGroup } = usePostGroup();

  const groupList = groupData?.groupInfos || [];

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 15) {
      setLocalGroupName(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg('15자 이내로 입력해주세요.');
    }
  };

  const handleSelectGroup = (groupId: number) => {
    setSelectedGroup(groupId);
  };

  const handleAddGroup = () => {
    if (localGroupName.trim() === '') return;

    addGroup(
      { groupName: localGroupName },
      {
        onSuccess: (data) => {
          refetch();
          setSelectedGroup(data.groupId);
          setLocalGroupName('');
        },
      }
    );
  };

  const handleConfirm = () => {
    const selected = groupList.find((group) => group.groupId === selectedGroup);
    if (selected) {
      onConfirm(selected.groupName, selected.groupId);
    }
  };

  return (
    <BottomModal
      height="516px"
      title="그룹 추가 및 선택"
      bongbong={true}
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmDisabled={selectedGroup === null}
      isVisible={isVisible}
    >
      <Input
        width="100%"
        placeholder={
          placeholder ? placeholder : '추가할 그룹명을 입력해주세요.'
        }
        clear={true}
        value={localGroupName}
        onChange={handleGroupChange}
        errorMsg={errorMsg}
      />
      <GroupList $errorMsg={errorMsg.length > 0}>
        {localGroupName.length > 0 &&
          errorMsg === '' &&
          groupList.every((group) => group.groupName !== localGroupName) && (
            <GroupListBox
              id={-1}
              groupName={`'${localGroupName}' 그룹 추가하기`}
              currentId={0}
              selected={0 === selectedGroup}
              onClick={handleAddGroup}
            />
          )}
        {groupList?.map((group) => (
          <GroupListBox
            key={group.groupId}
            id={group.groupId}
            groupName={group.groupName}
            currentId={0}
            selected={group.groupId === selectedGroup}
            onClick={() => handleSelectGroup(group.groupId)}
          />
        ))}
      </GroupList>
    </BottomModal>
  );
};

export default GroupModal;

const GroupList = styled.div<{ $errorMsg: boolean }>`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 10px;
  overflow-y: scroll;

  ${({ $errorMsg }) =>
    $errorMsg &&
    css`
      margin-top: 40px;
    `}
`;

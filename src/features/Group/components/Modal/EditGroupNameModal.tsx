import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import BottomModal from '@/components/Modal/BottomModal';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

interface EditGroupNameModalProps {
  isVisible: boolean;
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onConfirm: () => void;
}

const EditGroupNameModal: React.FC<EditGroupNameModalProps> = ({
  isVisible,
  groupName,
  setGroupName,
  onClose,
  onConfirm,
}) => {
  const [editGroupName, setEditGroupName] = useState(groupName);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 그룹명 중복 API로 체크
    //   setErrorMsg('이미 존재하는 그룹이에요');
    if (e.target.value.length <= 15) {
      setEditGroupName(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg('15자 이내로 입력해 주세요.');
    }
  };

  const handleCancelEdit = () => {
    setEditGroupName(groupName);
    onClose();
  };

  const handleSaveGroupName = () => {
    setGroupName(editGroupName);
    onConfirm();
  };

  const handleDeleteClick = () => {};

  return (
    <BottomModal
      height="516px"
      title="그룹명 변경"
      confirmText="저장"
      onCancel={handleCancelEdit}
      onConfirm={handleSaveGroupName}
      confirmDisabled={editGroupName.length === 0}
      isVisible={isVisible}
    >
      <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
      <Input
        width="100%"
        placeholder="새 그룹명을 입력해 주세요."
        clear={true}
        value={editGroupName}
        onChange={handleGroupChange}
        errorMsg={errorMsg}
      />
    </BottomModal>
  );
};

export default EditGroupNameModal;

const DeleteButton = styled.button`
  height: 32px;
  color: ${theme.colors.error60};
  ${theme.typography.body3};
  position: absolute;
  top: 32px;
  right: 26px;
`;

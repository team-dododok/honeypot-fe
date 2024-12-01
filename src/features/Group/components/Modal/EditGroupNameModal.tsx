import React, { useEffect, useState } from 'react';
import Input from '@/components/Input/Input';
import BottomModal from '@/components/Modal/BottomModal';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import WarningModal from '@/components/Modal/WarningModal';
import { useToast } from '@/store/useToast';
import { useNavigate } from 'react-router-dom';
import { useGroupCheck } from '@/hooks/group/useGroupCheck';

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
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [editGroupName, setEditGroupName] = useState(groupName);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showGroupDeleteModal, setShowGroupDeleteModal] =
    useState<boolean>(false);

  useEffect(() => {
    console.log(editGroupName);
  }, [editGroupName]);

  const {
    data: groupCheckResponse,
    refetch: checkGroupName,
    isFetching,
  } = useGroupCheck({
    groupName: editGroupName,
  });

  useEffect(() => {
    if (editGroupName.trim() !== '') {
      checkGroupName();
    }
  }, [editGroupName, checkGroupName]);

  useEffect(() => {
    if (!isFetching && groupCheckResponse?.isDuplicate) {
      setErrorMsg('이미 존재하는 그룹이에요');
    } else {
      setErrorMsg('');
    }
  }, [groupCheckResponse, isFetching]);

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGroupName = e.target.value;
    if (newGroupName.length <= 15) {
      setEditGroupName(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg('15자 이내로 입력해주세요.');
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

  const handleShowDeleteModal = () => {
    setShowGroupDeleteModal(true);
  };

  const handleDelteGroup = () => {
    // 그룹 삭제 API
    setShowGroupDeleteModal(false);
    showToast('그룹을 삭제했어요');
    navigate('/');
  };

  return (
    <>
      {!showGroupDeleteModal && (
        <BottomModal
          height="516px"
          title="그룹명 변경"
          confirmText="저장"
          onCancel={handleCancelEdit}
          onConfirm={handleSaveGroupName}
          confirmDisabled={editGroupName.length === 0}
          isVisible={isVisible}
        >
          <DeleteButton onClick={handleShowDeleteModal}>삭제</DeleteButton>
          <Input
            width="100%"
            placeholder="새 그룹명을 입력해주세요."
            clear={true}
            value={editGroupName}
            onChange={handleGroupChange}
            errorMsg={errorMsg}
          />
        </BottomModal>
      )}
      {showGroupDeleteModal && (
        <WarningModal
          title={`정말 'A그룹'을\n삭제하시겠어요?`}
          description={`받은 꿀, 보낸 꿀도 모두 함께 삭제되며,\n복구할 수 없어요.`}
          image={true}
          cancelText="취소"
          confirmText="확인"
          onCancel={() => {
            setShowGroupDeleteModal(false);
          }}
          onConfirm={handleDelteGroup}
        />
      )}
    </>
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

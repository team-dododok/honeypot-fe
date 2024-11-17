import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import BottomModal from '@/components/Modal/BottomModal';
import { useToast } from '@/store/useToast';

interface CreateGroupModalProps {
  isVisible: boolean;
  Group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onConfirm: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isVisible,
  Group,
  setGroup,
  onClose,
  onConfirm,
}) => {
  const { showToast } = useToast();
  const [CreateGroup, setCreateGroup] = useState(Group);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 그룹명 중복 API로 체크
    if (e.target.value.length <= 15) {
      setCreateGroup(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg('15자 이내로 입력해 주세요.');
    }
  };

  const handleCancelCreate = () => {
    setCreateGroup(Group);
    onClose();
  };

  const handleSaveGroup = () => {
    setGroup(CreateGroup);
    onConfirm();
    showToast('새 그룹을 생성했어요');
  };

  return (
    <>
      <BottomModal
        height="516px"
        title="새 그룹 생성"
        confirmText="저장"
        onCancel={handleCancelCreate}
        onConfirm={handleSaveGroup}
        confirmDisabled={CreateGroup.length === 0}
        isVisible={isVisible}
      >
        <Input
          width="100%"
          placeholder="추가할 그룹명을 입력해주세요"
          clear={true}
          value={CreateGroup}
          onChange={handleGroupChange}
          errorMsg={errorMsg}
        />
      </BottomModal>
    </>
  );
};

export default CreateGroupModal;

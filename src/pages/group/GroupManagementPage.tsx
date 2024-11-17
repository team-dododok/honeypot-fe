import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import DraggableButton from '@/components/Button/DraggableButton';
import CreateGroupModal from '@/features/Group/components/Modal/CreateGroupModal';
import WarningModal from '@/components/Modal/WarningModal';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useToast } from '@/store/useToast';

const GroupManagementPage: React.FC = () => {
  const { showToast } = useToast();
  const [hasGroup, setHasGroup] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupItems, setGroupItems] = useState([
    { id: 1, name: 'A그룹A그룹A그룹' },
    { id: 2, name: 'B그룹B그룹B그룹' },
    { id: 3, name: 'C그룹C그룹C그룹' },
    { id: 4, name: 'D그룹D그룹D그룹' },
  ]);
  const [showGroupDeleteModal, setShowGroupDeleteModal] =
    useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const moveGroup = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = groupItems[dragIndex];
    const updatedItems = [...groupItems];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setGroupItems(updatedItems);
  };

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const handleConfirmModal = () => {
    if (groupName) {
      setGroupItems((prev) => [
        ...prev,
        { id: groupItems.length + 1, name: groupName },
      ]);
      setGroupName('');
    }
    setIsVisible(false);
  };

  const handleDeleteGroup = () => {
    if (deleteTargetId !== null) {
      setGroupItems((prev) =>
        prev.filter((group) => group.id !== deleteTargetId)
      );
      setDeleteTargetId(null);
    }
    setShowGroupDeleteModal(false);
    showToast('그룹을 삭제했어요');
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeleteTargetId(id);
    setShowGroupDeleteModal(true);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {hasGroup ? (
          <FullContainer>
            <Button text="새 그룹 생성하기" onClick={toggleModal} />
            <GroupList>
              {groupItems.map((item, index) => (
                <DraggableButton
                  key={item.id}
                  index={index}
                  id={item.id}
                  text={item.name}
                  moveGroup={moveGroup}
                  onTrashClick={() => handleOpenDeleteModal(item.id)}
                />
              ))}
            </GroupList>
          </FullContainer>
        ) : (
          <BlankContainer>
            <img src="/assets/images/group/img-nonestamp.svg" alt="nonestamp" />
            <Text>
              <p>아직 그룹이 없어요.</p>
              <p>새 그룹을 생성해 볼까요?</p>
            </Text>
            <Button text="새 그룹 생성하기" onClick={toggleModal} />
          </BlankContainer>
        )}
      </DndProvider>
      <CreateGroupModal
        isVisible={isVisible}
        Group={groupName}
        setGroup={setGroupName}
        onClose={toggleModal}
        onConfirm={handleConfirmModal}
      />
      {showGroupDeleteModal && (
        <WarningModal
          title={`정말 '${groupItems.find((g) => g.id === deleteTargetId)?.name}'을\n삭제하시겠어요?`}
          description={`받은 꿀, 보낸 꿀도 모두 함께 삭제되며,\n복구할 수 없어요.`}
          image={true}
          cancelText="취소"
          confirmText="확인"
          onCancel={() => setShowGroupDeleteModal(false)}
          onConfirm={handleDeleteGroup}
        />
      )}
    </>
  );
};

export default GroupManagementPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FullContainer = styled(Container)`
  gap: 16px;
  height: 100%;
`;

const BlankContainer = styled(Container)`
  justify-content: center;
  gap: 24px;
  height: calc(100% - 164px);
`;

const Text = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
  text-align: center;
`;

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

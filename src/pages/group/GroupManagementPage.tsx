import React, { useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import DraggableButton from '@/components/Button/DraggableButton';
import CreateGroupModal from '@/features/Group/components/Modal/CreateGroupModal';
import WarningModal from '@/components/Modal/WarningModal';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGroup } from '@/hooks/group/useGroup';
import { usePatchGroupOrder } from '@/hooks/group/usePatchGroupOrder';
import { useDeleteGroup } from '@/hooks/group/useDeleteGroup';

const GroupManagementPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [showGroupDeleteModal, setShowGroupDeleteModal] =
    useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { data: groupData } = useGroup();

  const [groupItems, setGroupItems] = useState<
    { groupId: number; groupName: string }[]
  >([]);

  useEffect(() => {
    if (groupData?.groupWithMembersInfos) {
      setGroupItems(
        groupData.groupWithMembersInfos.map((group) => ({
          groupId: group.groupId,
          groupName: group.groupName,
        }))
      );
    }
  }, [groupData]);

  const { mutate: updateGroupOrder } = usePatchGroupOrder();
  const { mutate: groupDelete } = useDeleteGroup();

  const moveGroup = (dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...groupItems];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setGroupItems(updatedItems);

    updateGroupOrder({
      groupId: draggedItem.groupId,
      groupName: draggedItem.groupName,
    });
  };

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const handleConfirmModal = () => {
    if (groupName) {
      setGroupName('');
    }
    setIsVisible(false);
  };

  const handleDeleteGroup = () => {
    if (deleteTargetId !== null) {
      setDeleteTargetId(null);
      setShowGroupDeleteModal(false);
      groupDelete(deleteTargetId.toString());
    }
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeleteTargetId(id);
    setShowGroupDeleteModal(true);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {groupItems.length > 0 ? (
          <FullContainer>
            <Button text="새 그룹 생성하기" onClick={toggleModal} />
            <GroupList>
              {groupItems.map((item, index) => (
                <DraggableButton
                  key={item.groupId}
                  index={index}
                  id={item.groupId}
                  text={item.groupName}
                  moveGroup={moveGroup}
                  onTrashClick={() => handleOpenDeleteModal(item.groupId)}
                />
              ))}
            </GroupList>
          </FullContainer>
        ) : (
          <BlankContainer>
            <img src="/assets/images/group/none-stamp.svg" alt="nonestamp" />
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
          title={`정말 ${groupItems.find((g) => g.groupId === deleteTargetId)?.groupName} 그룹을\n 삭제하시겠어요?
        `}
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

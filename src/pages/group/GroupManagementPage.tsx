import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import DraggableButton from '@/components/Button/DraggableButton';
import CreateGroupModal from '@/features/Group/components/Modal/CreateGroupModal';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const GroupManagementPage: React.FC = () => {
  const [hasGroup, setHasGroup] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  // TODO: groupList API 연동
  const [groupItems, setGroupItems] = useState([
    { id: 1, name: 'A그룹A그룹A그룹' },
    { id: 2, name: 'B그룹B그룹B그룹' },
    { id: 3, name: 'C그룹C그룹C그룹' },
    { id: 4, name: 'D그룹D그룹D그룹' },
  ]);

  const moveGroup = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = groupItems[dragIndex];
    const updatedItems = [...groupItems];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setGroupItems(updatedItems);
  };

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
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

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {hasGroup ? (
          <FullContainer>
            <Button text="새 그룹 생성하기" onClick={handleOpenModal} />
            <GroupList>
              {groupItems.map((item, index) => (
                <DraggableButton
                  key={item.id}
                  index={index}
                  id={item.id}
                  text={item.name}
                  moveGroup={moveGroup}
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
            <Button text="새 그룹 생성하기" onClick={handleOpenModal} />
          </BlankContainer>
        )}
      </DndProvider>
      <CreateGroupModal
        isVisible={isVisible}
        Group={groupName}
        setGroup={setGroupName}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
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

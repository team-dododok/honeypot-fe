import ArrowButton from '@/components/Button/ArrowButton';
import Button from '@/components/Button/Button';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type GroupItem = {
  id: number;
  name: string;
};

type DraggableGroupItemProps = {
  id: number;
  text: string;
  index: number;
  moveGroup: (dragIndex: number, hoverIndex: number) => void;
};

const GroupManagementPage: React.FC = () => {
  const [hasGroup, setHasGroup] = useState<boolean>(true);
  const [groupItems, setGroupItems] = useState<GroupItem[]>([
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

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {hasGroup ? (
          <GroupList>
            <Button text="새 그룹 생성하기" />
            {groupItems.map((item, index) => (
              <DraggableGroupItem
                key={item.id}
                index={index}
                id={item.id}
                text={item.name}
                moveGroup={moveGroup}
              />
            ))}
          </GroupList>
        ) : (
          <>
            <img src="/assets/images/group/img-nonestamp.svg" alt="nonestamp" />
            <Text>
              <p>아직 그룹이 없어요.</p>
              <p>새 그룹을 생성해 볼까요?</p>
            </Text>
            <Button text="새 그룹 생성하기" />
          </>
        )}
      </Container>
    </DndProvider>
  );
};

export default GroupManagementPage;

const DraggableGroupItem: React.FC<DraggableGroupItemProps> = ({
  id,
  text,
  index,
  moveGroup,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop({
    accept: 'groupItem',
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveGroup(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'groupItem',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <ButtonBox ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src="/assets/icons/ic-move-20.svg" alt="move" />
      <img src="/assets/icons/icon-trash.svg" alt="trash" />
      <ArrowButton text={text} direction="right" onClick={() => {}} />
    </ButtonBox>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
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
  gap: 16px;
  width: 100%;
  text-align: center;

  h2 {
    color: ${theme.colors.primary};
    ${theme.typography.h4};
  }

  p {
    color: ${theme.colors.gray60};
    ${theme.typography.body1};
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  background-color: ${theme.colors.white};
`;

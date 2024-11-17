import styled from '@emotion/styled';
import ArrowButton from './ArrowButton';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { theme } from '@/styles/theme';

interface DraggableButtonProps {
  id: number;
  text: string;
  index: number;
  moveGroup: (dragIndex: number, hoverIndex: number) => void;
  onTrashClick: () => void;
}

const DraggableButton: React.FC<DraggableButtonProps> = ({
  id,
  text,
  index,
  moveGroup,
  onTrashClick,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

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
    <ButtonBox style={{ opacity: isDragging ? 0.5 : 1 }}>
      <MoveIconWrapper ref={ref}>
        <img src="/assets/icons/ic-move-20.svg" alt="move" />
      </MoveIconWrapper>
      <img
        src="/assets/icons/icon-trash.svg"
        alt="trash"
        onClick={onTrashClick}
      />
      <ArrowButton text={text} direction="right" onClick={() => {}} />
    </ButtonBox>
  );
};

export default DraggableButton;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: ${theme.colors.white};
  cursor: pointer;
`;

const MoveIconWrapper = styled.div`
  cursor: grab;
`;

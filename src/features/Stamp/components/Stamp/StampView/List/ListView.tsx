import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import StampList, { NameType } from '../../StampList';
import { useLocation } from 'react-router-dom';

interface ListViewProps {
  letters: HoneyLetter[];
  isSelectMode: boolean;
  onSelectedChange: (count: number) => void;
}

const ListView = (props: ListViewProps) => {
  const { letters, isSelectMode, onSelectedChange } = props;

  const location = useLocation();

  const [nameType, setNameType] = useState<NameType>('sender');
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'receive') {
      setNameType('receiver');
    } else if (tab === 'send') {
      setNameType('sender');
    }
  }, [location.search]);

  useEffect(() => {
    if (!isSelectMode) {
      setSelected([]);
    }
  }, [isSelectMode]);

  const handleCheckStampList = (id: number) => {
    const updatedSelected = selected.includes(id)
      ? selected.filter((selectedId) => selectedId !== id)
      : [...selected, id];

    setSelected(updatedSelected);

    // disabled 처리를 위해 선택된 도장 길이 전달
    onSelectedChange(updatedSelected?.length);
  };

  return (
    <ListViewContainer>
      {letters.map((letter) => (
        <StampList
          key={letter.id}
          profileImg=""
          nameType={nameType}
          name={letter[nameType]}
          content={letter.content}
          imgUrl=""
          date={letter.date}
          selected={selected.includes(letter.id)}
          readOnly={!isSelectMode}
          onClick={() => handleCheckStampList(letter.id)}
        />
      ))}
    </ListViewContainer>
  );
};

export default ListView;

const ListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

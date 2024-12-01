import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import StampList, { NameType } from '../../StampList';
import { useLocation } from 'react-router-dom';

interface ListViewProps {
  letters: HoneyLetter[];
  isSelectMode: boolean;
  selectedIds: number[];
  onSelectedChange: (selectedIds: number[]) => void;
}

const ListView = (props: ListViewProps) => {
  const { letters, isSelectMode, selectedIds, onSelectedChange } = props;

  const location = useLocation();

  const [nameType, setNameType] = useState<NameType>('sender');

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
      onSelectedChange([]);
    }
  }, [isSelectMode, onSelectedChange]);

  const handleCheckHoneyStamp = (id: number) => {
    const updatedSelected = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    onSelectedChange(updatedSelected);
  };

  return (
    <ListViewContainer>
      {letters.map((letter) => (
        <StampList
          key={letter.id}
          id={letter.id}
          profileImg={letter.profileImageUrl}
          nameType={nameType}
          name={letter[nameType]}
          content={letter.content}
          imgUrl={letter.stampUrl}
          date={letter.date}
          selected={selectedIds.includes(letter.id)}
          readOnly={!isSelectMode}
          onClick={() => handleCheckHoneyStamp(letter.id)}
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

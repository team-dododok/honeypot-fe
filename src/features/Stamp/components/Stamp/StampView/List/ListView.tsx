import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import StampList, { NameType } from '../../StampList';
import { useLocation } from 'react-router-dom';

interface ListViewProps {
  letters: HoneyLetter[];
}

const ListView = (props: ListViewProps) => {
  const { letters } = props;

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

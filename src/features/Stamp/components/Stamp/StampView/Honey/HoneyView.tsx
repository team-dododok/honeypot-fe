import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import HoneyStamp, { NameType } from '../../HoneyStamp';

interface HoneyViewProps {
  letters: HoneyLetter[];
  selectedMode: boolean;
}

const HoneyView = (props: HoneyViewProps) => {
  const { letters, selectedMode } = props;

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

  const columns = [];
  let index = 0;

  /* 각 columns에 개수 맞춰 배치 */
  while (index < letters.length) {
    /* 홀수열: 2개, 짝수열: 3개 */
    const itemsInColumn: number = columns.length % 2 === 0 ? 2 : 3;
    columns.push(letters.slice(index, index + itemsInColumn));
    index += itemsInColumn;
  }

  return (
    <HoneyViewContainer>
      {columns.map((columnLetters, index) => (
        <Column key={index} $isEven={index % 2 !== 0} $index={index}>
          {columnLetters.map((letter) => (
            <HoneyStamp
              key={letter.id}
              profileImg=""
              nameType={nameType}
              name={letter.sender}
              content={letter.content}
              imgUrl=""
              date={letter.date}
              selected={false}
              readOnly={!selectedMode}
              onClick={() => {}}
            />
          ))}
        </Column>
      ))}
    </HoneyViewContainer>
  );
};

export default HoneyView;

const HoneyViewContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
`;

const Column = styled.div<{ $isEven: boolean; $index: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: ${({ $isEven }) => ($isEven ? '0' : '68px')};
  /* 각 행이 겹쳐지게 이동 */
  /* transform: ${({ $index }) => `translateX(${-28 * $index}px)`}; */
`;

import { ToggleType } from '@/components/Toggle/DisplayToggle';
import {
  RECEIVE_HONEY,
  SEND_HONEY,
} from '@/features/Compliment/constants/dummy/honey';
import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import HoneyView from '@/features/Stamp/components/Stamp/StampView/Honey/HoneyView';
import ListView from '@/features/Stamp/components/Stamp/StampView/List/ListView';
import styled from '@emotion/styled';
import React from 'react';

interface GroupTabContainerProps {
  type: 'send' | 'receive' | null;
  displayType: ToggleType;
  selectedMode: boolean;
}

const GroupTabContainer = (props: GroupTabContainerProps) => {
  const { type, displayType, selectedMode } = props;

  let letters: HoneyLetter[] = [];
  if (type === 'send') {
    letters = SEND_HONEY;
  } else if (type === 'receive') {
    letters = RECEIVE_HONEY;
  }

  return (
    <Container>
      {displayType === 'honey' ? (
        <HoneyView letters={letters} selectedMode={selectedMode} />
      ) : (
        <ListView letters={letters} selectedMode={selectedMode} />
      )}
    </Container>
  );
};

export default GroupTabContainer;

const Container = styled.div`
  width: 100%;
  margin-top: 18px;
`;

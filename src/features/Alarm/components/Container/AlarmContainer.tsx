import styled from '@emotion/styled';
import { ALARM_LIST } from '../../constants/alarm';
import React from 'react';
import Alarm from '../Alarm';

const AlarmContainer = () => {
  return (
    <AlarmList>
      {ALARM_LIST.map((item) => (
        <Alarm key={item.id} alarm={item} />
      ))}
    </AlarmList>
  );
};

export default AlarmContainer;

const AlarmList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

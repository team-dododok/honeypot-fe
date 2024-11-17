import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { Alarm as AlarmType } from '../types/Alarm';

interface AlarmProps {
  alarm: AlarmType;
  onClick?: () => void;
}

const Alarm = ({ alarm, onClick }: AlarmProps) => {
  return (
    <AlarmContainer onClick={onClick} isRead={alarm.isRead}>
      <AlarmImg src={alarm.image} alt="alarm" />
      <AlarmContent isRead={alarm.isRead}>
        <Title isRead={alarm.isRead}>{alarm.title}</Title>
        <Content isRead={alarm.isRead}>{alarm.content}</Content>
      </AlarmContent>
      <Date isRead={alarm.isRead}>{alarm.date}</Date>
    </AlarmContainer>
  );
};

export default Alarm;

const AlarmContainer = styled.div<{ isRead: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  background: ${(props) =>
    props.isRead ? theme.colors.white : theme.colors.brand10};
  border-radius: 16px;
  transition: background 0.3s;
  cursor: pointer;
`;

const AlarmImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 16px;
`;

const AlarmContent = styled.div<{ isRead: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: calc(100% - 64px); /* Adjust for image size */
`;

const Title = styled.div<{ isRead: boolean }>`
  ${theme.typography.subtitle3};
  color: ${(props) =>
    props.isRead ? theme.colors.gray50 : theme.colors.gray80};
`;

const Content = styled.div<{ isRead: boolean }>`
  ${theme.typography.body5};
  color: ${(props) =>
    props.isRead ? theme.colors.gray50 : theme.colors.gray80};
`;

const Date = styled.span<{ isRead: boolean }>`
  position: absolute;
  top: 12px;
  right: 16px;
  ${theme.typography.body5};
  color: ${(props) =>
    props.isRead ? theme.colors.gray30 : theme.colors.gray50};
`;

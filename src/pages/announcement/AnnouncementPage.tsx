// import AlarmContainer from '@/features/Alarm/components/Container/AlarmContainer';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

const AnnouncementPage = () => {
  // TODO: 공지사항 목록 API 연동
  // const [announcementList] = useState([]);

  return (
    <>
      {/* <AlarmContainer /> */}
      <NoneAnnouncement>
        <object data="/assets/images/announcement/none-alarm.svg" />
        <Text>새로운 공지가 없어요.</Text>
      </NoneAnnouncement>
    </>
  );
};

export default AnnouncementPage;

const Text = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
  text-align: center;
`;

const NoneAnnouncement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  text-align: center;
  width: 100%;
  height: 100%;
`;

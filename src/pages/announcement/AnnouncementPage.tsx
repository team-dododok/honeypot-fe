import AlarmContainer from '@/features/Alarm/components/Container/AlarmContainer';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const AnnouncementPage = () => {
  // TODO: 공지사항 목록 API 연동
  const [announcementList, setAnnouncementList] = useState([]);

  return (
    <>
      <AlarmContainer />
      {announcementList.length === 0 && (
        <NoneAnnouncement>
          <img
            src="/assets/images/announcement/img-nonealarm.svg"
            alt="공지없음"
          />
          <Text>새로운 공지가 없어요.</Text>
        </NoneAnnouncement>
      )}
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
  gap: 24px;
  height: calc(100% - 164px);
`;

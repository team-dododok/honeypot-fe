import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

export type NameType = 'receiver' | 'sender';

interface StampListProps {
  profileImg: string;
  groupName: string;
  date: string;
  nameType: NameType;
  name: string;
}

const LetterInfo = (props: StampListProps) => {
  const { profileImg, groupName, date, nameType, name } = props;

  return (
    <LetterInfoBox>
      <ProfileImage
        src={profileImg || '/assets/images/profile/profile-1-120-varient.svg'}
        width={48}
        height={48}
        alt="프로필"
      />
      <TextBox>
        <TopElement>
          <GroupName>{groupName}</GroupName>
          <Date>{date}</Date>
        </TopElement>
        <Name>
          {nameType === 'receiver' ? 'To. ' : 'From. '} {name}
        </Name>
      </TextBox>
    </LetterInfoBox>
  );
};

export default LetterInfo;

const LetterInfoBox = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  background: ${theme.colors.gray00};
`;

const ProfileImage = styled.img`
  background: gray;
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${theme.colors.gray80};
`;

const TopElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

const GroupName = styled.div`
  ${theme.typography.body5};
`;

const Date = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.body5};
`;

const Name = styled.div`
  ${theme.typography.subtitle2};
`;

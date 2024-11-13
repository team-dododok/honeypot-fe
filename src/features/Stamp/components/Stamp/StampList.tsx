import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

export type NameType = 'receiver' | 'sender';

interface StampListProps {
  profileImg: string;
  nameType: NameType;
  name: string;
  content: string;
  imgUrl: string;
}

const StampList = (props: StampListProps) => {
  const { profileImg, nameType, name, content, imgUrl } = props;

  return (
    <StampListBox>
      <LeftElement>
        <ProfileImage
          src={profileImg || '/assets/images/profile/img-profile-1-120.svg'}
          width={48}
          height={48}
          alt="꿀도장"
        />
        <TextBox>
          <Name>
            {nameType === 'receiver' ? 'From. ' : 'To. '} {name}
          </Name>
          <Content>{content}</Content>
        </TextBox>
      </LeftElement>
      <StampImage
        src={imgUrl || '/assets/images/stamp/img-stamp-example.svg'}
        width={55}
        height={55}
        alt="꿀도장"
      />
    </StampListBox>
  );
};

export default StampList;

const StampListBox = styled.div`
  width: 100%;
  height: 80px;
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray05};
  background: ${theme.colors.gray00};
`;

const LeftElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
`;

const ProfileImage = styled.img`
  background: gray;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${theme.colors.gray80};
`;

const Name = styled.div`
  ${theme.typography.subtitle3};
`;

const Content = styled.div`
  ${theme.typography.body5};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StampImage = styled.img`
  background: gray;
`;

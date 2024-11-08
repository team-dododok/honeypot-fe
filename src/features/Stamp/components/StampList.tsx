import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface StampListProps {
  profileImg: string;
  sender: string;
  content: string;
  imgUrl: string;
}

const StampList = (props: StampListProps) => {
  const { profileImg, sender, content, imgUrl } = props;

  return (
    <StampListBox>
      <LeftElement>
        <ProfileImage
          src={
            profileImg || '/assets/images/profile/img-profile-1-120-varient.svg'
          }
          width={55}
          height={55}
          alt="꿀도장"
        />
        <TextBox>
          <Sender>From. {sender}</Sender>
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

const Sender = styled.div`
  ${theme.typography.subtitle3};
`;

const Content = styled.div`
  ${theme.typography.body5};
`;

const StampImage = styled.img`
  background: gray;
`;

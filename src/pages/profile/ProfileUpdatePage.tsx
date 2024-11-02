import BackButton from '@/components/Button/BackButton';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const ProfileUpdatePage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const profileImages = Array.from(
    { length: 6 },
    (_, i) => `/assets/images/profile/img-profile-${i + 1}-120.svg`
  );

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <>
      <Header>
        <BackButton />
        <Title>프로필 수정</Title>
      </Header>
      <SubTitle>프로필 이미지 수정</SubTitle>
      <ProfileImageGrid>
        {profileImages.map((src, index) => (
          <ProfileImageBox key={index} onClick={() => handleImageClick(index)}>
            <ProfileImage
              src={
                selectedImage === index
                  ? src.replace('-120.svg', '-120-varient.svg')
                  : src
              }
              alt={`Profile image ${index + 1}`}
            />
          </ProfileImageBox>
        ))}
      </ProfileImageGrid>
    </>
  );
};

export default ProfileUpdatePage;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${theme.colors.gray80};
  ${theme.typography.body2};
`;

const SubTitle = styled.h2`
  color: ${theme.colors.gray80};
  ${theme.typography.body3};
  margin: 16px 0;
`;

const ProfileImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const ProfileImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

import BackButton from '@/components/Button/BackButton';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const ProfileUpdatePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const profileImages = Array.from(
    { length: 6 },
    (_, i) => `/assets/images/profile/img-profile-${i + 1}-120.svg`
  );

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Header>
        <BackButton />
        <Title>프로필 수정</Title>
      </Header>

      <Container>
        <div>
          <SubTitle>프로필 이미지 수정</SubTitle>
          <ProfileImageGrid>
            {profileImages.map((src, index) => (
              <ProfileImageBox
                key={index}
                onClick={() => handleImageClick(index)}
              >
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
        </div>

        <div>
          <SubTitle>이름 수정</SubTitle>
          <Input clear={true} value={name} onChange={handleNameChange} />
        </div>

        <div>
          <SubTitle>이메일 수정</SubTitle>
          <Input clear={true} value={email} onChange={handleEmailChange} />
        </div>

        <Button variant="deactivate" text={'저장하기'} />
      </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

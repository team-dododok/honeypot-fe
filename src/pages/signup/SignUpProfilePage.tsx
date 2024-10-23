import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import { PROFILE_COLORS } from '@/constants/colors';
import { BottomWrapper, CommonLayout, Label } from '@/features/Signup';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpProfilePage = () => {
  const navigate = useNavigate();
  const [profileIdx, setProfileIdx] = useState<number | null>(null);

  const handleProfileImageClick = (index: number) => {
    setProfileIdx(index);
  };

  const handleButtonClick = () => {
    navigate('/signup/complete');
  };

  return (
    <CommonLayout>
      <ProgressBarWrapper>
        <ProgressBar current={3} total={3} />
      </ProgressBarWrapper>
      <Label marginBottom="32px">
        사용할 프로필 이미지를
        <br /> 선택해주세요.
      </Label>

      <ProfileGridWrapper>
        <ProfileGrid>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <ProfileImage
              key={index}
              // 서버로부터 이미지 받아오기
              // src={`/assets/images/profile/${index}.svg`}
              alt={`프로필${index}`}
              isSelected={profileIdx === index}
              index={index}
              onClick={() => handleProfileImageClick(index)}
            />
          ))}
        </ProfileGrid>
      </ProfileGridWrapper>
      <BottomWrapper>
        <Button
          text="다음"
          variant="activate"
          onClick={handleButtonClick}
          disabled={profileIdx === null}
        />
      </BottomWrapper>
    </CommonLayout>
  );
};

export default SignUpProfilePage;

const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 28px;
`;

const ProfileGridWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ProfileGrid = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 24px;
`;

const ProfileImage = styled.img<{ isSelected: boolean; index: number }>`
  width: 120px;
  height: 120px;
  border-radius: 40px;
  border: ${({ isSelected, index }) =>
    isSelected ? `5px solid ${PROFILE_COLORS[index]}` : 'none'};
  background-color: gray;
  padding: ${({ isSelected }) => (isSelected ? '0px' : '5px')};
  box-sizing: border-box;
`;

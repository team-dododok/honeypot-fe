import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import { PROFILE_COLORS } from '@/constants/colors';
import { postSignUp } from '@/features/Login/api/kakao';
import { useMemberProfileImage } from '@/hooks/user/useMemberProfileImage';
import {
  ProgressBarWrapper,
  BottomWrapper,
  CommonLayout,
  Label,
} from '@/layouts/FormLayoutStyles';
import { useSignUpStore } from '@/store/useSignupStore';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpProfilePage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const uuid = urlParams.get('uuid');
  const { isCheckedTerms, name, email, profileIdx, setProfileIdx, clearState } =
    useSignUpStore();
  const { data } = useMemberProfileImage();

  const profileImages = data?.profileImageUrl
    ? Object.entries(data.profileImageUrl as Record<string, string>)
    : [];

  const handleProfileImageClick = (index: number) => {
    setProfileIdx(index);
  };

  const handleButtonClick = async () => {
    try {
      const requestBody = {
        serviceTerm: isCheckedTerms[0] ? 1 : 0,
        personalInfo: isCheckedTerms[1] ? 1 : 0,
        emailMarketing: isCheckedTerms[2] ? 1 : 0,
        name,
        email,
        imageUrl:
          profileImages.find(
            ([key]) => parseInt(key, 10) === profileIdx
          )?.[1] || '',
        onboarding: 0,
      };

      await postSignUp(requestBody);
      if (uuid) {
        navigate(`/compliment/${uuid}?name=${name}`);
        clearState();
      } else {
        navigate('/signup/complete');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
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
          {profileImages.map(([key, url]: [string, string]) => {
            const index = parseInt(key, 10);
            return (
              <ProfileImage
                key={index}
                src={url}
                alt={`프로필${index}`}
                isSelected={profileIdx === index}
                index={index - 1}
                onClick={() => handleProfileImageClick(index)}
              />
            );
          })}
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
  padding: ${({ isSelected }) => (isSelected ? '0px' : '5px')};
  box-sizing: border-box;
`;

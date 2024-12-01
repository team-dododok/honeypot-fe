import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import WarningModal from '@/components/Modal/WarningModal';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { history } from '@/utils/history';
import { useMemberProfileImage } from '@/hooks/user/useMemberProfileImage';
import { PROFILE_COLORS } from '@/constants/colors';
import { useMemberInfo } from '@/hooks/user/useMemberInfo';
import { usePatchMember } from '@/hooks/user/usePatchMember';

const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const [nameError, setNameError] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data } = useMemberProfileImage();
  const { data: member } = useMemberInfo();
  const { mutate } = usePatchMember();

  const profileImages = data?.profileImageUrl
    ? Object.entries(data.profileImageUrl as Record<string, string>)
    : [];

  useEffect(() => {
    if (member && profileImages.length > 0 && selectedImage === null) {
      setName(member.name);
      setEmail(member.email);

      const matchingImage = profileImages.find(
        ([, url]) => url === member.imageUrl
      );
      if (matchingImage) {
        setSelectedImage(parseInt(matchingImage[0], 10));
      }
    }
  }, [member, profileImages]);

  useEffect(() => {
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action !== 'POP') return;
      if (name || email || selectedImage !== null) {
        setShowModal(true);
        history.push(pathname);
      }
    });
    return unlistenHistoryEvent;
  }, [name, email, selectedImage]);

  const handleImageClick = (index: number) => {
    setSelectedImage((prevSelectedImage) =>
      prevSelectedImage === index ? null : index
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length <= 8) {
      setName(newName);
    }
    if (newName === '') {
      setNameError('이름을 입력해주세요.');
    } else if (newName.length > 8) {
      setNameError('8자 이내로 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  const handleSaveButtonClick = () => {
    if (!name || selectedImage === null) {
      showToast('이름과 프로필 이미지를 모두 선택해주세요.');
      return;
    }
    const selectedImageUrl = profileImages.find(
      ([key]) => parseInt(key, 10) === selectedImage
    )?.[1];
    if (!selectedImageUrl) {
      showToast('선택한 프로필 이미지를 확인해주세요.');
      return;
    }
    const updatedData = {
      name,
      profileImageUrl: selectedImageUrl,
    };

    mutate(updatedData);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    navigate('/profile');
  };

  useEffect(() => {
    setIsButtonActive(!!name && !!email && selectedImage !== null);
  }, [name, email, selectedImage]);

  return (
    <>
      <Container>
        <div>
          <SubTitle>프로필 이미지 수정</SubTitle>
          <ProfileImageGrid>
            {profileImages.map(([key, url]: [string, string]) => {
              const index = parseInt(key, 10);
              return (
                <ProfileImageBox
                  key={index}
                  onClick={() => handleImageClick(index)}
                >
                  <ProfileImage
                    src={url}
                    alt={`프로필 이미지 ${index}`}
                    isSelected={selectedImage === index}
                    index={index - 1}
                  />
                </ProfileImageBox>
              );
            })}
          </ProfileImageGrid>
        </div>

        <div>
          <SubTitle>이름 수정</SubTitle>
          <Input
            clear={true}
            value={name}
            onChange={handleNameChange}
            errorMsg={nameError}
          />
        </div>

        <div>
          <SubTitle>이메일 수정</SubTitle>
          <InputBox>
            <Input
              value={email}
              onChange={() => {}}
              width="100%"
              disabled={true}
            />
            <EditButton onClick={() => navigate('/email/update')}>
              편집
            </EditButton>
          </InputBox>
        </div>

        <Button
          variant={isButtonActive ? 'activate' : 'deactivate'}
          text={'저장하기'}
          onClick={handleSaveButtonClick}
        />
      </Container>

      {showModal && (
        <WarningModal
          title="정말 나가시겠어요?"
          description="지금 나가면 변경된 내용은 저장되지 않아요."
          cancelText="나가기"
          confirmText="계속 작성하기"
          onCancel={handleModalCancel}
          onConfirm={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProfileUpdatePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding-bottom: 20px;
`;

const SubTitle = styled.h2`
  color: ${theme.colors.gray80};
  ${theme.typography.body3};
  margin-bottom: 16px;
`;

const ProfileImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  gap: 12px;
`;

const ProfileImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileImage = styled.img<{ isSelected: boolean; index: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 40px;
  border: ${({ isSelected, index }) =>
    isSelected ? `5px solid ${PROFILE_COLORS[index]}` : 'none'};
  padding: ${({ isSelected }) => (isSelected ? '0px' : '5px')};
  box-sizing: border-box;
  cursor: pointer;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const EditButton = styled.button`
  display: flex;
  padding: 1px 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 60px;
  height: 35px;

  color: ${theme.colors.gray50};
  ${theme.typography.body4};
  background-color: ${theme.colors.gray00};
  border: 1px solid ${theme.colors.gray30};
  border-radius: 70px;
`;

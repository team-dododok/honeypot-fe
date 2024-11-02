import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import WarningModal from '@/components/Modal/WarningModal';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { history } from '@/utils/history';

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

  const profileImages = Array.from(
    { length: 6 },
    (_, i) => `/assets/images/profile/img-profile-${i + 1}-120.svg`
  );

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
    setSelectedImage(index);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length <= 8) {
      setName(newName);
    }

    if (newName === '') {
      setNameError('이름을 입력해주세요.');
    } else if (newName.length > 8) {
      setNameError('8자 이내로 입력해 주세요.');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSaveButtonClick = () => {
    showToast('변경된 내용을 저장했어요');
    navigate('/');
  };

  const handleModalCancel = () => {
    setShowModal(false);
    navigate('/');
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
          <Input
            clear={true}
            value={name}
            onChange={handleNameChange}
            errorMsg={nameError}
          />
        </div>

        <div>
          <SubTitle>이메일 수정</SubTitle>
          <Input clear={true} value={email} onChange={handleEmailChange} />
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

const SubTitle = styled.h2`
  color: ${theme.colors.gray80};
  ${theme.typography.body3};
  margin-bottom: 16px;
`;

const ProfileImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  margin: 0 auto;
  width: 100%;
`;

const ProfileImageBox = styled.div`
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

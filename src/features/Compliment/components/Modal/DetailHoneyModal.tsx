import CloseModal from '@/components/Modal/CloseModal';
import React, { useRef } from 'react';
import LetterInfo, { NameType } from '../Frame/LetterInfo';
import ReadLetter from '../Letter/ReadLetter';
import Button from '@/components/Button/Button';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { saveImageFromRef } from '@/utils/saveImage';
import { useMemberProfileImage } from '@/hooks/user/useMemberProfileImage';
import { useToast } from '@/store/useToast';
// import { useStampImage } from '@/hooks/stamp/useStampImage';

interface DetailHoneyModalProps {
  profileImg: string;
  groupName: string;
  date: string;
  nameType: NameType;
  name: string;
  content: string;
  stampImage: string;
  onClose: () => void;
  onHoneyMove?: () => void;
  onHoneyDelete?: () => void;
}

const DetailHoneyModal = (props: DetailHoneyModalProps) => {
  const {
    profileImg,
    groupName,
    date,
    nameType,
    name,
    content,
    stampImage,
    onClose,
    onHoneyMove,
    onHoneyDelete,
  } = props;

  const { showToast } = useToast();
  const complimentRef = useRef<HTMLDivElement>(null);
  const searchParams = new URLSearchParams(location.search);
  const tabValue = searchParams.get('tab') || 'receive';
  const { data: profileData } = useMemberProfileImage();
  // const { data: stampData } = useStampImage();

  /* 서버 이미지 리스트와 일치 확인 후, index 값 가져오기 */
  const profileImages = profileData?.profileImageUrl
    ? Object.entries(profileData.profileImageUrl as Record<string, string>)
    : [];

  const matchedIndex = profileImages.findIndex(([, url]) => url === profileImg);

  const newProfileImg =
    matchedIndex !== -1
      ? `/assets/images/profile/profile-${matchedIndex + 1}.svg`
      : profileImg;

  /* 서버 도장 리스트와 일치 확인 후, index 값 가져오기 */
  // const stampDtos = stampData?.stampDtos || [];

  // const matchedStampIndex = stampDtos.findIndex(
  //   (stamp) => stamp.imageUrl === stampImage
  // );

  // const newStampImg =
  //   matchedIndex !== -1
  //     ? `/assets/images/stamp/stamp-${matchedStampIndex + 1}.svg`
  //     : profileImg;

  const handleSaveDetailHoney = () => {
    // 이미지 저장하기
    if (complimentRef.current) {
      saveImageFromRef(
        complimentRef,
        `칭찬 이미지.png`,
        null,
        80,
        '40px 20px',
        '#ffffff',
        '16px'
      );
    }

    onClose();
  };

  const handleHoneyDelete = () => {
    if (tabValue !== 'send') {
      if (onHoneyDelete) onHoneyDelete();
    } else {
      showToast('보낸 꿀 삭제 기능은 준비 중이에요!', 3000, {
        bottom: '160px',
      });
    }
  };

  return (
    <>
      <CloseModal
        confirmText="저장"
        buttonIcon={<img src="/assets/icons/download.svg" alt="Download" />}
        onConfirm={handleSaveDetailHoney}
        onClose={onClose}
      >
        <ComplimentBox ref={complimentRef}>
          <LetterInfo
            profileImg={newProfileImg}
            groupName={groupName}
            date={date}
            nameType={nameType}
            name={name}
          />
          <ReadLetter content={content} stampImage={stampImage} />
        </ComplimentBox>
      </CloseModal>
      <ButtonWrapper>
        <Button
          text="다른 그룹으로 꿀 옮기기"
          variant="default"
          onClick={onHoneyMove}
        />
        <Button
          text="삭제"
          variant="danger"
          color={theme.colors.error60}
          background={theme.colors.gray00}
          onClick={handleHoneyDelete}
        />
      </ButtonWrapper>
    </>
  );
};

export default DetailHoneyModal;

const ButtonWrapper = styled.div`
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 45px;
  gap: 12px;
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const ComplimentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

import CloseModal from '@/components/Modal/CloseModal';
import React, { useRef } from 'react';
import LetterInfo, { NameType } from '../Frame/LetterInfo';
import ReadLetter from '../Letter/ReadLetter';
import Button from '@/components/Button/Button';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { saveImageFromRef } from '@/utils/saveImage';

interface DetailHoneyModalProps {
  profileImg: string;
  groupName: string;
  date: string;
  nameType: NameType;
  name: string;
  content: string;
  stampImage: string;
  // onConfirm: () => void;
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
    // onConfirm,
    onClose,
    onHoneyMove,
    onHoneyDelete,
  } = props;

  const complimentRef = useRef<HTMLDivElement>(null);

  const handleSaveDetailHoney = () => {
    // 이미지 저장하기
    if (complimentRef.current) {
      saveImageFromRef(complimentRef, `칭찬 이미지.png`, null, '20px', null);
    }

    onClose();
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
            profileImg={profileImg}
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
          variant="warning"
          color={theme.colors.error60}
          background={theme.colors.gray00}
          onClick={onHoneyDelete}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

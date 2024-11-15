import CloseModal from '@/components/Modal/CloseModal';
import React from 'react';
import LetterInfo, { NameType } from '../Frame/LetterInfo';
import ReadLetter from '../Letter/ReadLetter';
import Button from '@/components/Button/Button';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

interface DetailHoneyModalProps {
  profileImg: string;
  groupName: string;
  date: string;
  nameType: NameType;
  name: string;
  content: string;
  stampImage: string;
  onConfirm: () => void;
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
    onConfirm,
    onClose,
    onHoneyMove,
    onHoneyDelete,
  } = props;
  return (
    <>
      <CloseModal
        confirmText="저장"
        buttonIcon={<img src="/assets/icons/download.svg" alt="Download" />}
        onConfirm={onConfirm}
        onClose={onClose}
      >
        <LetterInfo
          profileImg={profileImg}
          groupName={groupName}
          date={date}
          nameType={nameType}
          name={name}
        />
        <ReadLetter content={content} stampImage={stampImage} />
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

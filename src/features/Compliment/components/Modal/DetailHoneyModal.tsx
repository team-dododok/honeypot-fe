import CloseModal from '@/components/Modal/CloseModal';
import React from 'react';
import LetterInfo, { NameType } from '../Frame/LetterInfo';
import ReadLetter from '../Letter/ReadLetter';

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
  } = props;
  return (
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
  );
};

export default DetailHoneyModal;

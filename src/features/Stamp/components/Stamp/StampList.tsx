import Check from '@/components/Check/Check';
import DetailHoneyModal from '@/features/Compliment/components/Modal/DetailHoneyModal';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

export type NameType = 'receiver' | 'sender';

interface StampListProps {
  profileImg: string;
  nameType: NameType;
  name: string;
  content: string;
  imgUrl: string;
  date: string;
  selected: boolean;
  readOnly: boolean;
  onClick: () => void;
}

const StampList = (props: StampListProps) => {
  const {
    profileImg,
    nameType,
    name,
    content,
    imgUrl,
    date,
    selected,
    readOnly,
    onClick,
  } = props;

  const [showDetailHoneyModal, setShowDetailHoneyModal] =
    useState<boolean>(false);

  const handleClickStamp = () => {
    if (!readOnly && onClick) {
      onClick();
    } else {
      setShowDetailHoneyModal(true);
    }
  };

  const handleSaveDetailHoney = () => {
    // 이미지 저장하기
    setShowDetailHoneyModal(false);
  };

  const handleCloseDetailHoney = () => {
    setShowDetailHoneyModal(false);
  };

  return (
    <>
      <StampListBox onClick={handleClickStamp}>
        <LeftElement>
          {!readOnly && (
            <Check
              variant="radio"
              label=""
              isChecked={selected}
              onChange={onClick}
              marginRight="0px"
            />
          )}
          <ProfileImage
            src={profileImg || '/assets/images/profile/profile-1-120.svg'}
            width={48}
            height={48}
            alt="꿀도장"
          />
          <TextBox>
            <Name>
              {nameType === 'receiver' ? 'From. ' : 'To. '} {name}
            </Name>
            <Content>{content}</Content>
          </TextBox>
        </LeftElement>
        <StampImage
          src={imgUrl || '/assets/images/stamp/stamp-example.svg'}
          width={55}
          height={55}
          alt="꿀도장"
        />
      </StampListBox>
      {showDetailHoneyModal && (
        <DetailHoneyModal
          profileImg={profileImg}
          groupName="groupName"
          date={date}
          nameType={nameType}
          name={name}
          content={content}
          stampImage={imgUrl}
          onConfirm={handleSaveDetailHoney}
          onClose={handleCloseDetailHoney}
        />
      )}
    </>
  );
};

export default StampList;

const StampListBox = styled.div`
  width: 100%;
  height: 80px;
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray05};
  background: ${theme.colors.gray00};
  cursor: pointer;
`;

const LeftElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
`;

const ProfileImage = styled.img`
  background: gray;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${theme.colors.gray80};
`;

const Name = styled.div`
  ${theme.typography.subtitle3};
`;

const Content = styled.div`
  ${theme.typography.body5};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StampImage = styled.img`
  background: gray;
`;

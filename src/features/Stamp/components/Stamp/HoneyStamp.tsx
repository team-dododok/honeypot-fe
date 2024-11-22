import { useDetailHoneyModalStore } from '@/store/useDetailHoneyModalStore';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

export type NameType = 'receiver' | 'sender';

interface HoneyStamp {
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

const HoneyStamp = (props: HoneyStamp) => {
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

  const { openDetailModal } = useDetailHoneyModalStore();

  const handleClickStamp = () => {
    if (!readOnly && onClick) {
      onClick();
    } else {
      openDetailModal({
        profileImg,
        nameType,
        name,
        content,
        imgUrl,
        date,
      });
    }
  };

  return (
    <>
      <HoneyStampBox onClick={handleClickStamp}>
        {selected && <CheckIcon src="/assets/icons/stamp-check.svg" />}
        {selected && (
          <OverlayImage
            src={imgUrl || '/assets/images/stamp/stamp-overlay.svg'}
            width={144}
            height={125}
            alt="꿀도장"
          />
        )}
        <HoneyStampImage
          src={
            imgUrl ||
            `/assets/images/stamp/stamp-polygon${readOnly ? '-border' : ''}.svg`
          }
          width={144}
          height={125}
          alt="꿀도장"
          $isSelectMode={!readOnly}
        />
        <HoneyStampContent $isSelectMode={!readOnly}>
          <Date>{date}</Date>
          <StampImage src={'/assets/images/stamp/stamp-example.svg'} />
          <Sender>
            {' '}
            {nameType === 'receiver' ? 'From. ' : 'To. '}
            {name}
          </Sender>
        </HoneyStampContent>
      </HoneyStampBox>
    </>
  );
};

export default HoneyStamp;

const HoneyStampBox = styled.div`
  width: 144px;
  height: 125px;
  position: relative;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  cursor: pointer;
`;

const CheckIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

const HoneyStampImage = styled.img<{
  $isSelectMode: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ $isSelectMode }) => ($isSelectMode ? 0.8 : 1)};
`;

const HoneyStampContent = styled.div<{
  $isSelectMode: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: ${({ $isSelectMode }) => ($isSelectMode ? 0.6 : 1)};
`;

const Date = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.body5};
`;

const StampImage = styled.img`
  background-color: gray;
`;

const Sender = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle4};
`;

import { useDetailHoneyModalStore } from '@/store/useDetailHoneyModalStore';
import { theme } from '@/styles/theme';
import { formatDate } from '@/utils/format';
import styled from '@emotion/styled';
import React from 'react';

export type NameType = 'receiver' | 'sender';

interface HoneyStamp {
  id: number;
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
    id,
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
        id,
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
            src={'/assets/images/stamp/stamp-overlay.svg'}
            width={144}
            height={125}
            alt="꿀도장"
          />
        )}
        <HoneyStampImage
          src={`/assets/images/stamp/stamp-polygon${readOnly ? '-border' : ''}.svg`}
          width={144}
          height={125}
          alt="꿀도장"
          $isSelectMode={!readOnly}
        />
        <HoneyStampContent $isSelectMode={!readOnly}>
          <Date>{formatDate(date)}</Date>
          <StampImage data={imgUrl} onClick={handleClickStamp} />
          <Sender>{name}</Sender>
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

const StampImage = styled.div<{ data: string }>`
  width: 48px;
  height: 55px;
  background-image: url(${(props) => props.data});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Sender = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle4};
  white-space: nowrap;
`;

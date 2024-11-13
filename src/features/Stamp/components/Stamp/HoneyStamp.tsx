import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface HoneyStamp {
  date: string;
  imgUrl: string;
  sender: string;
  selected: boolean;
  readOnly: boolean;
  onClick: () => void;
}

const HoneyStamp = (props: HoneyStamp) => {
  const { date, imgUrl, sender, selected, readOnly, onClick } = props;

  const handleClickStamp = () => {
    if (!readOnly && onClick) {
      onClick();
    }
  };

  return (
    <HoneyStampBox onClick={handleClickStamp}>
      {selected && <CheckIcon src="/assets/icons/stamp-check.svg" />}
      {selected && (
        <OverlayImage
          src={imgUrl || '/assets/images/stamp/img-stamp-overlay.svg'}
          width={144}
          height={125}
          alt="꿀도장"
        />
      )}
      <HoneyStampImage
        src={imgUrl || '/assets/images/stamp/img-stamp-polygon.svg'}
        width={144}
        height={125}
        alt="꿀도장"
      />
      <HoneyStampContent>
        <Date>{date}</Date>
        <StampImage src={'/assets/images/stamp/img-stamp-example.svg'} />
        <Sender>From. {sender}</Sender>
      </HoneyStampContent>
    </HoneyStampBox>
  );
};

export default HoneyStamp;

const HoneyStampBox = styled.div`
  width: 144px;
  height: 125px;
  position: relative;
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

const HoneyStampImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const HoneyStampContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

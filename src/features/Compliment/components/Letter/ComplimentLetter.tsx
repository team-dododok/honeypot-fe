import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import Letter from './Letter';

interface ComplimentLetterProps {
  stampType: number | null;
  receiver: string;
  sender: string;
  content: string;
  honeyStampImage: string;
  onClick?: () => void;
  children?: React.ReactNode;
  readOnly?: boolean;
}

const ComplimentLetter = (props: ComplimentLetterProps) => {
  const {
    receiver,
    sender,
    content,
    honeyStampImage,
    onClick,
    children,
    readOnly = true,
  } = props;

  return (
    <Container>
      <Stamp onClick={onClick}>
        <Image
          src={honeyStampImage || '/assets/images/stamp/stamp-select.svg'}
          alt="꿀도장"
        />
      </Stamp>
      {children}
      <Letter
        receiver={receiver}
        sender={sender}
        content={content}
        totalLength={180}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default ComplimentLetter;

const Container = styled.div`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  background: ${theme.colors.gray00};
`;

const Stamp = styled.button`
  width: 137px;
  height: 137px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 137px;
  height: 137px;
`;

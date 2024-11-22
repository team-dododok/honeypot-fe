import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import Letter from './Letter';

interface ComplimentLetterProps {
  stampType: number | null;
  receiver: string;
  sender: string;
  content: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ComplimentLetter = (props: ComplimentLetterProps) => {
  const { receiver, sender, content, setContent, onClick, children } = props;

  return (
    <Container>
      <Stamp onClick={onClick}>
        <Image src="/assets/images/stamp/stamp-select.svg" alt="stamp" />
      </Stamp>
      {children}
      <Letter
        receiver={receiver}
        sender={sender}
        content={content}
        setContent={setContent}
        totalLength={180}
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
  background-color: gray;
`;

import LinedInput from '@/components/Input/LinedInput';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';

interface LetterProps {
  receiver: string;
  sender: string;
  content: string;
  totalLength: number;
  lineColor?: string;
  readOnly?: boolean;
}

const Letter = (props: LetterProps) => {
  const {
    receiver,
    sender,
    content,
    totalLength,
    lineColor,
    readOnly = true,
  } = props;
  const { setContent } = useSendComplimentStore();

  const isMaxLengthReached = content.length === totalLength;

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (newValue.length <= totalLength && setContent) {
      setContent(newValue);
    }
  };

  return (
    <LetterContainer>
      <NameLabel>To. {receiver}</NameLabel>
      <Content>
        <LinedInput
          placeholder="칭찬을 작성해주세요."
          maxLength={totalLength}
          rows={9}
          defaultValue={content}
          onChange={handleContentChange}
          lineCount={9}
          lineHeight={26}
          lineColor={lineColor}
        />
      </Content>
      <BottomWrapper>
        {!readOnly ? (
          <Length $isMaxLengthReached={isMaxLengthReached}>
            {content.length}/{totalLength}자
          </Length>
        ) : (
          <div />
        )}
        <NameLabel>From. {sender}</NameLabel>
      </BottomWrapper>
    </LetterContainer>
  );
};

export default Letter;

const LetterContainer = styled.div`
  width: 100%;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NameLabel = styled.div`
  color: ${theme.colors.gray80};
  ${theme.typography.subtitle2};
`;

const Content = styled.div`
  width: 100%;
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Length = styled.div<{ $isMaxLengthReached: boolean }>`
  color: ${({ $isMaxLengthReached }) =>
    $isMaxLengthReached ? theme.colors.error90 : theme.colors.gray50};
  ${theme.typography.detail5};
`;

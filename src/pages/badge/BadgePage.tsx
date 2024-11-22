import BackHeader from '@/components/Header/BackHeader';
import BadgeContainer from '@/features/Badge/components/Container/BadgeContainer';
import { saveImageFromRef } from '@/utils/saveImage';
import styled from '@emotion/styled';
import React, { useRef } from 'react';

const BadgePage = () => {
  const badgeListRef = useRef<HTMLDivElement>(null);

  const handleSaveAllBadges = () => {
    if (badgeListRef.current) {
      saveImageFromRef(
        badgeListRef,
        '꿀단지 뱃지 모아보기.png',
        null,
        '20px',
        null
      );
    }
  };

  return (
    <Layout>
      <BackHeader title="활동 배지">
        <SaveButtonWrapper>
          <SaveButton onClick={handleSaveAllBadges}>
            <img
              src="/assets/icons/save-button.svg"
              width={32}
              height={32}
              alt="저장"
            />
          </SaveButton>
        </SaveButtonWrapper>
      </BackHeader>
      <BadgeContainerWrapper ref={badgeListRef}>
        <BadgeContainer />
      </BadgeContainerWrapper>
    </Layout>
  );
};

export default BadgePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SaveButton = styled.button``;

const BadgeContainerWrapper = styled.div``;

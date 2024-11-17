import BackHeader from '@/components/Header/BackHeader';
import BadgeContainer from '@/features/Badge/components/Container/BadgeContainer';
import styled from '@emotion/styled';
import React from 'react';

const BadgePage = () => {
  const handleSaveAllBadges = () => {
    // 전체 화면 스크린샷 저장
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
      <BadgeContainer />
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

import Button from '@/components/Button/Button';
import CreateGroupModal from '@/features/Group/components/Modal/CreateGroupModal';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const HonyeBlank = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const handleConfirmModal = () => {
    if (groupName) {
      setGroupName('');
    }
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <Container>
        <img src="/assets/images/main/none-stamp.svg" alt="nonestamp" />
        <div>
          <p>아직 그룹이 없어요.</p>
          <p>새 그룹을 생성해 볼까요?</p>
        </div>
        <Button text="새 그룹 생성하기" onClick={toggleModal} />
      </Container>
      <CreateGroupModal
        isVisible={isVisible}
        Group={groupName}
        setGroup={setGroupName}
        onClose={toggleModal}
        onConfirm={handleConfirmModal}
      />
    </>
  );
};

export default HonyeBlank;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  padding: 0 45px;

  width: 100%;
  height: 100%;

  div {
    ${theme.typography.body3};
    color: ${theme.colors.gray80};
    text-align: center;
    line-height: 160%;
  }
`;

import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import HoneyGroup from './HoneyGroup';
import GroupList from './GroupList';
import { useNavigate } from 'react-router-dom';
import { useGroup } from '@/hooks/group/useGroup';
import { GroupWithMembersInfo } from '@/api/group/types/Group';
import Button from '@/components/Button/Button';
import CreateGroupModal from '@/features/Group/components/Modal/CreateGroupModal';

const MainBottomSheet = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [groups, setGroups] = useState<GroupWithMembersInfo[]>([]);
  const [selectedGroupToggle, setSelectedGroupToggle] =
    useState<ToggleType>('card');
  const { data: groupData } = useGroup();

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

  useEffect(() => {
    setGroups(groupData?.groupMembersPraiseCountInfos || []);
    setCount(groupData?.groupMembersPraiseCountInfos?.length || 0);
  }, [groupData]);

  const [bottomSheetHeight, setBottomSheetHeight] = useState(
    window.innerHeight - 235
  );

  useEffect(() => {
    const handleResize = () => {
      setBottomSheetHeight(window.innerHeight - 235);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Container $height={bottomSheetHeight}>
        <Header>
          <Title>
            <p>나의 꿀단지 ({count})</p>
            <img
              src="/assets/icons/group-edit.svg"
              alt="groupedit"
              onClick={() => {
                navigate('/group/management');
              }}
            />
          </Title>
          <DisplayToggle
            displayType="group"
            selected={selectedGroupToggle}
            disabled={count === 0 ? true : false}
            onClick={(type) => setSelectedGroupToggle(type)}
          />
        </Header>

        {count === 0 ? (
          <HoneyBlank>
            <img src="/assets/images/main/none-stamp.svg" alt="nonestamp" />
            <div>
              <p>아직 그룹이 없어요.</p>
              <p>새 그룹을 생성해 볼까요?</p>
            </div>
            <Button text="새 그룹 생성하기" onClick={toggleModal} />
          </HoneyBlank>
        ) : selectedGroupToggle === 'card' ? (
          <HoneyGroup group={groups} />
        ) : (
          <GroupList group={groups} />
        )}
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

export default MainBottomSheet;

const Container = styled.div<{ $height: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  max-width: 480px;
  padding: 0 26px 35px 26px;
  border-radius: 24px 24px 0px 0px;
  background: ${theme.colors.gray00};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: height 0.3s ease;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const Title = styled.h1`
  ${theme.typography.subtitle1};
  color: ${theme.colors.gray80};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  img {
    cursor: pointer;
    transform: translateY(1.8px);
  }
`;

const HoneyBlank = styled.div`
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

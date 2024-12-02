import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import HoneyBlank from './HoneyBlank';
import HoneyGroup from './HoneyGroup';
import GroupList from './GroupList';
import { useNavigate } from 'react-router-dom';
import { useGroup } from '@/hooks/group/useGroup';
import { GroupWithMembersInfo } from '@/api/group/types/Group';

const MainBottomSheet = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [groups, setGroups] = useState<GroupWithMembersInfo[]>([]);
  const [selectedGroupToggle, setSelectedGroupToggle] =
    useState<ToggleType>('card');
  const { data: groupData } = useGroup();

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

      <Content>
        {count === 0 ? (
          <HoneyBlank />
        ) : selectedGroupToggle === 'card' ? (
          <HoneyGroup group={groups} />
        ) : (
          <GroupList group={groups} />
        )}
      </Content>
    </Container>
  );
};

export default MainBottomSheet;

const Container = styled.div<{ $height: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  max-width: 480px;
  padding: 0 26px;
  border-radius: 24px 24px 0px 0px;
  background: ${theme.colors.gray00};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: height 0.3s ease;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;

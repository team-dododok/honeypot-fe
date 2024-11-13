import BottomSheet from '@/components/BottomSheet/BottomSheet';
import SelectButton from '@/components/Button/SelectButton';
import BackHeader from '@/components/Header/BackHeader';
import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import TabToggle from '@/components/Toggle/TabToggle';
import { HONEY_TOGGLE } from '@/constants/toggle';
import GroupTabContainer from '@/features/Group/components/Container/GroupTabContainer';
import EditGroupNameModal from '@/features/Group/components/Modal/EditGroupNameModal';
import StampCard from '@/features/Stamp/components/Stamp/StampCard';
import { TOTAL_STAMP_DUMMY } from '@/features/Stamp/constants/dummy/stampDefault';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GroupDetailPage = () => {
  const { showToast } = useToast();
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedDisplay, setSelectedDisplay] = useState<ToggleType>('honey');
  // 추후 서버로부터 받아올 데이터
  // const [totalStamp, setTotalStamp] =
  //   useState<StampCardProps[]>(TOTAL_STAMP_DUMMY);
  const [groupName, setGroupName] = useState<string>('A그룹');

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [showEditGroupNameModal, setShowEditGroupNameModal] =
    useState<boolean>(false);

  const handleToggle = () => {
    setIsSelectMode(!isSelectMode);
  };

  const title = `${groupName} (11)`;

  const handleShowEditModal = () => {
    setShowEditGroupNameModal(true);
  };

  const handleEditGroupName = () => {
    // 그룹명 수정 API
    setShowEditGroupNameModal(false);
    showToast('그룹명 변경이 완료되었어요');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'receive') {
      setSelectedTab(0);
    } else if (tab === 'send') {
      setSelectedTab(1);
    }
  }, [location.search]);

  return (
    <Layout>
      <BackHeader title={title}>
        <EditButtonWrapper>
          <EditButton onClick={handleShowEditModal}>
            <img
              src="/assets/icons/edit-button.svg"
              width={32}
              height={32}
              alt="수정"
            />
          </EditButton>
        </EditButtonWrapper>
      </BackHeader>
      <TotalHoneyContainer>
        <Label>이 그룹에서 받은 꿀도장</Label>
        <TotalStampList>
          {TOTAL_STAMP_DUMMY.map((item, index) => (
            <StampCard
              key={index}
              imgUrl={
                item.imgUrl || '/assets/images/stamp/img-stamp-example.svg'
              }
              stampName={item.stampName}
              count={item.count}
              totalCount={item.totalCount}
            />
          ))}
        </TotalStampList>
        <Guide>꿀도장 카드를 좌우로 넘겨 확인하세요.</Guide>
      </TotalHoneyContainer>
      <BottomSheet
        title="꿀도장 현황"
        initialHeight="250px"
        expandedHeight="642px"
      >
        <TabToggle
          tabs={HONEY_TOGGLE}
          selected={selectedTab}
          originalPath={`/group/${1}`}
          onClick={(id) => {
            setSelectedTab(id);
          }}
        />
        <DisplayToggleWrapper>
          <SelectButton selected={isSelectMode} onClick={handleToggle} />
          <DisplayToggle
            displayType="stamp"
            selected={selectedDisplay}
            onClick={(type) => setSelectedDisplay(type)}
          />
        </DisplayToggleWrapper>
        <GroupTabContainer
          type={selectedTab === 0 ? 'send' : 'receive'}
          displayType={selectedDisplay}
        />
        {/* 그룹명 수정 및 삭제 */}
        <EditGroupNameModal
          isVisible={showEditGroupNameModal}
          onClose={() => setShowEditGroupNameModal(false)}
          onConfirm={handleEditGroupName}
          groupName={groupName}
          setGroupName={setGroupName}
        />
      </BottomSheet>
    </Layout>
  );
};

export default GroupDetailPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const EditButton = styled.button``;

const TotalHoneyContainer = styled.div`
  width: 100%;
  height: 240px;
  padding: 13px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.gray10};
  background: ${theme.colors.gray00};
  overflow: hidden;
`;

const Label = styled.div`
  width: 100%;
  color: ${theme.colors.gray80};
  ${theme.typography.body03};
  text-align: left;
`;

const TotalStampList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  overflow-x: scroll;
`;

const Guide = styled.div`
  width: 100%;
  color: ${theme.colors.gray60};
  ${theme.typography.detail5};
  text-align: center;
`;

const DisplayToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

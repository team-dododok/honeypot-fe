import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/Button/Button';
import SelectButton from '@/components/Button/SelectButton';
import BackHeader from '@/components/Header/BackHeader';
import Info from '@/components/Info/Info';
import WarningModal from '@/components/Modal/WarningModal';
import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import TabToggle from '@/components/Toggle/TabToggle';
import { HONEY_TOGGLE } from '@/constants/toggle';
import DetailHoneyModal from '@/features/Compliment/components/Modal/DetailHoneyModal';
import HoneyMoveCheckModal from '@/features/Compliment/components/Modal/HoneyMoveCheckModal';
import HoneyMoveModal from '@/features/Compliment/components/Modal/HoneyMoveModal';
import GroupTabContainer from '@/features/Group/components/Container/GroupTabContainer';
import EditGroupNameModal from '@/features/Group/components/Modal/EditGroupNameModal';
import StampCard from '@/features/Stamp/components/Stamp/StampCard';
import { TOTAL_STAMP_DUMMY } from '@/features/Stamp/constants/dummy/stampDefault';
import { useDetailHoneyModalStore } from '@/store/useDetailHoneyModalStore';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { showToast, showMoveToast } = useToast();
  const { isDetailModalOpen, modalContent, closeDetailModal } =
    useDetailHoneyModalStore();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedDisplay, setSelectedDisplay] = useState<ToggleType>('honey');
  // 추후 서버로부터 받아올 데이터
  // const [totalStamp, setTotalStamp] =
  //   useState<StampCardProps[]>(TOTAL_STAMP_DUMMY);
  const [groupName, setGroupName] = useState<string>('A그룹');

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const [isHoneyMoveModalOpen, setHoneyMoveModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [isHoneyMoveCheckModalOpen, setHoneyMoveCheckModalOpen] =
    useState(false);

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showEditGroupNameModal, setShowEditGroupNameModal] =
    useState<boolean>(false);

  const handleToggle = () => {
    if (isSelectMode && selectedCount > 0) {
      setShowCancelModal(true);
    } else {
      setIsSelectMode(!isSelectMode);
    }
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

  const handleWriteCompliment = () => {
    // 칭찬 작성하기 페이지 이동
    navigate('/compliment/send/target');
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

  useEffect(() => {}, [isSelectMode]);

  /* 꿀 옮기기 프로세스 관련 함수 */
  const handleHoneyMove = () => {
    setHoneyMoveModalOpen(true);
  };

  const handleHoneyMoveModalClose = async () => {
    setHoneyMoveModalOpen(false);
    setSelectedGroup(null);
  };

  const handleGroupSelectionConfirm = (groupId: number | null) => {
    if (groupId !== null) {
      setSelectedGroup(groupId);
      setHoneyMoveModalOpen(false);
      setHoneyMoveCheckModalOpen(true);
    }
  };

  const handleHoneyMoveCheckModalClose = async () => {
    setHoneyMoveCheckModalOpen(false);
    setSelectedGroup(null);
  };

  const handleHoneyMoveCheckModalConfirm = async () => {
    // 꿀 옮기기 API
    setHoneyMoveCheckModalOpen(false);
    handleCandleHoneyMove();

    // 꿀 옮기기 성공 시 토스트 메세지

    showMoveToast('성공적으로 꿀을 옮겼어요', `/group/${selectedGroup}`);
  };

  /* 꿀 옮기기 취소 관련 함수 */
  const handleCandleHoneyMove = () => {
    setShowCancelModal(false);
    setIsSelectMode(false);
  };

  /* 꿀 상세보기 관련 함수*/
  const handleSaveDetailHoney = () => {
    // 이미지 저장하기
    closeDetailModal();
  };

  const handleCloseDetailHoney = () => {
    closeDetailModal();
  };

  const handleShowHoneyMoveModal = () => {
    setHoneyMoveModalOpen(true);
    closeDetailModal();
  };

  const handleShowHoneyDeleteModal = () => {
    closeDetailModal();
  };

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
        <Label>
          이 그룹에서 받은 꿀도장{' '}
          <Info>
            각 꿀도장 카드에 적힌 숫자는
            <br />
            <Strong>
              ‘이 그룹에서 받은 꿀도장 개수 / 모든 그룹
              <br />
              에서 받은 꿀도장 개수’
            </Strong>
            를 의미합니다.
          </Info>
        </Label>
        <TotalStampList>
          {TOTAL_STAMP_DUMMY.map((item, index) => (
            <StampCard
              key={index}
              imgUrl={item.imgUrl || '/assets/images/stamp/stamp-example.svg'}
              stampName={item.stampName}
              count={item.count}
              totalCount={item.totalCount}
            />
          ))}
        </TotalStampList>
        <Guide>꿀도장 카드를 좌우로 넘겨 확인하세요.</Guide>
      </TotalHoneyContainer>
      <ButtonWrapper>
        <Button
          variant="normal"
          text="해당 그룹에게 꿀 보내기"
          onClick={handleWriteCompliment}
        />
      </ButtonWrapper>
      <BottomSheet
        title="꿀도장 현황"
        initialHeight="250px"
        expandedHeight="642px"
        background="/assets/images/group/stamp/stamp-modal-backgroud.svg"
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
          isSelectMode={isSelectMode}
          onSelectedChange={(count: number) => setSelectedCount(count)}
        />
        {/* 그룹명 수정 및 삭제 */}
        <EditGroupNameModal
          isVisible={showEditGroupNameModal}
          onClose={() => setShowEditGroupNameModal(false)}
          onConfirm={handleEditGroupName}
          groupName={groupName}
          setGroupName={setGroupName}
        />
        {/* 꿀 이동 및 삭제 버튼 */}
        {isSelectMode && (
          <SelectActionButtonWrapper>
            <Button
              text="다른 그룹으로 꿀 옮기기"
              variant="warning"
              disabled={selectedCount === 0}
              onClick={handleHoneyMove}
            />
            <Button
              text=""
              variant="activate"
              icon={
                <img
                  src="/assets/icons/trash.svg"
                  width={28}
                  height={28}
                  alt="삭제"
                />
              }
              width="54px"
              height="54px"
              background={theme.colors.warning90}
              disabled={selectedCount === 0}
            />
          </SelectActionButtonWrapper>
        )}
        {/* 꿀 옮기기 그룹 선택 모달 */}
        <HoneyMoveModal
          isVisible={isHoneyMoveModalOpen}
          onClose={handleHoneyMoveModalClose}
          onConfirm={handleGroupSelectionConfirm}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          groupId={Number(id)}
        />
        {/* 꿀 옮기기 확인 모달 */}
        <HoneyMoveCheckModal
          isVisible={isHoneyMoveCheckModalOpen}
          onClose={handleHoneyMoveCheckModalClose}
          onConfirm={handleHoneyMoveCheckModalConfirm}
          selectedGroup={selectedGroup}
          groupId={Number(id)}
          selectedCount={selectedCount}
        />
        {showCancelModal && (
          <WarningModal
            title="꿀 옮기기를 취소하시겠어요?"
            description="지금 나가면 변경된 내용은 저장되지 않습니다."
            cancelText="이전"
            confirmText="나가기"
            onCancel={() => setShowCancelModal(false)}
            onConfirm={handleCandleHoneyMove}
          />
        )}
      </BottomSheet>
      {/* 꿀 상세보기 */}
      {isDetailModalOpen && (
        <DetailHoneyModal
          profileImg={modalContent.profileImg}
          groupName="groupName"
          date={modalContent.date}
          nameType={modalContent.nameType}
          name={modalContent.name}
          content={modalContent.content}
          stampImage={modalContent.imgUrl}
          onConfirm={handleSaveDetailHoney}
          onClose={handleCloseDetailHoney}
          onHoneyMove={handleShowHoneyMoveModal}
          onHoneyDelete={handleShowHoneyDeleteModal}
        />
      )}
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.gray80};
  ${theme.typography.body03};
  text-align: left;
`;

const Strong = styled.span`
  ${theme.typography.subtitle4};
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

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

const DisplayToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

const SelectActionButtonWrapper = styled.div`
  width: 100%;
  padding: 0 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 13px;
  left: 50%;
  transform: translateX(-50%);
`;

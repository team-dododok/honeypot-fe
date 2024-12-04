import { PatchGroupChange } from '@/api/group/types/Group';
import { GroupReceivePraiseInfo } from '@/api/receivedPraise/types/ReceivedPraise';
import { GroupSendPraiseInfo } from '@/api/sendPraise/types/SendPraise';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/Button/Button';
import SelectButton from '@/components/Button/SelectButton';
import BackHeader from '@/components/Header/BackHeader';
import Info from '@/components/Info/Info';
import ToastModal from '@/components/Modal/ToastModal';
import WarningModal from '@/components/Modal/WarningModal';
import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import TabToggle from '@/components/Toggle/TabToggle';
// import { HONEY_TOGGLE } from '@/constants/toggle';
import DetailHoneyModal from '@/features/Compliment/components/Modal/DetailHoneyModal';
import HoneyMoveCheckModal from '@/features/Compliment/components/Modal/HoneyMoveCheckModal';
import HoneyMoveModal from '@/features/Compliment/components/Modal/HoneyMoveModal';
import { HoneyLetter } from '@/features/Compliment/types/HoneyLetter';
import GroupTabContainer from '@/features/Group/components/Container/GroupTabContainer';
import EditGroupNameModal from '@/features/Group/components/Modal/EditGroupNameModal';
import StampCard from '@/features/Stamp/components/Stamp/StampCard';
import { useGroupDetail } from '@/hooks/group/useGroupDetail';
import { usePatchGroup } from '@/hooks/group/usePatchGroup';
import { usePatchReceiveGroupChange } from '@/hooks/group/usePatchReceiveGroupChange';
import { usePatchSendGroupChange } from '@/hooks/group/usePatchSendGroupChange';
import { useDeleteReceivedPraise } from '@/hooks/receivedPraise/useDeleteReceivedPraise';
import { useGroupReceivedPraise } from '@/hooks/receivedPraise/useGroupReceivedPraise';
import { useGroupSendPraise } from '@/hooks/sendPraise/useGroupSendPraise';
import { useReceiveStamp } from '@/hooks/stamp/useReceiveStamp';
import { useDetailHoneyModalStore } from '@/store/useDetailHoneyModalStore';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showMoveToast } = useToast();
  /* 그룹 ID, 페이지 크기 */
  const { id } = useParams();
  const groupId = Number(id) || 0;
  const pageSize = 10;
  const { isDetailModalOpen, modalContent, openDetailModal, closeDetailModal } =
    useDetailHoneyModalStore();

  const { data: groupInfo } = useGroupDetail(parseInt(id || '0'));
  const { data: totalStamp } = useReceiveStamp(parseInt(id || '0'));
  const { mutate: deletePraise } = useDeleteReceivedPraise();
  const { data: receivedPraiseData, refetch: refetchReceivedPraise } =
    useGroupReceivedPraise({
      groupId: parseInt(id || '0'),
      size: 10,
      page: 0,
    });
  const { data: sendPraiseData, refetch: refetchSendPraise } =
    useGroupSendPraise({
      groupId: parseInt(id || '0'),
      size: 10,
      page: 0,
    });

  const { mutate: sendGroupChange } = usePatchSendGroupChange();
  const { mutate: receiveGroupChange } = usePatchReceiveGroupChange();

  /* 보낸 꿀, 받은 꿀 탭 */
  const searchParams = new URLSearchParams(location.search);
  const tabValue = searchParams.get('tab') || 'send';

  /* 받은 꿀, 보낸 꿀 갯수 */
  const [receivedPraiseCount, setReceivedPraiseCount] = useState<number>(0);
  const [sendPraiseCount, setSendPraiseCount] = useState<number>(0);

  const [letters, setLetters] = useState<HoneyLetter[]>([]);

  /* 보기 탭 */
  const [selectedDisplay, setSelectedDisplay] = useState<ToggleType>('honey');
  const totalStampList = totalStamp?.stampInfoByGroupDtos || [];
  const [groupName, setGroupName] = useState<string>('');
  const praiseCount = groupInfo?.praiseCount;
  const title = `${groupInfo?.groupName || ''} (${praiseCount || 0})`;

  useEffect(() => {
    if (groupInfo?.groupName) {
      setGroupName(groupInfo.groupName);
    }
  }, [groupInfo]);

  /* 선택 모드 및 선택한 id 배열 */
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* 꿀 옮기기 모달 */
  const [isHoneyMoveModalOpen, setHoneyMoveModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [isHoneyMoveCheckModalOpen, setHoneyMoveCheckModalOpen] =
    useState(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  /* 그룹명 편집 모달 */
  const [showEditGroupNameModal, setShowEditGroupNameModal] =
    useState<boolean>(false);

  /* 꿀 삭제 모달 */
  const [showDeleteWarningModal, setShowDeleteWarningModal] =
    useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);

  /* 받은 꿀 저장 완료 모달 */
  const [showToastModal, setShowToastModal] = useState<boolean>(false);

  /* React Query 호출 */
  const queryHook =
    tabValue === 'receive'
      ? useGroupReceivedPraise({
          groupId,
          size: pageSize,
          page: 0,
        })
      : tabValue === 'send'
        ? useGroupSendPraise({
            groupId,
            size: pageSize,
            page: 0,
          })
        : null;

  const data = queryHook?.data;
  const fetchNextPage = queryHook?.fetchNextPage;
  const hasNextPage = queryHook?.hasNextPage;
  const isFetching = queryHook?.isFetching;

  /* 페이지 끝까지 데이터 가져오기 */
  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage?.();
    }
  }, [hasNextPage, isFetching]);

  useEffect(() => {
    if (tabValue === 'send') {
      setLetters(
        data
          ? data.pages.flatMap((page) =>
              (page as GroupSendPraiseInfo).sendPraiseInfos.map((praise) => ({
                id: praise.sendPraiseId,
                sender: praise.name,
                receiver: praise.name,
                content: praise.content,
                stampUrl: praise.stampUrl,
                profileImageUrl: praise.profileImageUrl,
                date: praise.sendDate,
              }))
            )
          : []
      );
    } else if (tabValue === 'receive') {
      setLetters(
        data
          ? data.pages.flatMap((page) =>
              (page as GroupReceivePraiseInfo).receivePraiseInfos.map(
                (praise) => ({
                  id: praise.receivePraiseId,
                  sender: praise.name,
                  receiver: praise.name,
                  content: praise.content,
                  stampUrl: praise.stampUrl,
                  profileImageUrl: praise.profileImageUrl,
                  date: praise.receiveDate,
                })
              )
            )
          : []
      );
    }
  }, [tabValue, data]);

  useEffect(() => {
    setReceivedPraiseCount(
      receivedPraiseData?.pages[0].pageInfo.totalElements || 0
    );
    setSendPraiseCount(sendPraiseData?.pages[0].pageInfo.totalElements || 0);
  }, [receivedPraiseData, sendPraiseData]);

  /* 받은 꿀 저장 완료 안내 모달 */
  useEffect(() => {
    if (location.state?.showToast) {
      setShowToastModal(true);
      const timer = setTimeout(() => {
        setShowToastModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state?.showToast]);

  const handleToggle = () => {
    if (isSelectMode && selectedIds.length > 0) {
      setShowCancelModal(true);
    } else {
      setIsSelectMode(!isSelectMode);
    }
  };

  const handleShowEditModal = () => {
    setShowEditGroupNameModal(true);
  };

  const { mutate } = usePatchGroup();

  /* 그룹명 수정 API */
  const handleEditGroupName = () => {
    mutate(
      { groupId: Number(id), groupName },
      {
        onSuccess: () => {
          setShowEditGroupNameModal(false);
        },
      }
    );
  };

  const handleWriteCompliment = () => {
    navigate('/compliment/send/target');
  };

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

  /* 꿀 옮기기 */
  const handleHoneyMoveCheckModalConfirm = async () => {
    const patchData: PatchGroupChange = {
      praiseIdList: selectedIds,
      groupId: selectedGroup || 0,
    };

    if (tabValue === 'send') {
      console.log(patchData);
      sendGroupChange(patchData, {
        onSuccess: () => {
          setLetters((prevLetters) =>
            prevLetters.filter((letter) => !selectedIds.includes(letter.id))
          );

          // 받은 꿀과 보낸 꿀 갯수 업데이트
          refetchReceivedPraise();
          refetchSendPraise();
          showMoveToast('성공적으로 꿀을 옮겼어요', `/group/${selectedGroup}`);
        },
      });
    } else if (tabValue === 'receive') {
      receiveGroupChange(patchData, {
        onSuccess: () => {
          setLetters((prevLetters) =>
            prevLetters.filter((letter) => !selectedIds.includes(letter.id))
          );

          // 받은 꿀과 보낸 꿀 갯수 업데이트
          refetchReceivedPraise();
          refetchSendPraise();
          showMoveToast('성공적으로 꿀을 옮겼어요', `/group/${selectedGroup}`);
        },
      });
    }

    setHoneyMoveCheckModalOpen(false);
    handleCandleHoneyMove();
  };

  /* 꿀 옮기기 취소 관련 함수 */
  const handleCandleHoneyMove = () => {
    setShowCancelModal(false);
    setIsSelectMode(false);
  };

  /* 꿀 삭제하기 관련 함수*/
  const handleWarningDelete = () => {
    setShowDeleteWarningModal(true);
    closeDetailModal();
  };

  const handleCancelWarningDelete = (isDetail: boolean) => {
    if (isDetail) {
      setShowDeleteWarningModal(false);
      setSelectedIds([]);
      openDetailModal(modalContent);
    } else {
      setShowDeleteWarningModal(false);
    }
  };

  const handleHoneyDelete = () => {
    if (selectedIds.length > 0) {
      deletePraise(selectedIds, {
        onSuccess: () => {
          setIsSelectMode(false);
          setShowDeleteWarningModal(false);
          setSelectedIds([]);
          setLetters((prevLetters) =>
            prevLetters.filter((letter) => !selectedIds.includes(letter.id))
          );

          // 받은 꿀과 보낸 꿀 갯수 업데이트
          refetchReceivedPraise();
          refetchSendPraise();
        },
      });
    }
  };

  /* 꿀 상세보기 관련 함수*/
  const handleCloseDetailHoney = () => {
    closeDetailModal();
  };

  /* 꿀 상세보기 > 꿀 옮기기 */
  const handleShowHoneyMoveModal = (id: number) => {
    setSelectedIds([id]);
    setHoneyMoveModalOpen(true);
    closeDetailModal();
  };

  const handleTabClick = (id: string) => {
    navigate(`/group/${id}?tab=${id}`, { replace: true });
  };

  const onSelectedChange = useCallback((ids: number[]) => {
    setSelectedIds(ids);
  }, []);

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
          {totalStampList.map((item, index) => (
            <StampCard
              key={index}
              imgUrl={item.imageUrl}
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
      {/* 그룹명 수정 및 삭제 */}
      <EditGroupNameModal
        isVisible={showEditGroupNameModal}
        onClose={() => setShowEditGroupNameModal(false)}
        onConfirm={handleEditGroupName}
        groupName={groupName}
        setGroupName={setGroupName}
      />
      <BottomSheet
        title="꿀단지 현황"
        initialMargin={550}
        expandedMargin={110}
        background="/assets/images/group/stamp/stamp-modal-backgroud.svg"
      >
        <TabToggle
          // tabs={HONEY_TOGGLE}
          tabs={[
            { id: 0, tabName: '보낸 꿀', path: 'send', count: sendPraiseCount },
            {
              id: 1,
              tabName: '받은 꿀',
              path: 'receive',
              count: receivedPraiseCount,
            },
          ]}
          selected={tabValue === 'send' ? 0 : 1}
          originalPath={`/group/${1}`}
          onClick={(id) => handleTabClick(id === 0 ? 'send' : 'receive')}
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
          displayType={selectedDisplay}
          isSelectMode={isSelectMode}
          selectedIds={selectedIds}
          onSelectedChange={onSelectedChange}
          letters={letters}
        />
        {/* 꿀 이동 및 삭제 버튼 */}
        {isSelectMode && (
          <SelectActionButtonWrapper>
            <Button
              text="다른 그룹으로 꿀 옮기기"
              variant="warning"
              disabled={selectedIds.length === 0}
              onClick={handleHoneyMove}
            />
            {tabValue === 'receive' && (
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
                disabled={selectedIds.length === 0}
                onClick={() => {
                  setIsDetail(false);
                  handleWarningDelete();
                }}
              />
            )}
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
          selectedCount={selectedIds.length}
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
      {/* 꿀 삭제 경고 */}
      {showDeleteWarningModal && (
        <WarningModal
          title={`정말 선택한 꿀을\n삭제하시겠어요?`}
          description="삭제한 꿀은 복구할 수 없어요."
          image={true}
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => {
            handleCancelWarningDelete(isDetail);
          }}
          onConfirm={handleHoneyDelete}
        />
      )}
      {/* 꿀 상세보기 */}
      {isDetailModalOpen && (
        <DetailHoneyModal
          profileImg={modalContent.profileImg}
          groupName={groupInfo?.groupName || ''}
          date={modalContent.date}
          nameType={modalContent.nameType}
          name={modalContent.name}
          content={modalContent.content}
          stampImage={modalContent.imgUrl}
          onClose={handleCloseDetailHoney}
          onHoneyMove={() => {
            handleShowHoneyMoveModal(modalContent.id);
          }}
          onHoneyDelete={() => {
            setIsDetail(true);
            setSelectedIds([modalContent.id]);
            handleWarningDelete();
          }}
        />
      )}
      {/* 꿀 저장 성공 모달*/}
      <ToastModal
        isVisible={showToastModal}
        image={<object data="/assets/images/saved.svg" />}
        text="꿀이 저장되었어요!"
        onClose={() => {
          setShowToastModal(false);
        }}
      />
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

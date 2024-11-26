import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import Check from '@/components/Check/Check';
import Input from '@/components/Input/Input';
import WarningModal from '@/components/Modal/WarningModal';
import { CHECK_COMPLIMENT_OPTIONS } from '@/constants/check';
import GroupModal from '@/features/Group/components/Modal/GroupModal';
import {
  CommonLayout,
  BottomWrapper,
  Container,
  Label,
  ProgressBarWrapper,
} from '@/layouts/FormLayoutStyles';
import { useSendComplimentStore } from '@/store/useSendComplimentStore';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { history } from '@/utils/history';

const ComplimentSendTargetPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    receiverName,
    setReceiverName,
    groupName,
    setGroupName,
    setGroupId,
    ongoing,
    setOngoing,
    clearState,
  } = useSendComplimentStore();
  const [showGroupModal, setShowGroupModal] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action !== 'POP') return;
      if (receiverName || groupName || ongoing !== null) {
        setShowModal(true);
        history.push(pathname);
      }
    });
    return unlistenHistoryEvent;
  }, [receiverName, groupName, ongoing]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverName(e.target.value);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleGroupClick = () => {
    setShowGroupModal(true);
  };

  const handleGroupConfirm = (
    selectedGroupName: string,
    selectedGroupId: number
  ) => {
    setGroupName(selectedGroupName);
    setGroupId(selectedGroupId);
    setShowGroupModal(false);
  };

  const handleCheck = (id: number) => {
    setOngoing(id);
  };

  const handleButtonClick = () => {
    navigate('/compliment/send/content');
  };

  const handleModalCancel = () => {
    setShowModal(false);
    clearState();
    navigate(-1);
  };

  return (
    <CommonLayout>
      <ProgressBarWrapper marginBottom="52px">
        <ProgressBar current={1} total={2} />
      </ProgressBarWrapper>
      <Container>
        <LabelWrapper>
          <Label marginBottom="4px" typography="subtitle1">
            칭찬하고 싶은 팀원의 이름을 적어주세요.
          </Label>
          <Description>본명을 적어주세요.</Description>
          <Input
            width="100%"
            placeholder="ex. 도도독사우루스"
            clear={true}
            value={receiverName}
            onChange={handleNameChange}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label marginBottom="4px" typography="subtitle1">
            함께하고 있는 그룹명을 적어주세요.
          </Label>
          <Description>그룹명은 추후에 수정할 수 있어요.</Description>
          <Input
            width="100%"
            placeholder="ex. 꿀단지 만들기 프로젝트"
            clear={true}
            value={groupName}
            onChange={handleGroupChange}
            onClick={handleGroupClick}
            readOnly={true}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label marginBottom="14px" typography="subtitle1">
            해당 프로젝트는 현재 진행 중인가요?
          </Label>
          <CheckList>
            {CHECK_COMPLIMENT_OPTIONS.map((option) => (
              <Check
                key={option.id}
                variant="circle"
                label={option.label}
                isChecked={ongoing === option.id}
                onChange={() => handleCheck(option.id)}
              />
            ))}
          </CheckList>
        </LabelWrapper>
      </Container>
      <BottomWrapper>
        <Button
          text="다음"
          variant="activate"
          onClick={handleButtonClick}
          disabled={!receiverName || !groupName || ongoing === null}
        />
      </BottomWrapper>
      <GroupModal
        isVisible={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onConfirm={handleGroupConfirm}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      {showModal && (
        <WarningModal
          title="정말 나가시겠어요?"
          description="지금 나가면 작성한 내용은 저장되지 않아요."
          cancelText="나가기"
          confirmText="계속 작성하기"
          image={true}
          onCancel={handleModalCancel}
          onConfirm={() => setShowModal(false)}
        />
      )}
    </CommonLayout>
  );
};

export default ComplimentSendTargetPage;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  color: ${theme.colors.gray50};
  ${theme.typography.body4};
  margin-bottom: 14px;
`;
const CheckList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

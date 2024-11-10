import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import Check from '@/components/Check/Check';
import Input from '@/components/Input/Input';
import { CHECK_COMPLIMENT_OPTIONS } from '@/constants/check';
import GroupModal from '@/features/Group/components/Modal/GroupModal';
import { GROUP_LIST_DUMMY } from '@/features/Group/constant/dummy/groupList';
import { CommonLayout } from '@/features/Signup';
import {
  BottomWrapper,
  Container,
  Label,
  ProgressBarWrapper,
} from '@/features/Signup/layout/CommonLayout';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ComplimentSendTargetPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [state, setState] = useState<number>();
  const [showGroupModal, setShowGroupModal] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value);
  };

  const handleGroupClick = () => {
    setShowGroupModal(true);
  };

  const handleSelectedGroup = () => {
    setShowGroupModal(false);
    const selectedGroupName = GROUP_LIST_DUMMY.find(
      (group) => group.id === selectedGroup
    )?.groupName;
    if (selectedGroupName) {
      setGroup(selectedGroupName);
    }
  };

  const handleCheck = (id: number) => {
    setState(id);
  };

  const handleButtonClick = () => {
    navigate('/compliment/send/content');
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
            value={name}
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
            value={group}
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
                isChecked={state === option.id}
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
          disabled={!name || !group || state === null}
        />
      </BottomWrapper>
      <GroupModal
        isVisible={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onConfirm={handleSelectedGroup}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
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

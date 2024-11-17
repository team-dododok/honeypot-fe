import ProgressBar from '@/components/Bar/ProgressBar';
import BackButton from '@/components/Button/BackButton';
import Button from '@/components/Button/Button';
import Check from '@/components/Check/Check';
import Input from '@/components/Input/Input';
import LinedInput from '@/components/Input/LinedInput';
import BottomModal from '@/components/Modal/BottomModal';
import CenterModal from '@/components/Modal/CenterModal';
import WarningModal from '@/components/Modal/WarningModal';
import InfoModal from '@/features/Compliment/components/Modal/InfoModal';
import PreviewModal from '@/features/Compliment/components/Modal/PreviewModal';
import GroupModal from '@/features/Group/components/Modal/GroupModal';
import { GROUP_LIST_DUMMY } from '@/features/Group/constant/dummy/groupList';
import HoneyStamp from '@/features/Stamp/components/Stamp/HoneyStamp';
import StampModal from '@/features/Stamp/components/Modal/StampModal';
import StampCard from '@/features/Stamp/components/Stamp/StampCard';
import StampLabel from '@/features/Stamp/components/Stamp/StampLabel';
import StampList from '@/features/Stamp/components/Stamp/StampList';
import DisplayToggle, { ToggleType } from '@/components/Toggle/DisplayToggle';
import TabToggle from '@/components/Toggle/TabToggle';
import { HONEY_TOGGLE } from '@/constants/toggle';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import CloseModal from '@/components/Modal/CloseModal';
import LetterInfo from '@/features/Compliment/components/Frame/LetterInfo';
import ReadLetter from '@/features/Compliment/components/Letter/ReadLetter';
import DetailHoneyModal from '@/features/Compliment/components/Modal/DetailHoneyModal';
import Info from '@/components/Info/Info';
import ProcessModal from '@/components/Modal/ProcessModal';
import Badge from '@/features/Badge/components/Badge';

const GuidePage = () => {
  const { showToast, showMoveToast } = useToast();
  const [inputValue, setInputValue] = useState<string>('');
  const [checkValue, setCheckValue] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const [showBottomModal, setShowBottomModal] = useState<boolean>(false);
  const [showCenterModal, setShowCenterModal] = useState<boolean>(false);
  const [showCloseModal, setShowCloseModal] = useState<boolean>(false);
  const [showProcessModal, setShowProcessModal] = useState<boolean>(false);
  const [group, setGroup] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showGroupModal, setShowGroupModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [stampType, setStampType] = useState<number | null>(null);
  const [showSelectedStampModal, setShowSelectedStampModal] =
    useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [isHoneyStamp, setIsHoneyStamp] = useState<number | null>(null);
  const [selectedTabToggle, setSelectedTabToggle] = useState<number>(0);
  const [selectedGroupToggle, setSelectedGroupToggle] =
    useState<ToggleType>('card');
  const [selectedStampToggle, setSelectedStampToggle] =
    useState<ToggleType>('honey');
  const [showDetailHoneyModal, setShowDetailHoneyModal] =
    useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheck = () => {
    setCheckValue(!checkValue);
  };

  const handleToast = () => {
    showToast('Toast Example', 3000, {
      bottom: '81px',
    });
  };

  const handleMoveToast = () => {
    showMoveToast('Toast Move Example (go to login)', '/login', 3000, {
      bottom: '81px',
    });
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleModalImage = () => {
    setShowModalImage(true);
  };

  const handleShowGroup = () => {
    setShowGroupModal(true);
  };

  const handleSelectedGroup = () => {
    setShowGroupModal(false);
    console.log(group);
    const selectedGroupName = GROUP_LIST_DUMMY.find(
      (group) => group.id === selectedGroup
    )?.groupName;
    if (selectedGroupName) {
      setGroup(selectedGroupName);
    }
  };

  const handleShowInfo = () => {
    setShowInfoModal(!showInfoModal);
  };

  const handleShowSelectedStamp = () => {
    setShowSelectedStampModal(!showSelectedStampModal);
  };

  const handleShowPreview = () => {
    setShowPreviewModal(!showPreviewModal);
  };

  const handleShowDetailHoney = () => {
    setShowDetailHoneyModal(!showDetailHoneyModal);
  };

  return (
    <Container>
      <h2>Guide</h2>
      <Elements>
        <h3>Button</h3>
        <Button text="Normal" />
        <Button
          text="Normal Icon"
          icon={<img src="/assets/icons/download.svg" alt="Download" />}
        />
        <Button text="Default" variant="default" />
        <Button text="Deactivate" variant="deactivate" />
        <Button text="Activate" variant="activate" />
        <Button text="Danger" variant="danger" />
        <Button text="Warning" variant="warning" />
      </Elements>
      <Elements>
        <h3>Floating Button</h3>
        <Button
          text=""
          icon={
            <img
              src="/assets/icons/download.svg"
              width={20}
              height={20}
              alt="Download"
            />
          }
          width="32px"
          height="32px"
          padding="0px"
          borderRadius="50%"
        />
        <Button
          text={`수정\n예정`}
          width="56px"
          height="56px"
          padding="9px 17px"
          borderRadius="24px"
          typography="body5"
        />
      </Elements>
      <Elements>
        <h3>Back Button</h3>
        <BackButton to={'/'} />
      </Elements>
      <Elements>
        <h3>Input</h3>
        <Input
          width="100%"
          placeholder="Input"
          clear={false}
          value={inputValue}
          onChange={handleInput}
        />
        <Input
          width="100%"
          placeholder="Clear Input"
          clear={true}
          value={inputValue}
          onChange={handleInput}
        />
        <LinedInput
          placeholder="Lined Input"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </Elements>
      <Elements>
        <h3>Check</h3>
        <Check
          variant="circle"
          label="Check Circle"
          isChecked={checkValue}
          onChange={handleCheck}
        />
        <Check
          variant="default"
          label="Check Default"
          isChecked={checkValue}
          onChange={handleCheck}
        />
        <Check
          variant="radio"
          label="Check Radio"
          isChecked={checkValue}
          onChange={handleCheck}
        />
      </Elements>
      <Elements>
        <h3>Toast</h3>
        <Button text="show Default Toast" onClick={handleToast} />
        <Button text="show Move Toast" onClick={handleMoveToast} />
      </Elements>
      <Elements>
        <h3>Progress Bar</h3>
        <ProgressBar current={1} total={4} />
      </Elements>
      <Elements>
        <h3>Toggle</h3>
        <Elements>
          <h4>TabToggle</h4>
          <TabToggle
            tabs={HONEY_TOGGLE}
            selected={selectedTabToggle}
            onClick={(id) => {
              setSelectedTabToggle(id);
            }}
          />
        </Elements>
        <Elements>
          <h4>DisplayToggle</h4>
          <DisplayToggle
            displayType="group"
            selected={selectedGroupToggle}
            disabled={false}
            onClick={(type) => setSelectedGroupToggle(type)}
          />
          <DisplayToggle
            displayType="group"
            selected={selectedGroupToggle}
            disabled={true}
            onClick={(type) => setSelectedGroupToggle(type)}
          />
          <DisplayToggle
            displayType="stamp"
            selected={selectedStampToggle}
            disabled={false}
            onClick={(type) => setSelectedStampToggle(type)}
          />
          <DisplayToggle
            displayType="stamp"
            selected={selectedStampToggle}
            disabled={true}
            onClick={(type) => setSelectedStampToggle(type)}
          />
        </Elements>
      </Elements>
      <Elements>
        <h3>Warning Modal</h3>
        <Button
          text="show Warning Modal"
          variant="danger"
          onClick={handleModal}
        />
        <Button
          text="show Warning Modal (With Image)"
          variant="danger"
          onClick={handleModalImage}
        />
        {showModal && (
          <WarningModal
            title="Warning Modal"
            description="This is Description"
            cancelText="취소"
            confirmText="확인"
            onCancel={() => {
              setShowModal(false);
            }}
            onConfirm={() => {
              setShowModal(false);
            }}
          />
        )}
        {showModalImage && (
          <WarningModal
            title="Warning Modal"
            description="This is Description with image"
            image={true}
            cancelText="취소"
            confirmText="확인"
            onCancel={() => {
              setShowModalImage(false);
            }}
            onConfirm={() => {
              setShowModalImage(false);
            }}
          />
        )}
      </Elements>
      <Elements>
        <h3>Bottom Modal</h3>
        <Button
          text="show Bottom Modal"
          variant="activate"
          onClick={() => {
            setShowBottomModal(true);
          }}
        />
        {showBottomModal && (
          <BottomModal
            height="516px"
            title="Bottom Modal"
            onCancel={() => {
              setShowBottomModal(false);
            }}
            onConfirm={() => {
              setShowBottomModal(false);
            }}
            confirmDisabled={false}
            isVisible={true}
          >
            <Input
              width="100%"
              placeholder="Add the child you want."
              clear={true}
              value={''}
              onChange={() => {}}
            />
          </BottomModal>
        )}
      </Elements>
      <Elements>
        <h3>Center Modal</h3>
        <Button
          text="show Center Modal"
          variant="activate"
          onClick={() => {
            setShowCenterModal(true);
          }}
        />
        {showCenterModal && (
          <CenterModal
            title="Center Modal"
            confirmText="confirmText"
            onConfirm={() => {
              setShowCenterModal(false);
            }}
            disabled={false}
          >
            <Input
              width="100%"
              placeholder="Add the child you want."
              clear={true}
              value={''}
              onChange={() => {}}
            />
          </CenterModal>
        )}
      </Elements>
      <Elements>
        <h3>Close Modal</h3>
        <Button
          text="show Close Modal"
          variant="activate"
          onClick={() => {
            setShowCloseModal(true);
          }}
        />
        {showCloseModal && (
          <CloseModal
            confirmText="confirmText"
            onConfirm={() => {
              setShowCloseModal(false);
            }}
            onClose={() => {
              setShowCloseModal(false);
            }}
          ></CloseModal>
        )}
      </Elements>
      <Elements>
        <h3>Process Modal</h3>
        <Button
          text="show Process Modal"
          variant="activate"
          onClick={() => {
            setShowProcessModal(true);
          }}
        />
        {showProcessModal && (
          <ProcessModal
            height="400px"
            title="Process Modal"
            onCancel={() => {
              setShowProcessModal(false);
            }}
            onConfirm={() => {
              setShowProcessModal(false);
            }}
            confirmDisabled={false}
            isVisible={true}
          >
            <Input
              width="100%"
              placeholder="Add the child you want."
              clear={true}
              value={''}
              onChange={() => {}}
            />
          </ProcessModal>
        )}
      </Elements>
      <Elements>
        <h3>Stamp</h3>
        <p>확정 아니라 일부러 Gray로 넣어두었어요.</p>
        <Elements>
          <h4>Stamp Label</h4>
          <StampLabel
            id={0}
            image={'/assets/images/stamp/img-stamp-example.svg'}
            stampName={'StampName'}
            selected={0}
            onClick={() => {}}
          />
          <StampLabel
            id={0}
            image={'/assets/images/stamp/img-stamp-example.svg'}
            stampName={'StampName'}
            selected={1}
            onClick={() => {}}
          />
        </Elements>
        <Elements>
          <h4>Stamp Card</h4>
          <StampCard
            imgUrl={'/assets/images/stamp/img-stamp-example.svg'}
            stampName={'StampName'}
            count={3}
            totalCount={5}
          />
          <StampCard
            imgUrl={'/assets/images/stamp/img-stamp-example.svg'}
            stampName={'StampName'}
            count={0}
            totalCount={5}
          />
        </Elements>
        <Elements>
          <h4>Stamp List</h4>
          <StampList
            profileImg={''}
            nameType={'sender'}
            name={'받는 사람'}
            content={'content'}
            imgUrl={''}
            date={'2024-11-14'}
            selected={false}
            readOnly={true}
            onClick={() => {}}
          />
          <StampList
            profileImg={''}
            nameType={'receiver'}
            name={'보내는 사람'}
            content={'content'}
            imgUrl={''}
            date={'2024-11-14'}
            selected={false}
            readOnly={true}
            onClick={() => {}}
          />
        </Elements>
        <Elements>
          <h4>Honey Stamp</h4>
          <HoneyStamp
            profileImg={''}
            nameType={'receiver'}
            name={'sender'}
            content={'content'}
            imgUrl={''}
            date={'2024.05.01'}
            selected={isHoneyStamp === 1}
            readOnly={false}
            onClick={() => {
              if (isHoneyStamp === 1) {
                setIsHoneyStamp(null);
              } else {
                setIsHoneyStamp(1);
              }
            }}
          />
        </Elements>
      </Elements>
      <Elements>
        <h3>Modal Examples</h3>
        <Button text="show Group Modal" onClick={handleShowGroup} />
        <Button text="show Info Modal" onClick={handleShowInfo} />
        <Button text="show Stamp Modal" onClick={handleShowSelectedStamp} />
        <Button text="show Preview Modal" onClick={handleShowPreview} />
        <InfoModal showModal={showInfoModal} onClose={handleShowInfo} />
        <GroupModal
          isVisible={showGroupModal}
          onClose={() => setShowGroupModal(false)}
          onConfirm={handleSelectedGroup}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
        <StampModal
          showModal={showSelectedStampModal}
          onClose={handleShowSelectedStamp}
          stampType={stampType}
          setStampType={setStampType}
        />
        <PreviewModal
          showModal={showPreviewModal}
          onClose={handleShowPreview}
          receiver={'receiver'}
          sender={'sender'}
          content={'content'}
        />
      </Elements>
      <Elements>
        <h3>Compliment</h3>
        <Elements>
          <h4>Letter Info</h4>
          <LetterInfo
            profileImg=""
            groupName="groupName"
            date="2024.11.09"
            nameType="receiver"
            name="name"
          />
          <LetterInfo
            profileImg=""
            groupName="groupName"
            date="2024.11.09"
            nameType="sender"
            name="name"
          />
        </Elements>
        <Elements>
          <h4>Read Letter</h4>
          <ReadLetter
            content="텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트"
            stampImage=""
          />
        </Elements>
        <Elements>
          <h3>Modal Examples</h3>
          <Button
            text="show DetailHoney Modal"
            onClick={handleShowDetailHoney}
          />
          {showDetailHoneyModal && (
            <DetailHoneyModal
              profileImg=""
              groupName="groupName"
              date="2024.11.09"
              nameType="sender"
              name="name"
              content="텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트"
              stampImage=""
              onConfirm={handleShowDetailHoney}
              onClose={handleShowDetailHoney}
            />
          )}
        </Elements>
      </Elements>
      <Elements>
        <h3>Info</h3>
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
      </Elements>
      <Elements>
        <h3>Badge & BadgeModal</h3>
        <p>클릭해보세요!</p>
        <Badge
          id={0}
          name={'뱃지명'}
          goal={'달성 조건'}
          image=""
          isObtain={false}
          date=""
        />
        <Badge
          id={0}
          name={'뱃지명'}
          goal={'달성 조건'}
          image="/assets/images/badge/img-badge-get-1.svg"
          isObtain={true}
          date="2024-11-10"
        />
      </Elements>
    </Container>
  );
};

export default GuidePage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px;
  background-color: ${theme.colors.gray05};

  &::-webkit-scrollbar {
    display: none;
  }

  h3,
  h4 {
    margin-bottom: 10px;
  }
`;

const Elements = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 30px 0;
  border-bottom: 1px solid ${theme.colors.gray30};
`;

const Strong = styled.span`
  ${theme.typography.subtitle4};
`;

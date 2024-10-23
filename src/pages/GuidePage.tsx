import ProgressBar from '@/components/Bar/ProgressBar';
import BackButton from '@/components/Button/BackButton';
import Button from '@/components/Button/Button';
import Check from '@/components/Check/Check';
import Input from '@/components/Input/Input';
import WarningModal from '@/components/Modal/WarningModal';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const GuidePage = () => {
  const { showToast, showMoveToast } = useToast();
  const [inputValue, setInputValue] = useState<string>('');
  const [checkValue, setCheckValue] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);

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
            image={<img src="/assets/images/login/img-login-01.svg" />}
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
  background-color: ${theme.colors.gray00};

  &::-webkit-scrollbar {
    display: none;
  }

  h3 {
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

import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import {
  ProgressBarWrapper,
  BottomWrapper,
  CommonLayout,
  Label,
} from '@/layouts/FormLayoutStyles';
import { useSignUpStore } from '@/store/useSignupStore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpNamePage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const uuid = urlParams.get('uuid');
  const { name, setName } = useSignUpStore();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 8) {
      setName(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg('8자 이내로 입력해 주세요.');
    }
  };

  const handleButtonClick = () => {
    if (uuid) {
      navigate(`/signup/email?uuid=${uuid}`);
    } else {
      navigate(`/signup/email?`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <CommonLayout>
      <ProgressBarWrapper>
        <ProgressBar current={1} total={3} />
      </ProgressBarWrapper>
      <Label marginBottom="32px">사용하실 이름을 입력해 주세요.</Label>
      <Input
        width="100%"
        placeholder="ex. 나봉봉"
        clear={true}
        value={name}
        onChange={handleNameChange}
        errorMsg={errorMsg}
        onKeyDown={handleKeyDown}
      />
      <BottomWrapper>
        <Button
          text="다음"
          variant="activate"
          onClick={handleButtonClick}
          disabled={!name || errorMsg !== ''}
        />
      </BottomWrapper>
    </CommonLayout>
  );
};

export default SignUpNamePage;

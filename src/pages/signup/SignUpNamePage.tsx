import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { BottomWrapper, CommonLayout, Label } from '@/features/Signup';
import { OutletContext } from '@/layouts/SignupLayout';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SignUpNamePage = () => {
  const navigate = useNavigate();
  const { setPreviousPath } = useOutletContext<OutletContext>();
  const [name, setName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    setPreviousPath('/signup/agree');
  }, [setPreviousPath]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 8) {
      setName(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg('8자 이내로 입력해 주세요.');
    }
  };

  const handleButtonClick = () => {
    navigate('/signup/email');
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

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 28px;
`;

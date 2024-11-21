import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

const EmailUpdatePage = () => {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationButtonText, setVerificationButtonText] =
    useState('인증번호');
  const [timer, setTimer] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setVerificationError('유효시간이 만료되었어요.');
      setIsTimerActive(false);
      setVerificationSuccess(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (validateEmail(value)) {
      setIsEmailValid(true);
      setErrorMessage('');
    } else {
      setIsEmailValid(false);
      setErrorMessage('올바른 이메일 형식으로 입력해주세요.');
    }
  };

  const handleVerificationButtonClick = () => {
    setIsVerificationVisible(true);
    setVerificationButtonText('재전송');
    showToast('인증번호가 전송되었어요.');
    setTimer(300);
    setIsTimerActive(true);
    setVerificationError('');
  };

  const handleVerificationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
    setVerificationError('');
    setVerificationSuccess(false);
  };

  const handleVerifyClick = () => {
    if (verificationCode === '000000') {
      setVerificationSuccess(true);
      setVerificationError('');
      setIsTimerActive(false);
    } else {
      setVerificationError('인증번호가 일치하지 않아요.');
      setVerificationSuccess(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container>
      <Text>이메일 주소를 입력해주세요.</Text>
      <InputContainer>
        <InputBox>
          <StyledInput
            width="100%"
            placeholder="*****@***.***"
            clear={false}
            value={inputValue}
            onChange={handleInput}
          />
          <StyledButton
            text={verificationButtonText}
            variant={
              verificationSuccess
                ? 'deactivate'
                : isEmailValid
                  ? 'activate'
                  : 'default'
            }
            disabled={!isEmailValid || verificationSuccess}
            onClick={handleVerificationButtonClick}
          />
        </InputBox>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </InputContainer>

      {isVerificationVisible && (
        <>
          <Text>인증번호를 입력해 주세요.</Text>
          <InputContainer>
            <InputBox>
              <StyledInput
                width="100%"
                placeholder="인증번호 입력"
                clear={false}
                value={verificationCode}
                onChange={handleVerificationInput}
              />
              <StyledButton
                text={verificationSuccess ? '인증완료' : '인증하기'}
                variant={
                  verificationSuccess
                    ? 'deactivate'
                    : verificationCode
                      ? 'activate'
                      : 'default'
                }
                disabled={verificationSuccess || !verificationCode}
                onClick={handleVerifyClick}
              />
            </InputBox>
            {verificationError && <ErrorText>{verificationError}</ErrorText>}
            {verificationSuccess && <SuccessText>인증되었어요.</SuccessText>}
            <TimerBox>
              {!verificationSuccess && isTimerActive && (
                <TimerText>{formatTime(timer)}</TimerText>
              )}
            </TimerBox>
          </InputContainer>
        </>
      )}
    </Container>
  );
};

export default EmailUpdatePage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Text = styled.h1`
  ${theme.typography.body1};
  color: ${theme.colors.gray90};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 70%;
`;

const StyledButton = styled(Button)`
  width: 30%;
`;

const ErrorText = styled.p`
  color: ${theme.colors.error60};
  ${theme.typography.body3};
  margin: 0;
`;

const SuccessText = styled.p`
  color: ${theme.colors.success90};
  ${theme.typography.body3};
  margin: 0;
`;

const TimerBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TimerText = styled.p`
  color: ${theme.colors.gray70};
  ${theme.typography.body3};
  margin: 0;
`;

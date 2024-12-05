import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { EMAIL_REGEX } from '@/constants/regEx';
import { useSendEmail } from '@/hooks/email/useSendEmail';
import { useVerifyEmail } from '@/hooks/email/useVerifyEmail';
import { useMemberInfo } from '@/hooks/user/useMemberInfo';
import { BottomWrapper } from '@/layouts/FormLayoutStyles';
import { theme } from '@/styles/theme';
import { formatTime } from '@/utils/format';
import { setUpdateEmail } from '@/utils/storage';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailUpdatePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationButtonText, setVerificationButtonText] =
    useState('인증번호');
  const [timer, setTimer] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { data: member } = useMemberInfo();
  const { mutate: sendEmailMutate, isLoading: isSending } = useSendEmail();
  const { mutate: verifyEmailMutate } = useVerifyEmail();

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setVerificationCode('');
    setVerificationError('');
    setVerificationSuccess(false);
    setIsTimerActive(false);
    setVerificationButtonText('인증번호');
    setTimer(300);
  };

  const handleVerificationButtonClick = () => {
    if (email === member?.email) {
      setErrorMessage('현재 이메일과 동일합니다.');
    } else if (EMAIL_REGEX.test(email) || email.length === 0) {
      setVerificationError('');
      if (!isSending) {
        /* 인증 번호 전송 API */
        sendEmailMutate(email, {
          onSuccess: () => {
            setVerificationButtonText('재전송');
            setIsVerificationVisible(true);
            setVerificationCode('');
            setVerificationError('');
            setIsTimerActive(true);
            setErrorMessage('');
            setTimer(300);
          },
        });
      }
    } else {
      setErrorMessage('올바른 이메일 형식으로 입력해주세요.');
    }
  };

  const handleVerificationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) {
      setVerificationCode(e.target.value);
    }
    setVerificationError('');
    setVerificationSuccess(false);
  };

  const handleVerifyClick = () => {
    /* 인증 번호 검증 API */
    verifyEmailMutate(
      { email, code: verificationCode },
      {
        onSuccess: () => {
          setVerificationSuccess(true);
          setVerificationError('');
          setIsTimerActive(false);
        },
        onError: () => {
          setVerificationSuccess(false);
          if (timer === 0) {
            setVerificationError('유효시간이 만료되었어요.');
          } else {
            setVerificationError('인증번호가 일치하지 않아요.');
          }
        },
      }
    );
  };

  const handleSaveEmail = () => {
    setUpdateEmail(email);
    console.log(email);
    navigate('/profile/update');
  };

  return (
    <>
      <Container>
        <Text>이메일 주소를 입력해주세요.</Text>
        <InputContainer>
          <InputBox>
            <Input
              width="100%"
              placeholder="*****@***.***"
              clear={false}
              value={email}
              onChange={handleChangeEmail}
              errorMsg={errorMessage}
            />
            <Button
              width="35%"
              text={verificationButtonText}
              variant="activate"
              disabled={!email}
              onClick={handleVerificationButtonClick}
              loading={isSending}
            />
          </InputBox>
        </InputContainer>

        {isVerificationVisible && (
          <>
            <Text>인증번호를 입력해주세요.</Text>
            <InputContainer>
              <InputBox>
                <Input
                  width="100%"
                  placeholder="00000"
                  clear={false}
                  value={verificationCode}
                  onChange={handleVerificationInput}
                  errorMsg={verificationError}
                  successMsg={verificationSuccess ? '인증되었어요.' : ''}
                />
                <Button
                  width="35%"
                  text={verificationSuccess ? '인증완료' : '인증하기'}
                  variant="activate"
                  disabled={
                    !verificationCode ||
                    verificationButtonText === '인증번호' ||
                    timer === 0
                  }
                  onClick={handleVerifyClick}
                />
              </InputBox>
              <TimerBox>
                {!verificationSuccess && isTimerActive && (
                  <TimerText>{formatTime(timer)}</TimerText>
                )}
              </TimerBox>
            </InputContainer>
          </>
        )}

        <BottomWrapper>
          <Button
            text="수정하기"
            variant={'activate'}
            disabled={!verificationSuccess}
            onClick={handleSaveEmail}
          />
        </BottomWrapper>
      </Container>
    </>
  );
};

export default EmailUpdatePage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px 0;
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

const TimerBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TimerText = styled.p`
  color: ${theme.colors.gray70};
  ${theme.typography.body3};
  margin: 0;
`;

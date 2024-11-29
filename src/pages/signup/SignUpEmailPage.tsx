import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { EMAIL_REGEX } from '@/constants/regEx';
import { useSendEmail } from '@/hooks/email/useSendEmail';
import { useVerifyEmail } from '@/hooks/email/useVerifyEmail';
import {
  BottomWrapper,
  CommonLayout,
  Label,
  Container,
  ProgressBarWrapper,
} from '@/layouts/FormLayoutStyles';
import { useSignUpStore } from '@/store/useSignupStore';
import { theme } from '@/styles/theme';
import { formatTime } from '@/utils/format';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpEmailPage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const uuid = urlParams.get('uuid');

  const { mutate: sendEmailMutate, isLoading: isSending } = useSendEmail();
  const { mutate: verifyEmailMutate } = useVerifyEmail();

  const { email, setEmail } = useSignUpStore();
  const { emailAuth, setEmailAuth } = useSignUpStore();
  /* 인증 완료 (인증코드 input, 인증되었어요 성공 메세지) */
  const { isAuthCompleted, setIsAuthCompleted } = useSignUpStore();

  /* 에러 메세지 */
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [successEmailAuth, setSuccessEmailAuth] = useState<string>('');
  const [errorEmailAuth, setErrorEmailAuth] = useState<string>('');

  const [isShowAuthInput, setIsShowAuthInput] = useState<boolean>(false);
  /* 인증 메일 전송 완료 (타이머, 재전송과 인증번호 버튼 텍스트 결정) */
  const [isSend, setIsSend] = useState<boolean>(false);
  const [leftTime, setLeftTime] = useState<number>(300);

  useEffect(() => {
    if (isAuthCompleted) {
      setIsShowAuthInput(true);
      setSuccessEmailAuth('인증되었어요.');
    }
  }, [isAuthCompleted]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* 인증 메일 전송 시 인증 상태 초기화 */
    if (isSend) {
      setIsAuthCompleted(false);
      setIsSend(false);
      setEmailAuth('');
      setSuccessEmailAuth('');
      setErrorEmailAuth('');
    }
    /* 인증 완료 상태에서 인증번호 변경 시 인증 상태 초기화 */
    if (isAuthCompleted) {
      setIsAuthCompleted(false);
      setEmailAuth('');
      setSuccessEmailAuth('');
    }
    setEmail(e.target.value);
    if (EMAIL_REGEX.test(e.target.value) || e.target.value.length === 0) {
      setErrorEmail('');
    } else {
      setErrorEmail('올바른 이메일 형식으로 입력해주세요.');
    }
  };

  const handleEmailAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* 인증 완료 상태에서 인증번호 변경 시 인증 상태 초기화 */
    const inputValue = e.target.value;
    // 숫자만 입력되도록
    if (/^\d*$/.test(inputValue)) {
      if (isAuthCompleted) {
        setIsAuthCompleted(false);
        setSuccessEmailAuth('');
      }
      setEmailAuth(e.target.value);
    }
  };

  const handleSendButtonClick = () => {
    if (!isSending) {
      /* 인증 번호 전송 API */
      sendEmailMutate(email, {
        onSuccess: () => {
          setEmailAuth('');
          setSuccessEmailAuth('');
          setErrorEmailAuth('');
          setIsSend(true);
          setIsShowAuthInput(true);
          setLeftTime(300);
        },
      });
    }
  };

  const handleAuthButtonClick = () => {
    /* 인증 번호 검증 API */
    verifyEmailMutate(
      { email, code: emailAuth },
      {
        onSuccess: () => {
          setSuccessEmailAuth('인증되었어요.');
          setIsAuthCompleted(true);
          setErrorEmailAuth('');
          setIsSend(false);
        },
        onError: () => {
          setSuccessEmailAuth('');
          if (leftTime === 0) {
            setErrorEmailAuth('유효시간이 만료되었어요.');
          } else {
            setErrorEmailAuth('인증번호가 일치하지 않아요.');
          }
        },
      }
    );
  };

  const handleNextButtonClick = () => {
    if (uuid) {
      navigate(`/signup/profile?uuid=${uuid}`);
    } else {
      navigate(`/signup/profile?`);
    }
  };

  /* 타이머 */
  useEffect(() => {
    let timer: number | null = null;
    if (isSend && leftTime > 0) {
      timer = setInterval(() => {
        setLeftTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (leftTime === 0) {
      setIsSend(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSend, leftTime]);

  return (
    <CommonLayout>
      <ProgressBarWrapper>
        <ProgressBar current={2} total={3} />
      </ProgressBarWrapper>
      <Label marginBottom="32px">이메일 주소를 입력해 주세요.</Label>
      <Container>
        <LabelWrapper>
          <InputWrapper>
            <Input
              width="100%"
              placeholder="ex. ddd.000@gmail.com"
              value={email}
              onChange={handleEmailChange}
              errorMsg={errorEmail}
            />
            <Button
              width="120px"
              text={isSend ? '재전송' : '인증번호'}
              variant="activate"
              onClick={handleSendButtonClick}
              disabled={!email || errorEmail !== ''}
              loading={isSending}
            />
          </InputWrapper>
        </LabelWrapper>
        {isShowAuthInput && (
          <LabelWrapper>
            <SLabel>인증번호를 입력해주세요.</SLabel>
            <InputWrapper>
              <Input
                width="100%"
                placeholder="000000"
                value={emailAuth}
                onChange={handleEmailAuthChange}
                successMsg={successEmailAuth}
                errorMsg={errorEmailAuth}
                disabled={isAuthCompleted}
              />
              <Button
                width="120px"
                text={isAuthCompleted ? '인증 완료' : '인증하기'}
                variant="activate"
                onClick={handleAuthButtonClick}
                disabled={!emailAuth || isAuthCompleted}
              />
            </InputWrapper>
            {isSend && <Timer>{formatTime(leftTime)}</Timer>}
          </LabelWrapper>
        )}
      </Container>
      <BottomWrapper>
        <Button
          text="다음"
          variant="activate"
          onClick={handleNextButtonClick}
          disabled={
            !isAuthCompleted ||
            !email ||
            !emailAuth ||
            errorEmail !== '' ||
            errorEmailAuth !== ''
          }
        />
      </BottomWrapper>
    </CommonLayout>
  );
};

export default SignUpEmailPage;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SLabel = styled.div`
  color: ${theme.colors.gray90};
  ${theme.typography.body2};
  margin-bottom: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const Timer = styled.div`
  position: absolute;
  bottom: -35px;
  right: 5px;
  color: ${theme.colors.gray80};
  ${theme.typography.body4};
`;

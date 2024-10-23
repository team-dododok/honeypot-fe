import ProgressBar from '@/components/Bar/ProgressBar';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { emailRegEx } from '@/constants/regEx';
import { BottomWrapper, CommonLayout, Label } from '@/features/Signup';
import { OutletContext } from '@/layouts/SignupLayout';
import { useToast } from '@/store/useToast';
import { theme } from '@/styles/theme';
import { formatTime } from '@/utils/format';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SignUpEmailPage = () => {
  const navigate = useNavigate();
  const { setPreviousPath } = useOutletContext<OutletContext>();
  const showToast = useToast((state) => state.showToast);

  const [email, setEmail] = useState<string>('');
  const [emailAuth, setEmailAuth] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [successEmailAuth, setSuccessEmailAuth] = useState<string>('');
  const [errorEmailAuth, setErrorEmailAuth] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [leftTime, setLeftTime] = useState<number>(300);

  useEffect(() => {
    setPreviousPath('/signup/name');
  }, [setPreviousPath]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailRegEx.test(email) || e.target.value.length === 0) {
      setErrorEmail('');
    } else {
      setErrorEmail('올바른 이메일 형식으로 입력해주세요.');
    }
  };

  const handleEmailAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAuth(e.target.value);
  };

  const handleSendButtonClick = () => {
    /* 인증 번호 전송 API */
    showToast('인증번호가 전송되었어요.', 3000, {
      bottom: '81px',
    });
    setIsSend(true);
    setLeftTime(300);
  };

  const handleAuthButtonClick = () => {
    /* 인증 번호 검증 API */
    // 성공 시
    setSuccessEmailAuth('인증되었어요.');
    setErrorEmailAuth('');
    // 실패 시
    // setSuccessEmailAuth('');
    // setErrorEmailAuth('인증번호가 일치하지 않아요.');
  };

  const handleNextButtonClick = () => {
    navigate('/signup/profile');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
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
            />
          </InputWrapper>
        </LabelWrapper>
        {isSend && (
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
              />
              <Button
                width="120px"
                text="인증하기"
                variant="activate"
                onClick={handleAuthButtonClick}
                disabled={!emailAuth}
              />
            </InputWrapper>
            <Timer>{formatTime(leftTime)}</Timer>
          </LabelWrapper>
        )}
      </Container>
      <BottomWrapper>
        <Button
          text="다음"
          variant="activate"
          onClick={handleNextButtonClick}
          disabled={
            !email || !emailAuth || errorEmail !== '' || errorEmailAuth !== ''
          }
        />
      </BottomWrapper>
    </CommonLayout>
  );
};

export default SignUpEmailPage;

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 28px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

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

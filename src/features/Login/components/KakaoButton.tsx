import Button from '@/components/Button/Button';
import React from 'react';
import { KAKAO_AUTH_URL } from '../services/oauth';

const KakaoButton = () => {
  const handleButtonClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Button
      text="카카오톡으로 로그인"
      icon={<img src="/assets/icons/kakao.svg" alt="kakao" />}
      background="#FEE500"
      color="#4A4642"
      onClick={handleButtonClick}
    />
  );
};

export default KakaoButton;

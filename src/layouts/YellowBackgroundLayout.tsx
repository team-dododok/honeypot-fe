import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';

const YellowBackgroundLayout = () => {
  return (
    <Layout>
      <BongBongFace
        src="/assets/images/compliment/bongbong-background-face.svg"
        alt="봉봉이"
        top="50px"
        left="-60px"
        rotate="-30deg"
      />
      <BongBongFace
        src="/assets/images/compliment/bongbong-background-face.svg"
        width={265}
        height={221}
        alt="봉봉이"
        bottom="0px"
        right="-50px"
        rotate="25deg"
      />
      <Outlet />
    </Layout>
  );
};

export default YellowBackgroundLayout;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 33px;
  position: relative;
  background: ${theme.colors.brand05};
  overflow: hidden;
`;

const BongBongFace = styled.img<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: string;
}>`
  position: absolute;
  ${({ top, bottom, left, right }) => css`
    ${top ? `top: ${top};` : ''}
    ${bottom ? `bottom: ${bottom};` : ''}
    ${left ? `left: ${left};` : ''}
    ${right ? `right: ${right};` : ''}
  `}
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(${rotate});
    `}
`;

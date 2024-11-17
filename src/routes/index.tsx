import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/login/LoginPage';
import GroupPage from '@/pages/group/GroupPage';
import GroupDetailPage from '@/pages/group/GroupDetailPage';
import SignUpAgreePage from '@/pages/signup/SignUpAgreePage';
import SignUpNamePage from '@/pages/signup/SignUpNamePage';
import SignUpEmailPage from '@/pages/signup/SignUpEmailPage';
import SignUpProfilePage from '@/pages/signup/SignUpProfilePage';
import SignUpCompletePage from '@/pages/signup/SignUpCompletePage';
import GuidePage from '@/pages/GuidePage';
import MainLayout from '@/layouts/MainLayout';
import SubLayout from '@/layouts/SubLayout';
import ComplimentSendTargetPage from '@/pages/compliment/send/ComplimentSendTargetPage';
import ComplimentSendContentPage from '@/pages/compliment/send/ComplimentSendContentPage';
import ComplimentSendCompletePage from '@/pages/compliment/send/ComplimentSendCompletePage';
import ComplimentReceivePage from '@/pages/compliment/receive/ComplimentReceivePage';
import ProfileUpdatePage from '@/pages/profile/ProfileUpdatePage';
import KakaoPage from '@/pages/login/KakaoPage';
import GroupManagementPage from '@/pages/group/GroupManagementPage';
import BadgePage from '@/pages/badge/BadgePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: 'group',
        element: <GroupPage />,
      },
      {
        path: 'group/:id',
        element: <GroupDetailPage />,
      },
      {
        path: 'group',
        element: <SubLayout title="그룹 관리" padding="0px" />,
        children: [
          {
            path: 'management',
            element: <GroupManagementPage />,
          },
        ],
      },
      {
        path: 'badge',
        element: <BadgePage />,
      },
      {
        path: 'profile',
        element: <SubLayout title="프로필 수정" padding="0px" />,
        children: [
          {
            path: 'update',
            element: <ProfileUpdatePage />,
          },
        ],
      },
    ],
  },
  {
    path: 'guide',
    element: <GuidePage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'login/kakao',
    element: <KakaoPage />,
  },
  {
    path: 'signup',
    element: <SubLayout title="회원가입" />,
    children: [
      {
        path: 'agree',
        element: <SignUpAgreePage />,
      },
      {
        path: 'name',
        element: <SignUpNamePage />,
      },
      {
        path: 'email',
        element: <SignUpEmailPage />,
      },
      {
        path: 'profile',
        element: <SignUpProfilePage />,
      },
      {
        path: 'complete',
        element: <SignUpCompletePage />,
      },
    ],
  },
  {
    path: 'compliment',
    children: [
      {
        path: 'send',
        element: <SubLayout title="칭찬 보내기" />,
        children: [
          {
            path: 'target',
            element: <ComplimentSendTargetPage />,
          },
          {
            path: 'content',
            element: <ComplimentSendContentPage />,
          },
          {
            path: 'complete',
            element: <ComplimentSendCompletePage />,
          },
        ],
      },
      {
        path: 'receive',
        element: <SubLayout title="칭찬 받기" />,
        children: [
          {
            path: '',
            element: <ComplimentReceivePage />,
          },
        ],
      },
    ],
  },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;

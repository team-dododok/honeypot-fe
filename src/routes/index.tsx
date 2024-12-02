import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/login/LoginPage';
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
import AnnouncementPage from '@/pages/announcement/AnnouncementPage';
import ComplimentDetailPage from '@/pages/compliment/ComplimentDetailPage';
import YellowBackgroundLayout from '@/layouts/YellowBackgroundLayout';
import ProfilePage from '@/pages/profile/ProfilePage';
import EmailUpdatePage from '@/pages/profile/EmailUpdatePage';
import { theme } from '@/styles/theme';
import SettingTermsPage from '@/pages/setting/SettingTermsPage';
import AuthLayout from '@/layouts/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout background={theme.colors.gradient02} />,
        children: [{ index: true, element: <MainPage /> }],
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'group/:id', element: <GroupDetailPage /> },
          {
            path: 'group',
            element: <SubLayout title="그룹 관리" padding="0px" />,
            children: [
              { path: 'management', element: <GroupManagementPage /> },
            ],
          },
          { path: 'badge', element: <BadgePage /> },
          {
            path: 'announcement',
            element: <SubLayout title="공지" padding="0px" />,
            children: [{ path: '', element: <AnnouncementPage /> }],
          },
          {
            path: 'profile',
            element: <SubLayout title="마이페이지" padding="0px" />,
            children: [{ path: '', element: <ProfilePage /> }],
          },
          {
            path: 'profile',
            element: <SubLayout title="프로필 수정" padding="0px" />,
            children: [{ path: 'update', element: <ProfileUpdatePage /> }],
          },
          {
            path: 'email',
            element: <SubLayout title="이메일 수정" padding="0px" />,
            children: [{ path: 'update', element: <EmailUpdatePage /> }],
          },
          {
            path: 'setting',
            element: <SubLayout title="서비스 이용 약관" padding="0px" />,
            children: [{ path: 'terms', element: <SettingTermsPage /> }],
          },
        ],
      },
      { path: 'guide', element: <GuidePage /> },
      {
        path: 'compliment',
        children: [
          {
            path: 'send',
            element: <SubLayout title="칭찬 보내기" />,
            children: [
              { path: 'target', element: <ComplimentSendTargetPage /> },
              { path: 'content', element: <ComplimentSendContentPage /> },
            ],
          },
          { path: 'send/complete', element: <ComplimentSendCompletePage /> },
          {
            path: 'receive',
            element: <SubLayout title="칭찬 받기" />,
            children: [{ path: '', element: <ComplimentReceivePage /> }],
          },
        ],
      },
    ],
  },
  { path: 'login', element: <LoginPage /> },
  { path: 'login/kakao', element: <KakaoPage /> },
  {
    path: 'signup',
    element: <SubLayout title="회원가입" />,
    children: [
      { path: 'agree', element: <SignUpAgreePage /> },
      { path: 'name', element: <SignUpNamePage /> },
      { path: 'email', element: <SignUpEmailPage /> },
      { path: 'profile', element: <SignUpProfilePage /> },
    ],
  },
  { path: 'signup/complete', element: <SignUpCompletePage /> },
  {
    path: '/',
    element: <YellowBackgroundLayout />,
    children: [{ path: 'compliment/:id', element: <ComplimentDetailPage /> }],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;

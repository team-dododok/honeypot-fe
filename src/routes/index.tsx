import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import GroupPage from '@/pages/GroupPage';
import ProfilePage from '@/pages/ProfilePage';
import GroupDetailPage from '@/pages/GroupDetailPage';
import SignUpAgreePage from '@/pages/signup/SignUpAgreePage';
import SignUpNamePage from '@/pages/signup/SignUpNamePage';
import SignUpEmailPage from '@/pages/signup/SignUpEmailPage';
import SignUpProfilePage from '@/pages/signup/SignUpProfilePage';
import SignupLayout from '@/layouts/SignupLayout';
import SignUpCompletePage from '@/pages/signup/SignUpCompletePage';
import GuidePage from '@/pages/GuidePage';
import MainLayout from '@/layouts/MainLayout';

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
        path: 'profile',
        element: <ProfilePage />,
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
    path: 'signup',
    element: <SignupLayout />,
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
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;

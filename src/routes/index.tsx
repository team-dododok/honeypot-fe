import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import GroupPage from '@/pages/GroupPage';
import ProfilePage from '@/pages/ProfilePage';
import GroupDetailPage from '@/pages/GroupDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
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
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

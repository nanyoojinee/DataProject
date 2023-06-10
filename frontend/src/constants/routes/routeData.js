import React from 'react';
import MainPage from '../../pages/mains/Main';
import GroupList from '../../pages/groups/List';
import GroupDetailPage from '../../pages/groups/Detail';
import GroupWritePage from '../../pages/groups/Write';
import Mypage from '../../pages/mypages/Mypage';
import LoginPage from '../../pages/logins/Login';
import JoinPage from '../../pages/joins/Join';

export const ROUTE = {
  HOME: {
    path: '/',
    link: '/',
    element: <MainPage />,
  },
  GROUP_LIST: {
    path: '/groups',
    link: '/groups',
    element: <GroupList />,
  },
  GROUP_DETAIL: {
    path: '/groups/:id',
    link: '/groups',
    element: <GroupDetailPage />,
  },
  GROUP_WRITE: {
    path: '/groups/write',
    link: '/groups/write',
    element: <GroupWritePage />,
  },
  PAGE_GROUP: {
    path: '/mypage',
    link: '/mypage',
    element: <Mypage />,
  },
  LOGIN: {
    path: '/login',
    link: '/login',
    element: <LoginPage />,
  },
  JOIN: {
    path: '/register',
    link: '/register',
    element: <JoinPage page="join" />,
  },
  CHANGEINFO: {
    path: '/changeinfo',
    link: '/changeinfo',
    element: <JoinPage page="changeInfo" />,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);

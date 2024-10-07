import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import NotFoundPage from 'pages/404';
import NotAuthorizedPage from 'pages/403';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/notallowed',
      element: <NotAuthorizedPage />
    },
    {
      path: '*',
      element: <NotFoundPage /> // 404 Route
    }
  ]
};

export default LoginRoutes;

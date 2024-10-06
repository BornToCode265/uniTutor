import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import { useAuth } from 'contexts/auth-reducer/AuthContext';
import { Navigate } from 'react-router';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = () => {
  const { isLoggedIn } = useAuth(); // Access isLoggedIn from context
  return {
    path: '/',
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
    children: [
      {
        path: '/',
        element: <DashboardDefault />
      },
      {
        path: 'color',
        element: <Color />
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element: <DashboardDefault />
          }
        ]
      },
      {
        path: 'sample-page',
        element: <SamplePage />
      },
      {
        path: 'shadow',
        element: <Shadow />
      },
      {
        path: 'typography',
        element: <Typography />
      }
    ]
  };
};

export default MainRoutes;

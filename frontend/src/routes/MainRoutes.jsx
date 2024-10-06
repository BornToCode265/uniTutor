import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Admins from 'pages/Admin/Admins';
import Students from 'pages/Admin/Students';
import Tutors from 'pages/Admin/Tutors';
import AdminDashboard from 'pages/Admin/AdminDashboard';
import TutorDashboard from 'pages/Tutor/TutorDashboard';
import StudentDashboard from 'pages/Student/StudentDashboard';
import Register from 'pages/authentication/register';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
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
      element: <DashboardDefault />
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
    },
    {
      path: 'admins',
      element: <Admins />
    },
    {
      path: 'students',
      element: <Students />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'tutors',
      element: <Tutors />
    },
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />
        }
      ]
    },
    {
      path: 'tutor',
      children: [
        {
          path: 'dashboard',
          element: <TutorDashboard />
        }
      ]
    },
    {
      path: 'student',
      children: [
        {
          path: 'dashboard',
          element: <StudentDashboard />
        }
      ]
    }
  ]
};

export default MainRoutes;

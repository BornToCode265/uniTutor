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
import Programs from 'pages/Admin/Programs';
import Subjects from 'pages/Admin/Subjects';
import RouteGuard from 'components/guards/RouteGuard';
import UserDetails from 'pages/Admin/UserDetails';
import ProgramDetails from 'pages/ProgramDetails';
import SubjectDetails from 'pages/SubjectDetails';

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
      path: 'program',
      element: <ProgramDetails />
    },
    {
      path: 'subject',
      element: <SubjectDetails />
    },
    {
      path: 'admin',
      element: <RouteGuard mode={'admin'} />,
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />
        },
        {
          path: 'programs',
          element: <Programs />
        },
        {
          path: 'subjects',
          element: <Subjects />
        },
        ,
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
          path: 'user',
          element: <UserDetails />
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

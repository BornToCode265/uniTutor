import { useAuth } from 'contexts/auth-reducer/AuthContext';
import NotAuthorizedPage from 'pages/403';
import NotFoundPage from 'pages/404';
import { Outlet } from 'react-router-dom';

const RouteGuard = ({ mode }) => {
  const { user } = useAuth();

  console.log(user);
  if (!user) {
    return <NotFoundPage />;
  }

  if (user.loginType !== mode) {
    return <NotAuthorizedPage />;
  }
  return <Outlet />;
};

export default RouteGuard;

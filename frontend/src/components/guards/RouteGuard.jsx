import { useAuth } from 'contexts/auth-reducer/AuthContext';
import NotAuthorizedPage from 'pages/403';
import NotFoundPage from 'pages/404';
import { Outlet, useNavigate } from 'react-router-dom';

const RouteGuard = ({ mode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  if (!user) {
    return <NotFoundPage />;
  }

  if (user.loginType !== mode) {
    navigate('/notallowed');
  }
  return <Outlet />;
};

export default RouteGuard;

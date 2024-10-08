// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useAuth } from 'contexts/auth-reducer/AuthContext';
import { useEffect, useState } from 'react';
import tutorMenuItems from 'menu-items/tutor/tutor-menu-items';
import studentMenuItems from 'menu-items/student/student-menu-items';
import { useNavigate } from 'react-router-dom';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { user } = useAuth();
  const [menuItemsList, setMenuItemsList] = useState(studentMenuItems);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      switch (user.loginType) {
        case 'admin':
          setMenuItemsList(menuItem);
          break;

        case 'tutor':
          setMenuItemsList(tutorMenuItems);
          break;

        case 'student':
          setMenuItemsList(studentMenuItems);
          break;

        default:
          navigate('/notallowed');
          break;
      }
      setLoading(false);
    } else {
      console.log('User not found', user);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const navGroups = menuItemsList.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}

// assets
import { UserOutlined } from '@ant-design/icons'; // Ant Design icon
import { RiAdminLine } from 'react-icons/ri'; // React Icons
import { PiChalkboardTeacherThin } from 'react-icons/pi'; // React Icons

// icons
const icons = {
  UserOutlined,
  RiAdminLine,
  PiChalkboardTeacherThin
};

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const users = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'users-Admins',
      title: 'Admins',
      type: 'item',
      url: '/admin/admins',
      icon: icons.RiAdminLine // Correctly rendering the icon
    },
    {
      id: 'users-Tutors',
      title: 'Tutors',
      type: 'item',
      url: '/admin/tutors',
      icon: icons.PiChalkboardTeacherThin // Correctly rendering the icon
    },
    {
      id: 'users-Students',
      title: 'Students',
      type: 'item',
      url: '/admin/students',
      icon: icons.UserOutlined // Render Ant Design icon as a component
    }
  ]
};

export default users;

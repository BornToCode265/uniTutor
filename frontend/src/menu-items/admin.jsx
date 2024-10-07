// assets
import { BookOutlined, ProjectOutlined, ScheduleOutlined } from '@ant-design/icons';

// icons
const icons = {
  BookOutlined,
  ProjectOutlined,
  ScheduleOutlined
};

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const admin = {
  id: 'admin',
  title: 'Admin',
  type: 'group',
  children: [
    {
      id: 'admin-Programs',
      title: 'Programs',
      type: 'item',
      url: 'admin/programs',
      icon: icons.ProjectOutlined
    },
    {
      id: 'admin-Subjects',
      title: 'Subjects',
      type: 'item',
      url: 'admin/subjects',
      icon: icons.BookOutlined
    },
    {
      id: 'admin-Sessions',
      title: 'Sessions',
      type: 'item',
      url: 'admin/sessions',
      icon: icons.ScheduleOutlined
    }
  ]
};

export default admin;

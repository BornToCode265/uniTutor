import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, Avatar, Divider } from '@mui/material';
import { Card, Progress, Tag, List } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { backendUrl } from 'config';

// Mock user data
const user = {
  name: '',
  email: '',
  phone: '+265 999 123 4567',
  avatar: 'https://i.pravatar.cc/300',
  subjects: ['React Native', 'JavaScript', 'Blockchain', 'CSS'],
  assignments: [
    { name: 'E-commerce assignment', completion: 75 },
    { name: 'Social Media App Project', completion: 90 },
    { name: 'Portfolio Website project', completion: 100 }
  ]
};

// Helper function to get query params from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function UserDetails() {
  const query = useQuery();
  const email = query.get('email'); // Extract email from query params
  const userType = query.get('userType'); // Extract userType from query params
  const user_id = query.get('user_id'); // Extract the user id for users who are not admins

  const [dbUser, setDbUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    /* Validate userType and email
    if (!userType || !email) {
      setLoading(false); // Set loading to false as there's no valid request
      setError('User type and email are required.'); // Show error if any parameter is missing
      return;
    }*/

    // Function to fetch user data based on user type and email
    const fetchUserData = async () => {
      let url;

      switch (userType) {
        case 'admin':
          url = '/admin/?email=' + email;
          break;
        case 'tutor':
          url = '/tutor/?tutor_id=' + user_id;
          break;
        default:
          url = '/student/?student_id=' + user_id;
          break;
      }

      try {
        const response = await axios.get(backendUrl + url);
        setDbUser(response.data);
        console.log(dbUser);
        if (dbUser) {
          user.email = dbUser.email;
          user.name = dbUser.name;
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  function getUserType() {
    let type = userType.toUpperCase();
    return <Typography>{type}</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {dbUser ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Avatar src={user.avatar} sx={{ width: 150, height: 150, mx: 'auto', display: 'block', mb: 2 }} />
              <Typography variant="h5" align="center" gutterBottom>
                {dbUser.name} {getUserType()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List
                size="small"
                dataSource={[
                  { icon: <MailOutlined />, text: dbUser.email },
                  { icon: <PhoneOutlined />, text: dbUser.phone_number },
                  { icon: <EnvironmentOutlined />, text: user.address }
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Typography variant="body2">
                      {item.icon} {item.text}
                    </Typography>
                  </List.Item>
                )}
              />
            </Grid>
            {userType === 'student' && (
              <Grid item xs={12} md={8}>
                <Card title="Subjects" style={{ marginBottom: 16 }}>
                  {user.subjects.map((subject) => (
                    <Tag key={subject} color="blue" style={{ margin: '0 8px 8px 0' }}>
                      {subject}
                    </Tag>
                  ))}
                </Card>
                <Card title="Assignments">
                  <List
                    dataSource={user.assignments}
                    renderItem={(assignment) => (
                      <List.Item>
                        <List.Item.Meta
                          title={assignment.name}
                          description={
                            <Progress percent={assignment.completion} status={assignment.completion === 100 ? 'success' : 'active'} />
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Grid>
            )}

            {userType === 'tutor' && (
              <Grid item xs={12} md={8}>
                <Card title="Expertise">
                  <Typography variant="h5">{dbUser.expert.expertise_name}</Typography>
                  <Typography variant="body2">{dbUser.expert.description}</Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </Paper>
      ) : (
        <Typography>No User Loaded</Typography>
      )}
    </Container>
  );
}

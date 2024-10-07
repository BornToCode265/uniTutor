import React from 'react';
import { Container, Typography, Paper, Grid, Avatar, Divider } from '@mui/material';
import { Card, Progress, Tag, List } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+265 999 123 4567',
  avatar: 'https://i.pravatar.cc/300',
  subjects: ['React Native', 'JavaScript', 'Blockchain', 'CSS'],
  assignments: [
    { name: 'E-commerce assignment', completion: 75 },
    { name: 'Social Media App Project', completion: 90 },
    { name: 'Portfolio Website project', completion: 100 }
  ]
};

export default function UserDetails() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar src={user.avatar} sx={{ width: 150, height: 150, mx: 'auto', display: 'block', mb: 2 }} />
            <Typography variant="h5" align="center" gutterBottom>
              {user.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List
              size="small"
              dataSource={[
                { icon: <MailOutlined />, text: user.email },
                { icon: <PhoneOutlined />, text: user.phone },
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
        </Grid>
      </Paper>
    </Container>
  );
}

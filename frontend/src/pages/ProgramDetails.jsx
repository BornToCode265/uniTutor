import React from 'react';
import { Container, Typography, Paper, Grid, Chip, Divider } from '@mui/material';
import { Card, Progress, List, Timeline } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';

// Mock program data
const program = {
  name: 'Computer Science Degree',
  description: 'A comprehensive program covering various aspects of computer science and software development.',
  duration: '4 years',
  startDate: 'September 1, 2023',
  enrollmentStatus: 'Open',
  subjects: ['Programming Fundamentals', 'Data Structures', 'Algorithms', 'Database Systems', 'Web Development'],
  milestones: [
    { name: 'Introduction to Programming', completion: 100 },
    { name: 'Object-Oriented Design', completion: 75 },
    { name: 'Data Structures and Algorithms', completion: 50 },
    { name: 'Software Engineering Principles', completion: 25 }
  ],
  career_paths: ['Software Developer', 'Data Scientist', 'Systems Analyst', 'Database Administrator']
};

export default function ProgramDetails() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {program.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {program.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card title="Program Information" style={{ marginBottom: 16 }}>
              <List
                size="small"
                dataSource={[
                  { icon: <CalendarOutlined />, text: `Start Date: ${program.startDate}` },
                  { icon: <ClockCircleOutlined />, text: `Duration: ${program.duration}` },
                  { icon: <TeamOutlined />, text: `Enrollment Status: ${program.enrollmentStatus}` }
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Typography variant="body2">
                      {item.icon} {item.text}
                    </Typography>
                  </List.Item>
                )}
              />
            </Card>
            <Card title="Subjects">
              <List
                dataSource={program.subjects}
                renderItem={(subject) => (
                  <List.Item>
                    <Typography variant="body2">
                      <BookOutlined /> {subject}
                    </Typography>
                  </List.Item>
                )}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card title="Program Milestones" style={{ marginBottom: 16 }}>
              <List
                dataSource={program.milestones}
                renderItem={(milestone) => (
                  <List.Item>
                    <List.Item.Meta
                      title={milestone.name}
                      description={<Progress percent={milestone.completion} status={milestone.completion === 100 ? 'success' : 'active'} />}
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card title="Career Paths">
              <Timeline>
                {program.career_paths.map((path, index) => (
                  <Timeline.Item key={index}>{path}</Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

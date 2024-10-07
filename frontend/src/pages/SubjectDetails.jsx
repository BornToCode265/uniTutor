import React from 'react';
import { Container, Typography, Paper, Grid, Chip, Divider } from '@mui/material';
import { Card, List, Tag, Table } from 'antd';
import { ClockCircleOutlined, BookOutlined, UserOutlined, ScheduleOutlined } from '@ant-design/icons';

// Mock subject data
const subject = {
  name: 'Data Structures and Algorithms',
  description: 'A comprehensive course covering fundamental data structures and algorithms used in computer science.',
  credits: 4,
  duration: '16 weeks',
  instructor: 'Dr. Jane Smith',
  prerequisites: ['Programming Fundamentals', 'Discrete Mathematics'],
  topics: [
    'Arrays and Linked Lists',
    'Stacks and Queues',
    'Trees and Graphs',
    'Sorting Algorithms',
    'Searching Algorithms',
    'Dynamic Programming'
  ],
  assessments: [
    { type: 'Quiz', weight: '20%', description: '4 quizzes throughout the semester' },
    { type: 'Assignments', weight: '30%', description: '3 programming assignments' },
    { type: 'Midterm Exam', weight: '20%', description: 'Covers first half of the course' },
    { type: 'Final Project', weight: '30%', description: 'Implement a complex data structure or algorithm' }
  ]
};

export default function SubjectDetails() {
  const assessmentColumns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    { title: 'Description', dataIndex: 'description', key: 'description' }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {subject.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {subject.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card title="Subject Information" style={{ marginBottom: 16 }}>
              <List
                size="small"
                dataSource={[
                  { icon: <ClockCircleOutlined />, text: `Duration: ${subject.duration}` },
                  { icon: <BookOutlined />, text: `Credits: ${subject.credits}` },
                  { icon: <UserOutlined />, text: `Instructor: ${subject.instructor}` }
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
            <Card title="Prerequisites">
              {subject.prerequisites.map((prereq) => (
                <Tag key={prereq} color="blue" style={{ margin: '0 8px 8px 0' }}>
                  {prereq}
                </Tag>
              ))}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card title="Course Topics" style={{ marginBottom: 16 }}>
              <List
                dataSource={subject.topics}
                renderItem={(topic) => (
                  <List.Item>
                    <Typography variant="body2">
                      <ScheduleOutlined /> {topic}
                    </Typography>
                  </List.Item>
                )}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card title="Assessments">
              <Table columns={assessmentColumns} dataSource={subject.assessments} pagination={false} />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

// 404Page.js

import React from 'react';
import { Button, Result } from 'antd';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/'); // Replace with your home route
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center'
      }}
    >
      <Result
        status="404"
        title={
          <Typography variant="h3" component="h1" color="primary" sx={{ mb: 2 }}>
            404 - Page Not Found
          </Typography>
        }
        subTitle={
          <Typography variant="body1" color="textSecondary">
            Sorry, the page you visited does not exist.
          </Typography>
        }
        extra={
          <Button type="primary" onClick={goBackHome}>
            Back to Home
          </Button>
        }
      />
    </Box>
  );
};

export default NotFoundPage;

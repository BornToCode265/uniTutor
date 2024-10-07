import React from 'react';
import { Button, Result } from 'antd';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate(-1);
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
        status="403"
        title={
          <Typography variant="h3" component="h1" color="primary" sx={{ mb: 2 }}>
            403 - Not Authorized
          </Typography>
        }
        subTitle={
          <Typography variant="body1" color="textSecondary">
            Sorry, you do not have permission to access this page.
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

export default NotAuthorizedPage;

import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthRegister from './auth-forms/AuthRegister';
import { Box } from '@mui/material';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <Box
      sx={{
        maxWidth: '500px',
        mx: 'auto',
        p: 2
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Add New User</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </Box>
  );
}

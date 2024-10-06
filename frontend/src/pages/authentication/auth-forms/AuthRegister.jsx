import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [programs, setPrograms] = useState([]); // State to store fetched programs
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student'); // Default user type
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');

    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost/uniTutor/backend/programs/');
        setPrograms(response.data); // Store the fetched programs in state
      } catch (error) {
        console.error('Error fetching programs:', error);
        alert('Error fetching programs');
      }
    };

    fetchPrograms();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const route = userType === 'admin' ? '/api/admin/register' : userType === 'tutor' ? '/api/tutor/register' : '/api/student/register';

    try {
      await axios.post(route, {
        name: values.name,
        email: values.email,
        registration_number: userType === 'student' ? values.registration_number : undefined, // Send registration number if user is student
        employee_id: userType !== 'student' ? values.employee_id : undefined, // Send employee ID if user is not a student
        phone_number: values.phone_number,
        program_id: values.program_id,
        password: values.password
      });
      // Redirect or perform another action on success
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          registration_number: '',
          employee_id: '', // New field for employee ID
          phone_number: '',
          program_id: '',
          password: '',
          confirm_password: '', // New confirm password field
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          registration_number:
            userType === 'student' ? Yup.string().max(255).required('Registration Number is required') : Yup.string().notRequired(),
          employee_id: userType !== 'student' ? Yup.string().max(255).required('Employee ID is required') : Yup.string().notRequired(),
          phone_number: Yup.string().max(20).required('Phone Number is required'),
          password: Yup.string().max(255).required('Password is required'),
          confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'), // Password confirmation validation
          program_id: Yup.string().required('Program selection is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Name*</InputLabel>
                  <OutlinedInput
                    id="name-signup"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John Doe"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name-signup">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              {/* Moved user type selection below email */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="user-type-select-label">User Type</InputLabel>
                  <Select
                    labelId="user-type-select-label"
                    id="user-type-select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="tutor">Tutor</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Conditionally render Registration Number or Employee ID */}
              {userType === 'student' ? (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="registration-number-signup">Registration Number*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.registration_number && errors.registration_number)}
                      id="registration-number-signup"
                      type="text"
                      value={values.registration_number}
                      name="registration_number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Reg123"
                    />
                  </Stack>
                  {touched.registration_number && errors.registration_number && (
                    <FormHelperText error id="helper-text-registration-number-signup">
                      {errors.registration_number}
                    </FormHelperText>
                  )}
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="employee-id-signup">Employee ID*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.employee_id && errors.employee_id)}
                      id="employee-id-signup"
                      type="text"
                      value={values.employee_id}
                      name="employee_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Emp123"
                    />
                  </Stack>
                  {touched.employee_id && errors.employee_id && (
                    <FormHelperText error id="helper-text-employee-id-signup">
                      {errors.employee_id}
                    </FormHelperText>
                  )}
                </Grid>
              )}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-number-signup">Phone Number*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    id="phone-number-signup"
                    type="text"
                    value={values.phone_number}
                    name="phone_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="123-456-7890"
                  />
                </Stack>
                {touched.phone_number && errors.phone_number && (
                  <FormHelperText error id="helper-text-phone-number-signup">
                    {errors.phone_number}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="program-id-signup">Program*</InputLabel>
                  <FormControl fullWidth error={Boolean(touched.program_id && errors.program_id)}>
                    <Select id="program-id-signup" name="program_id" value={values.program_id} onChange={handleChange} onBlur={handleBlur}>
                      {programs.map((program) => (
                        <MenuItem key={program.program_id} value={program.program_id}>
                          {program.program_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.program_id && errors.program_id && <FormHelperText error>{errors.program_id}</FormHelperText>}
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    placeholder="******"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirm-password-signup">Confirm Password*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    id="confirm-password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    name="confirm_password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      handleChange(e);
                    }}
                    placeholder="******"
                  />
                </Stack>
                {touched.confirm_password && errors.confirm_password && (
                  <FormHelperText error id="helper-text-confirm-password-signup">
                    {errors.confirm_password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                    Sign up
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" align="center">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="subtitle2" color="primary">
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

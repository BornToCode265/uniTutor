import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios'; // Import axios
import auth, { initialState } from './auth';
import { LOGIN, LOGOUT, REGISTER } from './actions';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: LOGIN, payload: { user } });
    } else {
      dispatch({ type: LOGOUT });
    }
  }, []);

  // Login action with axios request
  const login = async (credentials, { setErrors, setStatus, setSubmitting }) => {
    try {
      const response = await axios.get('http://localhost/uniTutor/backend/auth/admin/', {
        params: {
          email: credentials.email,
          password: credentials.password
        }
      });

      // Check response and handle success/failure
      if (response.data) {
        const userData = response.data; // Get the user data from response

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Dispatch LOGIN action to update the context state
        dispatch({ type: LOGIN, payload: { user: userData } });

        // Set status to success
        setStatus({ success: true });
      } else {
        // If the response is invalid, set error
        setStatus({ success: false });
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error);
      setStatus({ success: false });
      setErrors({ submit: 'An error occurred. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT });
  };

  const register = (userData) => {
    dispatch({ type: REGISTER, payload: { user: userData } });
  };

  const value = {
    ...state,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

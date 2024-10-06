import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import auth, { initialState } from './auth';
import { LOGIN, LOGOUT, REGISTER } from './actions';

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
    let url = ''; // Temporary variable to hold the login URL

    switch (credentials.loginType) {
      case 'tutor':
        console.log('logging in as tutor');
        url = 'http://localhost/uniTutor/backend/auth/tutor/';
        break;

      case 'admin':
        console.log('logging in as admin');
        url = 'http://localhost/uniTutor/backend/auth/admin/';
        break;

      default:
        console.log('logging in as student');
        url = 'http://localhost/uniTutor/backend/auth/';
        break;
    }

    if (!url) {
      setStatus({ success: false, message: 'Invalid login type' });
      console.log('Invalid login type: ' + url);
      return;
    }

    try {
      const response = await axios.get(url, {
        params: {
          email: credentials.email,
          password: credentials.password
        }
      });
      console.log(response);

      // Check response and handle success/failure
      if (response.data) {
        const userData = {
          ...response.data, // Include the user data from the response
          loginType: credentials.loginType, // Add loginType to user data
          email: credentials.email
        };
        //console.log(userData);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Dispatch LOGIN action to update the context state
        dispatch({ type: LOGIN, payload: { user: userData } });

        // Set status to success
        setStatus({ success: true });
        return { success: 'Success' };
      } else {
        // If the response is invalid, set error
        setStatus({ success: false });
        setErrors({ submit: 'Invalid email or password' });
        return { success: 'Failed' };
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

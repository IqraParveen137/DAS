import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../Api/API';
//LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post('/user/login', { email, password });
      localStorage.setItem('appData', JSON.stringify(res?.data));
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'login error';
      return thunkApi.rejectWithValue(message);
    }
  },
);
//Sign up
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, thunkApi) => {
    try {
      const res = await API.post('/user/signup', { name, email, password });
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'signup error';
      return thunkApi.rejectWithValue(message);
    }
  },
);
//get user data
export const getUserData = createAsyncThunk('auth/getUserData', () => {
  const localData = localStorage.getItem('appData');
  const appData = JSON.parse(localData);
  return appData?.user;
});
//get token
export const loadToken = createAsyncThunk('auth/loadToken', () => {
  const localData = localStorage.getItem('appData');
  const appData = JSON.parse(localData);
  return appData?.token;
});
//get Login user Details
export const getLoginUserDetails = createAsyncThunk(
  'user/getLoginUserDetails',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/user/get-login-user/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'login user details error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//update user Data
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.patch(`/user/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Update user details error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//get All Appointments
export const getAllAppointments = createAsyncThunk(
  'user/getAllAppointments',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/appointment/get-user-appointments/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'user appointments error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//cancel status
export const cancelStatus = createAsyncThunk(
  'user/cancelStatus',
  async (id, thunkAPI) => {
    try {
      const res = await API.post(`/appointment/cancel-appointment/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'user appointment cancel error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//reset Password
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ id, oldPassword, newPassword }, thunkAPI) => {
    try {
      const res = await API.patch(`/user/update-password/${id}`, {
        oldPassword,
        newPassword,
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'UPDATE PASSWORD error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//bookAppointment
export const bookAppointment = createAsyncThunk(
  'user/bookAppointment',
  async (bookingData, thunkAPI) => {
    try {
      const res = await API.post('/appointment/create', bookingData);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Book Appointment error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);

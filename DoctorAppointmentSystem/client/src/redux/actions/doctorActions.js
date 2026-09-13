import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../Api/API';

//get all doctors
export const getAllDoctors = createAsyncThunk(
  'doctor/getAllDoctors',
  async (_dirname, thunkAPI) => {
    try {
      const res = await API.get('/doctor/get-all');
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'get all doc error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//doctor Login
export const doctorLogin = createAsyncThunk(
  'doctor/login',
  async (data, thunkAPI) => {
    try {
      const res = await API.post('/doctor/login', data);

      localStorage.setItem(
        'appData',
        JSON.stringify({
          token: res.data.token,
          doctor: res.data.doctor,
        }),
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
// Get Login Doctor Details
export const getLoginDoctorDetails = createAsyncThunk(
  'doctor/getLoginDoctorDetails',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/doctor/login-doctor/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Something went wrong',
      );
    }
  },
);
//get doctor appointments
export const getDoctorAppointments = createAsyncThunk(
  'doctor/getDoctorAppointments',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/appointment/doctor/${id}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
//get doctor Details
export const getDoctorDetails = createAsyncThunk(
  'doctor/getDoctorDetails',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/doctor/get-details/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'doctor details error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//add doctor
export const addDoctor = createAsyncThunk(
  'doctor/AddDoctor',
  async (formData, thunkAPI) => {
    try {
      const res = await API.post('/doctor/add', formData, {
        headers: {
          'content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'add new doctor error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//update doctor
export const updateDoctor = createAsyncThunk(
  'doctor/updateDoctor',
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.patch(`/doctor/update/${id}`, formData);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'update doctor error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//delete doctor
export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/doctor/delete/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'delete doctor error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//resetPassword
export const resetDoctorPassword = createAsyncThunk(
  'doctor/resetPassword',
  async ({ id, oldPassword, newPassword }, thunkAPI) => {
    try {
      const res = await API.patch(`/doctor/update-password/${id}`, {
        oldPassword,
        newPassword,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
// Doctor Stats
export const getDoctorStats = createAsyncThunk(
  'doctor/getDoctorStats',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/doctor/stats/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Error getting doctor stats';

      return thunkAPI.rejectWithValue(message);
    }
  },
);
//update status
export const updateStatus = createAsyncThunk(
  'doctor/updateStatus',
  async ({ id, available }, thunkAPI) => {
    try {
      const res = await API.patch(`/doctor/update-status/${id}`, available);

      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error.response);

      const message =
        error?.response?.data?.message ||
        error.message ||
        'update status doctor error';

      return thunkAPI.rejectWithValue(message);
    }
  },
);

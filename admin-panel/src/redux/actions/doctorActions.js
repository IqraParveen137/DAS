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
      console.log(formData.get('image'));
      console.log(formData.get('name'));
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
//UPDATE STATUS
export const updateStatus = createAsyncThunk(
  'doctor/updateStatus',
  async ({ id, available }, thunkAPI) => {
    try {
      const res = await API.patch(`/doctor/update-status/${id}`, available);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'update status doctor error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);

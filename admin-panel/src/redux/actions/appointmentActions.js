import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../Api/API';

//get all appointments
export const getAllAppointments = createAsyncThunk(
  'appointment/getAllAppointments',
  async (_dirname, thunkAPI) => {
    try {
      const res = await API.get('/appointment/get-all');
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'get all appointment error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//get appointment Details
export const getAppointmentDetails = createAsyncThunk(
  'appointment/getAppointmentDetails',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/appointment/get-details/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'appointment details error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//UPDATE APPOINTMENT STATUS
export const updateStatus = createAsyncThunk(
  'appointment/updateStatus',
  async ({ id, appointmentStatus }, thunkAPI) => {
    try {
      const res = await API.patch(`/appointment/update-status/${id}`, {
        appointmentStatus,
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'update status appointment error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);

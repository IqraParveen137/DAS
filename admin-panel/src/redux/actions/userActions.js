import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../Api/API';

//get all users
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_dirname, thunkAPI) => {
    try {
      const res = await API.get('/user/get-all');
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'login error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//get user Details
export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/user/get-user/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'user details error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//get all stats
export const getStats = createAsyncThunk(
  'user/getStats',
  async (_, thunkAPI) => {
    try {
      const res = await API.get('/user/get-stats');
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || 'get-stats error';
      return thunkAPI.rejectWithValue(message);
    }
  },
);

import { createSlice } from '@reduxjs/toolkit';
import {
  bookAppointment,
  cancelStatus,
  getAllAppointments,
  getLoginUserDetails,
  getUserData,
  loadToken,
  login,
  resetPassword,
  signup,
  updateUserData,
} from '../actions/authActions';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
    bookingSuccess: false,
    user: null,
    appointments: [],
    token: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.bookingSuccess = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //get login user data
      .addCase(getLoginUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoginUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getLoginUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //update user data
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //user appointments
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments = action.payload.appointment;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //user appointments cancel
      .addCase(cancelStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //update password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //book appointments
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
        state.bookingSuccess = true;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.bookingSuccess = false;
        state.error = action.payload;
      })
      //load token
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      //get user data
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;

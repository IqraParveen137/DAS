import { createSlice } from '@reduxjs/toolkit';
import { getUserData, loadToken, login } from '../actions/authActions';
import {
  getAllAppointments,
  getAppointmentDetails,
  updateStatus,
} from '../actions/appointmentActions';
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    loading: false,
    success: false,
    appointments: [],
    appointment: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllAppointments
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
      //getAppointmentDetails
      .addCase(getAppointmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload.appointmentDetails;
      })
      .addCase(getAppointmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //Update Appointment Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.appointment = action.payload.appointmentDetails;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});
export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;

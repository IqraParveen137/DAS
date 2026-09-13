import { createSlice } from '@reduxjs/toolkit';
import { getUserData, loadToken, login } from '../actions/authActions';
import {
  addDoctor,
  deleteDoctor,
  doctorLogin,
  getAllDoctors,
  getDoctorAppointments,
  getDoctorDetails,
  getDoctorStats,
  getLoginDoctorDetails,
  resetDoctorPassword,
  updateDoctor,
  updateStatus,
} from '../actions/doctorActions';
const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    loading: false,
    success: false,
    doctors: null,
    doctor: null,
    appointments: [],
    stats: null,
    passwordResetSuccess: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
      state.passwordResetSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllDoctors
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors = action.payload.doctors;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //doctor login
      .addCase(doctorLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.doctor = action.payload.doctor;
      })

      .addCase(doctorLogin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      //get Login Doctor Details
      .addCase(getLoginDoctorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoginDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(getLoginDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //get doctor appointments
      .addCase(getDoctorAppointments.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = action.payload.appointments;
      })

      .addCase(getDoctorAppointments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      //getDoctorDetails
      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(getDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //addNewDoctor
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //Update Doctor
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        //state.doctor = action.payload.doctor;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      // Doctor Stats
      .addCase(getDoctorStats.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDoctorStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
      })

      .addCase(getDoctorStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //reset Password
      .addCase(resetDoctorPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetDoctorPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetSuccess = true;
      })

      .addCase(resetDoctorPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //delete Doctor
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        //state.doctor = action.payload.doctor;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //updateStatus Doctor
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        //state.doctor = action.payload.doctor;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});
export const { reset } = doctorSlice.actions;
export default doctorSlice.reducer;

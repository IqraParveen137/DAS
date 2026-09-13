import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slice/authSlice';
//import UserReducer from './slice/userSlice';
import DoctorReducer from './slice/doctorSlice';
import AppointmentReducer from './slice/appointmentSlice';
import searchReducer from './slice/searchSlice';
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    doctor: DoctorReducer,
    appointments: AppointmentReducer,
    search: searchReducer,
  },
});
export default store;

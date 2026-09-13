import './App.css';
import { Route, Routes } from 'react-router-dom';
import AllAppointments from './pages/appointments/AllAppointments';
import AppointmentDetails from './pages/appointments/AppointmentDetails';
import AllDoctors from './pages/doctors/AllDoctors';
import DoctorDetails from './pages/doctors/DoctorDetails';
import Home from './pages/Home';
import AllUsers from './pages/user/AllUsers';
import Login from './pages/user/Login';
import { Toaster } from 'react-hot-toast';
import UserDetails from './pages/user/UserDetails';
import AddDoctor from './pages/doctors/AddDoctor';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/all-users' element={<AllUsers />}></Route>
        <Route path='/user-details/:id' element={<UserDetails />}></Route>
        <Route path='/all-doctors' element={<AllDoctors />}></Route>
        <Route path='/add-doctor' element={<AddDoctor />}></Route>
        <Route path='/doctor-details/:id' element={<DoctorDetails />}></Route>
        <Route path='/all-appointments' element={<AllAppointments />}></Route>
        <Route
          path='/appointment-details/:id'
          element={<AppointmentDetails />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;

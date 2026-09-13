import './App.css';
import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import AllDoctors from './pages/Doctors/AllDoctors';
import Appointments from './pages/Doctors/Appointments';
import UserProfile from './pages/User/UserProfile';
import MyAppointments from './pages/User/MyAppointments';
import GalleryPage from './components/Static/Gallery/GalleryPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reset } from './redux/slice/authSlice';
import { getLoginUserDetails } from './redux/actions/authActions';
import { getLoginDoctorDetails } from './redux/actions/doctorActions';
import AppointmentDetails from './pages/User/AppointmentDetails';
import ResetPassword from './pages/User/ResetPassword';
import DoctorRegister from './pages/Doctors/DoctorRegister';
import DoctorLogin from './pages/Doctors/DoctorLogin';
import DoctorAppointments from './pages/Doctors/DoctorAppointments';
import DoctorDashboard from './pages/Doctors/DoctorDashboard';
import DoctorProfile from './pages/Doctors/DoctorProfile';
import DoctorResetPassword from './pages/Doctors/DoctorResetPassword';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());

    const localData = localStorage.getItem('appData');

    if (!localData) return;

    const appData = JSON.parse(localData);

    // User Login
    if (appData?.user?._id) {
      dispatch(getLoginUserDetails(appData.user._id));
    }

    // Doctor Login
    if (appData?.doctor?._id) {
      dispatch(getLoginDoctorDetails(appData.doctor._id));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/gallery' element={<GalleryPage />} />

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/doctors' element={<AllDoctors />} />
        <Route path='/doctors/:id' element={<Appointments />} />

        <Route path='/user/profile' element={<UserProfile />} />
        <Route path='/users/appointments' element={<MyAppointments />} />
        <Route
          path='/users/appointments/:id'
          element={<AppointmentDetails />}
        />
        <Route path='/user/reset-password/:id' element={<ResetPassword />} />

        <Route path='/doctor-register' element={<DoctorRegister />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
        <Route path='/doctor/profile' element={<DoctorProfile />} />
        <Route
          path='/doctor/reset-password/:id'
          element={<DoctorResetPassword />}
        />
        <Route path='/doctor/appointments' element={<DoctorAppointments />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

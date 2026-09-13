import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import DoctorEditProfile from './DoctorEditProfile';

import {
  getLoginDoctorDetails,
  updateStatus,
} from '../../redux/actions/doctorActions';
import { reset } from '../../redux/slice/authSlice';

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    const appData = JSON.parse(localStorage.getItem('appData'));

    if (appData?.doctor?._id) {
      dispatch(getLoginDoctorDetails(appData.doctor._id));
    }
  }, [dispatch]);

  const handleStatus = async (id, available) => {
    try {
      await dispatch(updateStatus({ id, available })).unwrap();

      toast.success('Status Updated');

      dispatch(getLoginDoctorDetails(id));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('appData');
    dispatch(reset());
    toast.success('Logout Successfully');
    navigate('/doctor-login', { replace: true });
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <h3 className='text-center mb-4'>Manage Your Profile</h3>
          <div className='col-md-3 text-center'>
            <img
              src={
                doctor?.image
                  ? `data:image/jpeg;base64,${doctor.image}`
                  : '/src/assets/images/default-doctor.png'
              }
              alt='doctor'
              className='rounded-circle border shadow'
              width={220}
              height={220}
            />

            <div className='mt-3'>
              {doctor?.available ? (
                <span className='badge bg-success p-2'>Available</span>
              ) : (
                <span className='badge bg-danger p-2'>Unavailable</span>
              )}
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card shadow border-0'>
              <div className='card-body'>
                <h4 className='mb-3'>Dr. {doctor?.name}</h4>

                <hr />

                <h6>Email : {doctor?.email}</h6>

                <h6>Speciality : {doctor?.speciality}</h6>

                <h6>Experience : {doctor?.experience}</h6>

                <h6>Degree : {doctor?.degree}</h6>

                <h6>Fees : Rs. {doctor?.fees}</h6>

                <h6>Phone : {doctor?.phone}</h6>

                <h6>Gender : {doctor?.gender}</h6>

                <h6>DOB : {doctor?.dob}</h6>

                <h6>Address : {doctor?.address}</h6>
                {doctor && (
                  <h4>
                    <Link to={`/doctor/reset-password/${doctor._id}`}>
                      Reset Password
                    </Link>
                  </h4>
                )}
              </div>
            </div>

            <div className='mt-4'>
              <button
                className='btn btn-warning me-2'
                onClick={() => setIsOpen(true)}
              >
                ✏️ Edit Profile
              </button>

              <button
                className='btn btn-primary me-2'
                onClick={() => navigate('/doctor/appointments')}
              >
                📅 My Appointments
              </button>

              <button
                className={`btn ${
                  doctor?.available ? 'btn-danger' : 'btn-success'
                } me-2`}
                onClick={() =>
                  handleStatus(doctor._id, { available: !doctor.available })
                }
              >
                {doctor?.available ? 'Mark Unavailable' : 'Mark Available'}
              </button>

              <button className='btn btn-dark' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <DoctorEditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default DoctorProfile;

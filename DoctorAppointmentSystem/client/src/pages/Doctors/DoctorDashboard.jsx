import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorStats } from '../../redux/actions/doctorActions';
import DoctorAppointments from './DoctorAppointments';
import DoctorProfile from './DoctorProfile';
import { useNavigate } from 'react-router';

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    const appData = JSON.parse(localStorage.getItem('appData'));

    if (appData?.doctor?._id) {
      dispatch(getDoctorStats(appData.doctor._id));
    }
  }, [dispatch]);

  return (
    <div className='container mt-4'>
      {/* Welcome Card */}
      <div className='card shadow border-0 mb-4'>
        <div className='card-body d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <img
              src={
                doctor?.image
                  ? `data:image/jpeg;base64,${doctor.image}`
                  : '/src/assets/images/default-doctor.png'
              }
              alt='doctor'
              width='90'
              height='90'
              className='rounded-circle border border-3 border-primary'
            />

            <div className='ms-3'>
              <h3 className='mb-1'>Welcome Dr. {doctor?.name}</h3>
              <p className='text-muted mb-1'>{doctor?.speciality}</p>
              <small>{doctor?.email}</small>
            </div>
          </div>

          <div>
            {doctor?.available ? (
              <span className='badge bg-success fs-6'>Available</span>
            ) : (
              <span className='badge bg-danger fs-6'>Unavailable</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='row g-3 mb-4'>
        <div className='col-md-3'>
          <div className='card bg-primary text-white shadow'>
            <div className='card-body text-center'>
              <h1>{stats?.totalAppointments || 0}</h1>
              <h5>Total Appointments</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card bg-warning text-white shadow'>
            <div className='card-body text-center'>
              <h1>{stats?.pending || 0}</h1>
              <h5>Pending</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card bg-success text-white shadow'>
            <div className='card-body text-center'>
              <h1>{stats?.completed || 0}</h1>
              <h5>Completed</h5>
            </div>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card bg-danger text-white shadow'>
            <div className='card-body text-center'>
              <h1>{stats?.canceled || 0}</h1>
              <h5>Canceled</h5>
            </div>
          </div>
        </div>
      </div>

      <div className='card-body'>
        <DoctorProfile />
      </div>
    </div>
  );
};

export default DoctorDashboard;

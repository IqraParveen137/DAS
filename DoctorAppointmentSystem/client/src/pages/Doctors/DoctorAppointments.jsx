import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorAppointments } from '../../redux/actions/doctorActions';
import { updateStatus } from '../../redux/actions/appointmentActions';

const DoctorAppointments = () => {
  const dispatch = useDispatch();

  const { appointments, doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (doctor?._id) {
      dispatch(getDoctorAppointments(doctor._id));
    }
  }, [dispatch, doctor]);

  const handleStatus = async (id, status) => {
    try {
      await dispatch(
        updateStatus({
          id,
          appointmentStatus: status,
        }),
      ).unwrap();

      dispatch(getDoctorAppointments(doctor._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mt-4'>
      <h3 className='mb-4'>My Appointments</h3>

      {appointments?.length > 0 ? (
        appointments.map((item) => (
          <div className='card p-3 mb-3' key={item._id}>
            <h5>Patient Name: {item.userId?.name}</h5>

            <p>Patient Email: {item.userId?.email}</p>

            <p>Date: {item.slotDate}</p>

            <p>Time: {item.slotTime}</p>

            <p>Fees: {item.amount}</p>

            <p>Status: {item.status}</p>

            <div className='mt-2'>
              <button
                className='btn btn-success me-2'
                onClick={() => handleStatus(item._id, 'completed')}
              >
                Complete
              </button>

              <button
                className='btn btn-danger'
                onClick={() => handleStatus(item._id, 'canceled')}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      ) : (
        <h5>No Appointments Found</h5>
      )}
    </div>
  );
};

export default DoctorAppointments;

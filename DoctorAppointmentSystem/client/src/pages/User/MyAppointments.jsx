import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelStatus,
  getAllAppointments,
} from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, error, success } = useSelector((state) => state.auth);
  useEffect(() => {
    const localData = localStorage.getItem('appData');
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getAllAppointments(id));
    }
    /*return () => {
      dispatch(reset());
    };*/
  }, [dispatch]);
  const handleCancel = (id) => {
    dispatch(cancelStatus(id));
    if (success) {
      toast.success('Cancel Successfully');
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <h1>My All Appointments</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>SNO</th>
            <th>Booking Date</th>
            <th>Booking Time</th>
            <th>FEES</th>
            <th>Status</th>
            <th>Details</th>
            <th>Update Booking</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.length > 0 &&
            appointments?.map((a, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{a?.slotDate}</td>
                <td>{a?.slotTime}</td>
                <td>{a?.amount}</td>
                <td>{a?.status}</td>
                <td>
                  <Link to={`/users/appointments/${a?._id}`}>Details</Link>
                </td>
                <td>
                  {a?.status == 'pending' ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => handleCancel(a?._id)}
                    >
                      cancel
                    </button>
                  ) : (
                    'NA'
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default MyAppointments;

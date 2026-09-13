import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentDetails } from '../../redux/actions/appointmentActions';

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  const { appointment } = useSelector((state) => state.appointments);

  return (
    <>
      <h1>Appointment Details</h1>

      <table className='table'>
        <tbody>
          <tr>
            <th>Doctor Name</th>
            <td>{appointment?.doctorName}</td>
          </tr>

          <tr>
            <th>Doctor Phone</th>
            <td>{appointment?.doctorPhone}</td>
          </tr>

          <tr>
            <th>Doctor Email</th>
            <td>{appointment?.doctorEmail}</td>
          </tr>

          <tr>
            <th>Booking Date</th>
            <td>{appointment?.bookingDate}</td>
          </tr>

          <tr>
            <th>Booking Time</th>
            <td>{appointment?.bookingTime}</td>
          </tr>

          <tr>
            <th>Booking Amount</th>
            <td>{appointment?.amount}</td>
          </tr>

          <tr>
            <th>Booking Status</th>
            <td>{appointment?.status}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AppointmentDetails;

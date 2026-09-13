import React, { useEffect } from 'react';
import DoctorData from './DoctorsData.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../../redux/actions/doctorActions';
import { bookAppointment } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';
import { reset } from '../../redux/slice/authSlice';
const Appointments = () => {
  const { id } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDateTime, setselectedDateTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(reset());
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (doctor) {
      setDocInfo(doctor);
    }
  }, [doctor]);
  //get date and time
  const extractDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const extractTime = (ObjectTime) => {
    let hours = ObjectTime.getHours();
    const minutes = ObjectTime.getMinutes();
    const second = ObjectTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(second).padStart(2, '0')}${ampm}`;
  };
  const { bookingSuccess, error, user } = useSelector((state) => state.auth);

  const handleBooking = () => {
    const bookingData = {
      userId: user?._id,
      doctorId: id,
      amount: docInfo?.fees,
      slotDate: extractDate(selectedDateTime),
      slotTime: extractTime(selectedDateTime),
    };

    dispatch(bookAppointment(bookingData));
  };

  useEffect(() => {
    if (bookingSuccess) {
      toast.success('Booking Successful');
      navigate('/users/appointments');
      dispatch(reset());
    }

    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [bookingSuccess, error]);
  return (
    <>
      <div className='container docinfo-container'>
        <div className='row m-3'>
          <div
            className='col-md-3 d-flex flex-column justify-content-center
         align-items-center'
          >
            <img
              src={
                docInfo?.image
                  ? `data:image/jpeg;base64,${docInfo.image}`
                  : '/src/assets/images/default-doctor.png'
              }
              alt='docImage'
              height={200}
              width={200}
            />
            <h6>{docInfo?.name}</h6>
            <h6 className='{`{docInfo?.available?"text-success":"text-danger"}`}'>
              {docInfo?.available ? 'Available' : 'Not Available'}
            </h6>
          </div>
          <div className='col-md-8 d-flex flex-column justify-content-center m=3'>
            <h6>Experience: {docInfo?.experience} years</h6>
            <h6>Degree: {docInfo?.degree}</h6>
            <h5>Consultation fee:{docInfo?.fees}</h5>
            {/*Date Time*/}
            <div className='date-time mt-3'>
              <h6>Select Your Booking Date and Time:👇</h6>
              <DatePicker
                className='calender'
                minDate={new Date()}
                selected={selectedDateTime}
                onChange={(date) => setselectedDateTime(date)}
                showTimeSelect
                timeFormat='h:mm aa'
                timeIntervals={30}
                dateFormat={'d-MMM-yyyy h:mm aa'}
                timeCaption='Time'
                minTime={new Date()}
                maxTime={setHours(setMinutes(new Date(), 2), 22)}
              />
              <p>
                Your Selected Booking:
                {selectedDateTime
                  ? selectedDateTime.toLocaleString()
                  : 'Please Select a date and time'}
              </p>
            </div>
            <button
              className='btn btn-primary w-50'
              disabled={!docInfo?.available}
              onClick={handleBooking}
            >
              {docInfo?.available ? 'Book Now' : 'Doctor not Available'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;

import React from 'react';
import './ShortIntro.css';
import ImgHos from '../../../assets/images/hos.png';
import { useNavigate } from 'react-router';
const ShortIntro = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='intro-container'>
        <div className='row'>
          <div className='col-md-6 img-container'>
            <img src={ImgHos} alt='HospitalImage' className='hos-image' />
          </div>
          <div className='col-md-5 info-container'>
            <h1>Book Your Doctor</h1>
            <h6>Your health, just a click away.</h6>
            <p>
              Book doctor appointments 24/7 from the comfort of your home,
              skipping long waiting lines and phone calls.
            </p>
            <p>
              This secure online system allows you to search for specialists,
              select convenient time slots, and receive instant booking
              confirmations.
            </p>
            <button
              className='btn btn-outline-success book-btn'
              onClick={() => navigate('/doctors')}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortIntro;

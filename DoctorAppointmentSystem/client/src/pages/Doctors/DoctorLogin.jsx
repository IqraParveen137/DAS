import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { doctorLogin } from '../../redux/actions/doctorActions';
import toast from 'react-hot-toast';

const DoctorLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        doctorLogin({
          email,
          password,
        }),
      ).unwrap();

      navigate('/doctor/dashboard');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Doctor Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className='form-control mb-3'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className='form-control mb-3'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='btn btn-success'>Login</button>
      </form>

      <p className='mt-3'>
        Don't have account?
        <NavLink to='/doctor-register'>Register</NavLink>
      </p>
    </div>
  );
};

export default DoctorLogin;

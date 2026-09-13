import React, { useEffect, useState } from 'react';
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/slice/authSlice';
import { login } from '../../redux/actions/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please provide email and password');
    }
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    if (success) {
      toast.success('Login Successful');
      navigate('/doctors');
      setEmail('');
      setPassword('');
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [dispatch, error, success, navigate]);
  return (
    <>
      <div className='auth-container'>
        <div className='card'>
          <h2>Login</h2>
          <p>Please enter your email and password</p>
          <div className='form-group mb-3'>
            <input
              type='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group mb-3'>
            <input
              type='password'
              placeholder='Enter Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='btn btn-primary'
            disabled={!email || !password}
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className='mt-3'>
            Not have any account?
            <NavLink to='/signup'>Signup</NavLink>{' '}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

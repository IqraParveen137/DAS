import React, { useEffect, useState } from 'react';
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('Please provide all fields');
    }
    dispatch(signup({ name, email, password }));
  };
  useEffect(() => {
    if (success) {
      toast.success('SignUp Successful');
      navigate('/login');
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
      dispatch(reset());
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
          <h2>Create an account</h2>
          <p>Please enter your details</p>
          <div className='form-group mb-3'>
            <input
              type='text'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            disabled={!name || !email || !password}
            onClick={handleSubmit}
          >
            SignUp
          </button>
          <p className='mt-3'>
            Already!Have an account?
            <NavLink to='/Login'>Login</NavLink>{' '}
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;

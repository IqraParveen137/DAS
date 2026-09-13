import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';

const Login = () => {
  const [email, setEmail] = useState('user1@gmail.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    if (!email || !password) {
      return toast.error('please provide email or password');
    }
    dispatch(login({ email, password }));
    /*toast.success('Login Successfully');
    navigate('/home');*/
  };
  const { success, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (success) {
      toast.success('Login Successfully');
      navigate('/home');
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate]);
  return (
    <div
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ minHeight: '80hv' }}
    >
      <h1>Admin Panel</h1>
      <div className='mb-3'>
        <label className='form-label'>Email Address</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='btn btn-primary' onClick={handleLogin}>
        LOGIN
      </button>
    </div>
  );
};

export default Login;

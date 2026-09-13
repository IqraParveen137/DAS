import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { resetDoctorPassword } from '../../redux/actions/doctorActions';
import { logout } from '../../redux/slice/authSlice';
import { reset } from '../../redux/slice/doctorSlice';

const DoctorResetPassword = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { passwordResetSuccess, error } = useSelector((state) => state.doctor);

  /*useEffect(() => {
    dispatch(reset());
  }, [dispatch]);*/
  console.log(passwordResetSuccess, error);
  const handleResetPassword = () => {
    if (!oldPassword || !newPassword) {
      return toast.error('Please Provide old and new password values');
    }

    dispatch(resetDoctorPassword({ id, oldPassword, newPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
    }

    if (passwordResetSuccess) {
      toast.success('Your Password Reset. Please login again.');
      dispatch(logout());
      dispatch(reset());
      navigate('/doctor-login');
    }
  }, [passwordResetSuccess, error, dispatch, navigate]);

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ minHeight: '80vh' }}
    >
      <h1>Reset Your Password</h1>

      <div className='mt-4 d-flex flex-row'>
        <label className='me-3'>Enter Your Old Password:</label>

        <input
          type='password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className='form-control'
        />
      </div>

      <div className='mt-4 d-flex flex-row'>
        <label className='me-3'>Enter Your New Password:</label>

        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='form-control'
        />
      </div>

      <button className='mt-4 btn btn-primary' onClick={handleResetPassword}>
        RESET PASSWORD
      </button>
    </div>
  );
};

export default DoctorResetPassword;

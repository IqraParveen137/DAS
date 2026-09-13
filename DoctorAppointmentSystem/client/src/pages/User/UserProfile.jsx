import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import EditUserProfile from './EditUserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../../admin-panel/src/redux/slice/authSlice';
import { getLoginUserDetails } from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(reset());
    const localData = localStorage.getItem('appData');
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getLoginUserDetails(id));
    }
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('appData');
    navigate('/login');
    toast.success('logout successfully');
  };
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <h4 className='text-center'>Manage Your Account And Appointments</h4>
          <div className='col-md-3'>
            <img
              src={
                user?.image
                  ? `data:image/jpeg;base64,${user.image}`
                  : '/src/assets/images/default-user.png'
              }
              alt='userPic'
              className='card p-2'
              width={200}
            />
          </div>
          <div className='col-md-8'>
            <div className='user-container mb-3'>
              <h6>Name:{user?.name}</h6>
              <h6>Gender:{user?.gender || 'NA'}</h6>
              <h6>DOB:{user?.dob || 'NA'}</h6>
              <h6>Email:{user?.email}</h6>
              <h6>Phone:{user?.phone || 'NA'}</h6>
              <h6>Address:{user?.address || 'NA'}</h6>
              <h4>
                <Link to={`/user/reset-password/${user?._id}`}>
                  Reset Password
                </Link>
              </h4>
            </div>
            {/*buttons */}
            <div className='button-container mt-5'>
              <button
                className='btn btn-warning'
                onClick={() => setIsOpen(!isOpen)}
              >
                <i className='fa-solid  fa-pen-to-square'></i>
                Edit Profile
              </button>
              <button
                className='btn btn-primary ms-3'
                onClick={() => navigate('/users/appointments')}
              >
                <i className='fa-solid  fa-list'></i>
                Appointments
              </button>
              <button className='btn btn-danger ms-3' onClick={handleLogout}>
                <i className='fa-solid  fa-power-off'></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*edit modal */}
      {isOpen && (
        <EditUserProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;

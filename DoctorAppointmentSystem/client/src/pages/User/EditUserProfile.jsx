import React, { useEffect, useState } from 'react';
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  getLoginUserDetails,
  getUserData,
  updateUserData,
} from '../../redux/actions/authActions';
import toast from 'react-hot-toast';
import { reset } from '../../redux/slice/authSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditUserProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Move useSelector to the top so 'user' is defined for your hooks
  const { user, success, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  // 2. Fetch details safely on mount, AND reset state on unmount (when modal closes)
  useEffect(() => {
    if (user?._id) {
      dispatch(getLoginUserDetails(user._id));
    }

    // Cleanup function: Triggers when the modal unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setGender(user?.gender || '');
      setPhone(user?.phone || '');
      setDob(user?.dob ? new Date(user.dob) : null);
      setAddress(user?.address || '');
      setImage(user?.image || '');
    }
  }, [user]);

  const handleUpdate = (id) => {
    if (phone && !/^03\d{9}$/.test(phone)) {
      toast.error('Enter a valid 11-digit phone number starting with 03');
      return;
    }
    console.log('USER ID:', id);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('dob', dob ? dob.toISOString().split('T')[0] : '');
    dispatch(updateUserData({ id, formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success('user Updated');
      dispatch(reset()); // Clear success immediately so it won't re-trigger
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className='editModal modal d-block' tabIndex={-1}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Edit Your Profile</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={onClose}
              />
            </div>
            <div className='modal-body'>
              <div className='mod-details d-flex flex-column'>
                <img
                  src={`data:image/jpeg;base64,${user?.image}`}
                  alt='userPic'
                  height={80}
                  width={100}
                />
                <input
                  type='file'
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className='d-flex flex-row'>
                  <select
                    className='m-1'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <DatePicker
                    selected={dob ? new Date(dob) : null}
                    onChange={(date) => setDob(date)}
                    dateFormat='dd-MM-yyyy'
                    placeholderText='Select DOB'
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode='select'
                    className='form-control'
                  />
                </div>
                <input
                  type='text'
                  placeholder='03XXXXXXXXX'
                  value={phone}
                  maxLength={11}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPhone(value);
                  }}
                />
                <input
                  type='text'
                  placeholder='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={onClose}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => handleUpdate(user?._id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;

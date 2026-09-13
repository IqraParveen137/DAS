import React, { useState } from 'react';
import API from '../../Api/API';
import { NavLink, useNavigate } from 'react-router';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('');
  const [fees, setFees] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('degree', degree);
      formData.append('fees', fees);
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('speciality', speciality);
      formData.append('experience', experience);
      formData.append('dob', dob);

      if (image) {
        formData.append('image', image);
      }

      const res = await API.post('/doctor/signup', formData);

      console.log(res.data);

      if (res.data.success) {
        alert('Doctor Registered Successfully');
        navigate('/doctor-login');
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || 'Registration Failed');
    }
  };
  return (
    <div className='container mt-5'>
      <h2>Doctor Register</h2>

      <input
        className='form-control mb-2'
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Degree'
        onChange={(e) => setDegree(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Speciality'
        onChange={(e) => setSpeciality(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Experience'
        onChange={(e) => setExperience(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Fees'
        onChange={(e) => setFees(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Phone'
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Address'
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        className='form-control mb-2'
        type='date'
        onChange={(e) => setDob(e.target.value)}
      />

      <input
        className='form-control mb-2'
        type='file'
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className='btn btn-success' onClick={handleRegister}>
        Register
      </button>

      <p className='mt-3'>
        Already have an account?
        <NavLink to='/doctor-login'>Login</NavLink>
      </p>
    </div>
  );
};

export default DoctorRegister;

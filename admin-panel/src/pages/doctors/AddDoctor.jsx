import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addDoctor } from '../../redux/actions/doctorActions';
import InputForm from '../../components/Forms/InputForm';
import InputSelect from '../../components/Forms/InputSelect';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [degree, setDegree] = useState('');
  const [fees, setFees] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddDoctor = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !image ||
      !speciality ||
      !experience ||
      !degree ||
      !fees ||
      !gender ||
      !address ||
      !phone ||
      !dob
    ) {
      return toast.error('Please Provide All Fields');
    }

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);
      formData.append('speciality', speciality);
      formData.append('experience', experience);
      formData.append('degree', degree);
      formData.append('fees', fees);
      formData.append('gender', gender);
      formData.append('address', address);
      formData.append('phone', phone);
      formData.append('dob', dob);

      await dispatch(addDoctor(formData)).unwrap();

      toast.success('Doctor Created!');
      navigate('/all-doctors');
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <Layout>
      <div className='d-flex p-3 justify-content-between bg-light'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/all-doctors')}
        >
          GO BACK
        </button>
      </div>
      <div className='w-75'>
        <InputForm label={'Name'} value={name} setValue={setName} />
        <InputForm label={'Email'} value={email} setValue={setEmail} />
        <InputForm label={'Password'} value={password} setValue={setPassword} />
        <InputSelect
          label={'Speciality'}
          value={speciality}
          setValue={setSpeciality}
          options={['Select Speciality', 'Genral', 'dental', 'Mental', 'Eye']}
        />
        <InputForm
          label={'Experience'}
          value={experience}
          setValue={setExperience}
        />
        <InputForm label={'Degree'} value={degree} setValue={setDegree} />
        <InputForm label={'Fees'} value={fees} setValue={setFees} />
        <InputSelect
          label={'Gender'}
          value={gender}
          setValue={setGender}
          options={['Select Gender', 'Male', 'Female']}
        />

        <InputForm label={'Address'} value={address} setValue={setAddress} />
        <InputForm label={'Phone'} value={phone} setValue={setPhone} />
        <InputForm label={'Dob'} value={dob} setValue={setDob} />
        <div className='mb-3'>
          <label htmlFor='form-label'>Select Image:</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary' onClick={handleAddDoctor}>
          ADD NEW DOCTOR
        </button>
      </div>
    </Layout>
  );
};

export default AddDoctor;

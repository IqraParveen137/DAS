import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  deleteDoctor,
  getDoctorDetails,
  updateDoctor,
  updateStatus,
} from '../../redux/actions/doctorActions';
import { useState } from 'react';
import toast from 'react-hot-toast';
import InputForm from '../../components/Forms/InputForm';
import InputSelect from '../../components/Forms/InputSelect';

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);
  const { doctor, success, error } = useSelector((state) => state.doctor);
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [degree, setDegree] = useState('');
  const [fees, setFees] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  useEffect(() => {
    if (doctor) {
      setName(doctor?.name);
      setEmail(doctor?.email);
      setImage(doctor?.image);
      setSpeciality(doctor?.speciality);
      setExperience(doctor?.experience);
      setDegree(doctor?.degree);
      setFees(doctor?.fees);
      setGender(doctor?.gender);
      setAddress(doctor?.address);
      setPhone(doctor?.phone);
      setDob(doctor?.dob);
    }
  }, [doctor]);
  //update
  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (image) {
      formData.append('image', image);
    }
    formData.append('speciality', speciality);
    formData.append('experience', experience);
    formData.append('degree', degree);
    formData.append('fees', fees);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('dob', dob);
    dispatch(updateDoctor({ id, formData }));
    if (success) {
      toast.success('Doctor Updated');
      navigate('/all-doctors');
    }
    if (error) {
      toast.error(error);
    }
  };
  //delete doctor
  const handleDelete = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this doctor?',
    );
    if (confirm) {
      dispatch(deleteDoctor(id));
    }
    if (success) {
      toast.success('Doctor Deleted!');
      navigate('/all-doctors');
    }
    if (error) {
      toast.error(error);
    }
  };
  const handleUpdateStatus = (id, available) => {
    dispatch(updateStatus({ id, available }));
    if (success) {
      toast.success('Doctor Status Updated!');
      navigate('/all-doctors');
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <Layout>
      <div className='d-flex p-3 justify-content-between bg-light'>
        <h1>Doctor Details</h1>
        <div className='ms-auto'>
          <button
            className='btn btn-warning ms-3'
            onClick={() => setEdit(!edit)}
          >
            {edit ? 'EDIT' : 'CANCEL'}
          </button>
          <button
            className='btn btn-danger ms-3'
            onClick={() => handleDelete(doctor?._id)}
          >
            DELETE
          </button>
        </div>
      </div>
      <div className='w-75'>
        <img
          src={
            doctor?.image
              ? `data:image/jpeg;base64,${doctor.image}`
              : '/doctor-placeholder.png'
          }
          alt='doctor-image'
          className='bg-info border rounded-3'
          height={250}
          width={250}
        />
        <InputForm
          label={'Name'}
          value={name}
          setValue={setName}
          disabled={edit}
        />
        <InputForm
          label={'Email'}
          value={email}
          setValue={setEmail}
          disabled={edit}
        />
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
          disabled={edit}
        />
        <InputForm
          label={'Degree'}
          value={degree}
          setValue={setDegree}
          disabled={edit}
        />
        <InputForm
          label={'Fees'}
          value={fees}
          setValue={setFees}
          disabled={edit}
        />
        <InputSelect
          label={'Gender'}
          value={gender}
          setValue={setGender}
          options={['Select Gender', 'Male', 'Female']}
          disabled={edit}
        />
        <InputForm
          label={'Address'}
          value={address}
          setValue={setAddress}
          disabled={edit}
        />
        <InputForm
          label={'Phone'}
          value={phone}
          setValue={setPhone}
          disabled={edit}
        />
        <InputForm
          label={'Dob'}
          value={dob}
          setValue={setDob}
          disabled={edit}
        />
        <div className='mb-3'>
          <label htmlFor='form-label'>Select Image:</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className='form-control'
          />
        </div>
        <div className='flex' style={{ marginBottom: '50px' }}>
          <button
            className='btn btn-primary'
            onClick={() => handleUpdate(doctor?._id)}
          >
            UPDATE DOCTOR
          </button>
          {doctor?.available ? (
            <button
              className='btn btn-danger'
              onClick={() =>
                handleUpdateStatus(doctor?._id, { available: false })
              }
            >
              MARK AS UN-AVAILABLE
            </button>
          ) : (
            <button
              className='btn btn-success'
              onClick={() =>
                handleUpdateStatus(doctor?._id, { available: true })
              }
            >
              MARK AS AVAILABLE
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDetails;

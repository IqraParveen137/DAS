import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import InputForm from '../../components/Forms/InputForm';
import InputSelect from '../../components/Forms/InputSelect';

import {
  getLoginDoctorDetails,
  updateDoctor,
  updateStatus,
} from '../../redux/actions/doctorActions';

const DoctorEditProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { doctor, success, error } = useSelector((state) => state.doctor);

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
    if (isOpen && doctor) {
      setName(doctor.name || '');
      setEmail(doctor.email || '');
      setSpeciality(doctor.speciality || '');
      setExperience(doctor.experience || '');
      setDegree(doctor.degree || '');
      setFees(doctor.fees || '');
      setGender(doctor.gender || '');
      setAddress(doctor.address || '');
      setPhone(doctor.phone || '');
      setDob(doctor.dob || '');
    }
  }, [isOpen, doctor]);
  useEffect(() => {
    if (success && doctor?._id) {
      dispatch(getLoginDoctorDetails(doctor._id));
    }
  }, [success]);

  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);

    if (image instanceof File) {
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

    try {
      await dispatch(updateDoctor({ id: doctor._id, formData })).unwrap();

      toast.success('Profile Updated Successfully');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      dispatch(getLoginDoctorDetails(doctor._id));

      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdateStatus = async (available) => {
    try {
      await dispatch(
        updateStatus({
          id: doctor._id,
          available: { available },
        }),
      ).unwrap();

      toast.success('Status Updated');

      dispatch(getLoginDoctorDetails(doctor._id));
    } catch (error) {
      toast.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className='modal fade show'
        style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4>Edit Doctor Profile</h4>

              <button className='btn-close' onClick={onClose}></button>
            </div>

            <div className='modal-body'>
              <div className='text-center mb-3'>
                {doctor?.image && (
                  <img
                    src={
                      doctor?.image
                        ? `data:image/jpeg;base64,${doctor.image}`
                        : '/src/assets/images/default-doctor.png'
                    }
                    alt='doctor'
                    width={150}
                    height={150}
                    className='rounded-circle border'
                  />
                )}
              </div>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='form-control mb-3'
              />
              <InputForm label='Email' value={email} setValue={setEmail} />
              <InputSelect
                label='Speciality'
                value={speciality}
                setValue={setSpeciality}
                options={[
                  'General Physician',
                  'Cardiologist',
                  'Dermatologist',
                  'Dentist',
                  'Gynecologist',
                  'Pediatrician',
                  'Neurologist',
                  'Psychiatrist',
                  'Orthopedic',
                  'Ophthalmologist',
                  'ENT Specialist',
                  'Urologist',
                  'Gastroenterologist',
                  'Pulmonologist',
                  'Endocrinologist',
                  'Nephrologist',
                  'Oncologist',
                  'General Surgeon',
                  'Radiologist',
                  'Anesthesiologist',
                ]}
              />
              <InputForm
                label='Experience'
                value={experience}
                placeholder='Enter experience in years'
                setValue={(value) => {
                  if (/^\d{0,2}$/.test(value)) {
                    setExperience(value);
                  }
                }}
              />
              <InputSelect
                label='Degree'
                value={degree}
                setValue={setDegree}
                options={[
                  'MBBS',
                  'BDS',
                  'FCPS',
                  'MD',
                  'MS',
                  'MRCP',
                  'FRCS',
                  'DPT',
                  'Pharm-D',
                  'MPhil',
                  'Other',
                ]}
              />
              <InputForm
                label='Consultation Fee'
                value={fees}
                setValue={(value) => {
                  if (/^\d{0,4}$/.test(value)) {
                    setFees(value);
                  }
                }}
              />
              <InputSelect
                label='Gender'
                value={gender}
                setValue={setGender}
                options={['Male', 'Female']}
              />
              <InputForm
                label='Address'
                value={address}
                setValue={setAddress}
                placeholder='Enter clinic/hospital address'
              />
              <InputForm label='Phone' value={phone} setValue={setPhone} />
              <InputForm
                label='Date of Birth'
                inputType='date'
                value={dob}
                setValue={setDob}
              />{' '}
              <div className='mb-3'>
                <label className='form-label'>Change Image</label>

                <input
                  type='file'
                  className='form-control'
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <button className='btn btn-primary' onClick={handleUpdate}>
                  Update Profile
                </button>

                {doctor?.available ? (
                  <button
                    className='btn btn-danger'
                    onClick={() => handleUpdateStatus(false)}
                  >
                    Mark As Unavailable
                  </button>
                ) : (
                  <button
                    className='btn btn-success'
                    onClick={() => handleUpdateStatus(true)}
                  >
                    Mark As Available
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorEditProfile;

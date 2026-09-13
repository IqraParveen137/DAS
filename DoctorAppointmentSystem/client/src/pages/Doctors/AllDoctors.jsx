import React, { useEffect } from 'react';
import { NavLink } from 'react-router';
import './AllDoctors.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../redux/actions/doctorActions';

const AllDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);

  const { search } = useSelector((state) => state.search);

  const filteredDoctors = doctors?.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.Speciality?.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality?.toLowerCase().includes(search.toLowerCase()) ||
      d.address?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className='container doc-container'>
        <h4 className='text-center text-success mt-3'>
          Select A Doctor And Book Your Appointment Online Now
        </h4>

        <div className='d-flex flex-wrap'>
          {filteredDoctors?.map((d) => (
            <div className='card m-4' key={d._id} style={{ width: '15rem' }}>
              <NavLink to={`/doctors/${d._id}`}>
                <img
                  src={`data:image/jpeg;base64,${d?.image}`}
                  alt='picture'
                  width={150}
                  height={150}
                  className='card-image-top'
                />

                <div className='card-body'>
                  <h6>{d.name}</h6>

                  <p>{d.degree}</p>
                </div>

                <div className='card-footer'></div>

                <p>
                  <i className={d.icon}></i>

                  {d.Speciality || d.speciality}
                </p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;

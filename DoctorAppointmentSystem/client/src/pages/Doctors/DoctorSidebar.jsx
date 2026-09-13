import React from 'react';
import { NavLink } from 'react-router';

const DoctorSidebar = () => {
  return (
    <div className='list-group'>
      <NavLink to='/doctor/dashboard' className='list-group-item'>
        Dashboard
      </NavLink>

      <NavLink to='/doctor/profile' className='list-group-item'>
        My Profile
      </NavLink>

      <NavLink to='/doctor/appointments' className='list-group-item'>
        My Appointments
      </NavLink>

      <NavLink to='/doctor/reset-password' className='list-group-item'>
        Change Password
      </NavLink>
    </div>
  );
};

export default DoctorSidebar;

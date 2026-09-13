import React from 'react';
import Topbar from './Topbar';
import Navmenu from './Navmenu';
import { NavLink } from 'react-router';
import Logo from '../../../assets/images/logo.png';
const Navbar = () => {
  return (
    <>
      <div className='navbar-container sticky-top'>
        <div className='row'>
          <div className='col-md-2'>
            <NavLink to='/'>
              <img src={Logo} alt='logo' className='brand-logo' />
            </NavLink>
          </div>
          <div className='col-md-10'>
            <Topbar />
            {/*Main menu*/}
            <Navmenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

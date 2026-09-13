import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { getUserData } from '../../../../../../admin-panel/src/redux/actions/authActions';
import { setSearch } from '../../../redux/slice/searchSlice';

const Navmenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const appData = JSON.parse(localStorage.getItem('appData'));

  const doctorLoggedIn = !!appData?.doctor;
  useEffect(() => {
    const appData = JSON.parse(localStorage.getItem('appData'));

    if (appData?.user) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const { doctor } = useSelector((state) => state.doctor);

  return (
    <>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarTogglerDemo01'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link active' to='/'>
                  Home
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink className='nav-link' to='/about'>
                  About
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink className='nav-link' to='/doctors'>
                  Doctor
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink className='nav-link' to='/gallery'>
                  Gallery
                </NavLink>
              </li>
            </ul>

            {/* SEARCH */}

            <form className='d-flex'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search Doctor'
                onChange={(e) => {
                  dispatch(setSearch(e.target.value));

                  navigate('/doctors');
                }}
              />
            </form>

            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {user ? (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/user/profile'>
                    My Account
                  </NavLink>
                </li>
              ) : doctorLoggedIn ? (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/doctor/dashboard'>
                    My Account
                  </NavLink>
                </li>
              ) : (
                <li className='nav-item'>
                  <button
                    className='btn nav-link'
                    onClick={() => setShowLoginMenu(!showLoginMenu)}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {!user && !doctorLoggedIn && showLoginMenu && (
        <div className='container mt-2'>
          <div className='card shadow p-3 ms-auto' style={{ width: '250px' }}>
            <NavLink
              className='btn btn-primary mb-2'
              to='/login'
              onClick={() => setShowLoginMenu(false)}
            >
              Login as Patient
            </NavLink>

            <NavLink
              className='btn btn-success'
              to='/doctor-login'
              onClick={() => setShowLoginMenu(false)}
            >
              Login as Doctor
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navmenu;

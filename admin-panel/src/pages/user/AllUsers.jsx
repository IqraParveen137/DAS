import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const { loading, users } = useSelector((state) => state.user);
  return (
    <Layout>
      <h4 className='text-center my-3'>ALL users</h4>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>SN</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user?._id || i}>
                <td>{i + 1}</td>
                <td>{user?.name || 'No Name'}</td>
                <td>{user?.email}</td>
                <td>{user?.phone || 'NA'}</td>
                <td>
                  <Link to={`/user-details/${user?._id}`}>MORE DETAILS</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center py-3'>
                {loading ? 'Loading users...' : 'No Users Found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default AllUsers;

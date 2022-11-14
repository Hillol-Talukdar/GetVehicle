import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '../../Constants/CommonConstants';

const AdminPrivateRoute = () => {
  const user = useSelector((state) => state.userReducer);

  return user && user.token && user.role === UserRole.ADMIN ? <Outlet/> : <Navigate to="/" />;
};

export default AdminPrivateRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
  const user = useSelector((state) => state.userReducer);

  return user && user.token ? <Outlet/> : <Navigate to="/" />;
};

export default UserPrivateRoute;

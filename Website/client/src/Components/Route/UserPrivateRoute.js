import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  Outlet } from 'react-router-dom';
import { UserRole } from '../../Constants/CommonConstants';
import LoadingToRedirect from './LoadingToRedirect';

const UserPrivateRoute = () => {
  const user = useSelector((state) => state.userReducer);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token && user.role === UserRole.USER) {
      setOk(true);
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default UserPrivateRoute;

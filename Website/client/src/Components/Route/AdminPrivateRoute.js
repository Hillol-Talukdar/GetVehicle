import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { UserRole } from '../../Constants/CommonConstants';
import LoadingToRedirect from './LoadingToRedirect';

const AdminPrivateRoute = () => {
  const user = useSelector((state) => state.userReducer);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token && user.role === UserRole.ADMIN) {
      setOk(true);
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminPrivateRoute;

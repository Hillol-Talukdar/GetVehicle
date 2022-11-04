import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import HomeContainer from '../ContainerComponents/HomeContainer';

const UserPrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.userReducer);

  return user && user.token && user.role === UserRole.ADMIN ? (
    <Route {...rest} />
  ) : (
    <Route exact path="/" element={<HomeContainer />} />
  );
};

export default UserPrivateRoute;

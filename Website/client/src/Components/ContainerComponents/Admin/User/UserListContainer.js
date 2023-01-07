import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../../../Services/UserDataService';
import UserSingleItem from '../../../Item/User/UserSingleItem';

const UserListContainer = () => {
  const user = useSelector((state) => state.userReducer);
  const [allUsers, setAllUsers] = useState([]);

  const loadAllUsers = () => {
    getAllUsers(user.token)
      .then((res) => {
        setAllUsers(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  return (
    <Container>
      <h4>User List</h4>
      <div className="d-flex flex-wrap">
        {allUsers.map(
          (user) =>
            user.role !== 'Admin' && (
              <UserSingleItem userData={user}></UserSingleItem>
            )
        )}
      </div>
    </Container>
  );
};

export default UserListContainer;

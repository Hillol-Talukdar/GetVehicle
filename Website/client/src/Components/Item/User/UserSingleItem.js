import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAUser } from '../../../Services/UserDataService';
import './UserSingleItem.css';

const UserSingleItem = (props) => {
  const [isDataEdited, setIsDataEdited] = useState(false);

  const currentUserData = props.userData;

  const initState = {
    blocked: `${currentUserData?.blocked}`,
  };

  const loggedInUser = useSelector((state) => state.userReducer);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initState);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setIsDataEdited(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    updateAUser(currentUserData?._id, values, loggedInUser.token)
      .then((res) => {
        setLoading(false);
        setIsDataEdited(false);
        toast.success(`User is updated!`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      });
  };

  return (
    <>
      <div className="booking-single-item-container d-flex justify-content-between">
        <div className="w-100 d-flex mb-4">
          <div>
            {
              <Image
                id={currentUserData?._id}
                src={currentUserData?.image}
                key={currentUserData?._id}
                rounded
                thumbnail
                className="user-image"
              />
            }{' '}
            <span className="enhanced-label">
              {currentUserData?.name} ({currentUserData?._id})
            </span>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <Button
              size="sm"
              style={{ fontSize: 'medium' }}
              variant={isDataEdited ? 'outline-primary' : 'outline-secondary'}
              disabled={!isDataEdited}
              onClick={(e) => {
                submitHandler(e);
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>

        <div>
          <span>Email: </span>
          <span className="enhanced-label">{currentUserData?.email}</span>
        </div>

        <div>
          <span>Role: </span>
          <span className="enhanced-label">{currentUserData?.role}</span>
        </div>

        <div className="d-flex">
          <span className="dropdown-label">Blocked User: </span>
          <div>
            <Form.Select
              className="enhanced-select"
              name="blocked"
              size="sm"
              onChange={changeHandler}
            >
              <option value="true" selected={currentUserData?.blocked === true}>
                Yes
              </option>
              <option value="false" selected={currentUserData?.blocked === false}>
                No
              </option>
            </Form.Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSingleItem;

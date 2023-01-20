import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateABooking } from '../../../Services/BookingDataService';
import UserDetailsModal from '../../Modal/UserDetailsModal';
import './BookingSingleItem.css';
import { GoLinkExternal } from 'react-icons/go';

const BookingSingleItem = (props) => {
  const currentItem = props.item;
  const handedOverDataFromModel = currentItem?.handedOver;

  const initState = {
    paid: `${currentItem?.paid}`,
    handedOver: `${currentItem?.handedOver}`,
    received: `${currentItem?.received}`,
  };

  const user = useSelector((state) => state.userReducer);

  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [values, setValues] = useState(initState);
  const [isDataEdited, setIsDataEdited] = useState(false);
  const [handedOverToUser, setHandedOverToUser] = useState(
    handedOverDataFromModel === true ? true : false
  );

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateModalShow = () => {
    setShowUpdateModal(true);
  };

  const getFormattedDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleString('en-us', options);
  };

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setIsDataEdited(true);
  };

  const handleCancelBooking = (e) => {
    setLoading(true);

    if (window.confirm('Are you sure you want to cancel?')) {
      updateABooking(currentItem?._id, { isCanceled: true }, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`Booking is Canceled!`);
          props.setIsDataUpdated(true);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    updateABooking(currentItem?._id, values, user.token)
      .then((res) => {
        setLoading(false);
        setIsDataEdited(false);
        props.setIsDataUpdated(true);
        toast.success(`Booking is updated!`);
        if (res?.data?.data?.handedOver) {
          setHandedOverToUser(true);
        }
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
        <div className="w-100 d-flex mb-3">
          <div style={{ marginRight: '20px' }}>
            <Link
              target="_blank"
              to={'/details/' + currentItem?.vehicle?._id}
              style={{ textDecoration: 'none', color: '#0d6efd', fontSize: 'large' }}
            >
              {currentItem?.vehicle?.model} &nbsp; <GoLinkExternal style={{color: '#0275d8'}} />
            </Link>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <Button
              size="sm"
              style={{ fontSize: 'medium', marginRight: '10px', marginBottom: '5px' }}
              variant="outline-primary"
              onClick={(e) => {
                handleUpdateModalShow();
              }}
            >
              {props.isAdminPanel && user && user.role == 'Admin' && ("User Details")}
              {!props.isAdminPanel && user && user.role == 'User' && ("My Details")}
            </Button>

            <Button
              size="sm"
              style={{ fontSize: 'medium', marginRight: '10px',  marginBottom: '5px' }}
              variant="outline-danger"
              onClick={(e) => {
                handleCancelBooking();
              }}
            >
              Cancel Booking
            </Button>

            {props.isAdminPanel && user && user.role == 'Admin' && (
              <Button
                size="sm"
                style={{ fontSize: 'medium',  marginBottom: '5px' }}
                variant={isDataEdited ? 'outline-primary' : 'outline-secondary'}
                disabled={!isDataEdited}
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <div>
          <span>Booked For: </span>
          <span className="enhanced-label">
            {currentItem?.totalDays}{' '}
            {currentItem?.totalDays > 1 ? 'Days' : 'Day'}
          </span>
        </div>

        <div>
          <span>Total Amount: </span>
          <span className="enhanced-label">
            {currentItem?.totalAmount} Taka
          </span>
        </div>

        <div>
          <span>Payment Method: </span>
          <span className="enhanced-label">{currentItem?.paymentMethod} </span>
        </div>

        <div>
          <span>Booked From: </span>
          <span className="enhanced-label">
            {getFormattedDate(currentItem?.handOverDate)}
          </span>
        </div>

        <div>
          <span>Booked Till: </span>
          <span className="enhanced-label">
            {getFormattedDate(currentItem?.receiveDate)}
          </span>
        </div>

        {props.isAdminPanel && (
          <>
            <div className="d-flex">
              <span className="dropdown-label">Payment Status: </span>
              <div>
                <Form.Select
                  className="enhanced-select"
                  name="paid"
                  size="sm"
                  onChange={changeHandler}
                >
                  <option value="true" selected={currentItem?.paid === true}>
                    Paid
                  </option>
                  <option value="false" selected={currentItem?.paid === false}>
                    Unpaid
                  </option>
                </Form.Select>
              </div>
            </div>

            <div className="d-flex">
              <span className="dropdown-label">Handed Over To User: </span>
              <div>
                <Form.Select
                  className="enhanced-select"
                  name="handedOver"
                  size="sm"
                  disabled={handedOverDataFromModel}
                  onChange={changeHandler}
                >
                  <option
                    value="true"
                    selected={currentItem?.handedOver === true}
                  >
                    Yes
                  </option>
                  <option
                    value="false"
                    selected={currentItem?.handedOver === false}
                  >
                    No
                  </option>
                </Form.Select>
              </div>
            </div>

            <div className="d-flex">
              <span className="dropdown-label">Got Back From User: </span>
              <div>
                <Form.Select
                  className="enhanced-select"
                  name="received"
                  size="sm"
                  onChange={changeHandler}
                  disabled={!handedOverToUser}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="WIl be enable if vehicle is Handed Over To User."
                >
                  <option
                    value="true"
                    selected={currentItem?.received === true}
                  >
                    Yes
                  </option>
                  <option
                    value="false"
                    selected={currentItem?.received === false}
                  >
                    No
                  </option>
                </Form.Select>
              </div>
            </div>
          </>
        )}

        {!props.isAdminPanel && (
          <>
            <div>
              <span>Payment Status: </span>
              <span className="enhanced-label">
                {currentItem?.paid ? 'Paid' : 'Not Paid'}
              </span>
            </div>

            <div>
              <span>Recieved Vehicle: </span>
              <span className="enhanced-label">
                {currentItem?.handedOver ? 'Yes' : 'Not yet'}
              </span>
            </div>

            <div>
              <span>Returned vehicle: </span>
              <span className="enhanced-label">
                {currentItem?.received ? 'Yes' : 'Not yet'}
              </span>
            </div>
          </>
        )}
      </div>

      <UserDetailsModal
        show={showUpdateModal}
        handleClose={handleUpdateModalClose}
        userData={currentItem?.user}
        userPhoneNumber={currentItem?.userPhoneNumber}
      />
    </>
  );
};

export default BookingSingleItem;

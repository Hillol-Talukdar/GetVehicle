import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateABooking } from '../../../Services/BookingDataService';
import UserDetailsModal from '../../Modal/UserDetailsModal';
import './BookingSingleItem.css';

const BookingSingleItem = (props) => {
  const [isDataEdited, setIsDataEdited] = useState(false);

  const currentItem = props.item;

  const initState = {
    paid: `${currentItem?.paid}`,
    handedOver: `${currentItem?.handedOver}`,
    received: `${currentItem?.received}`,
  };

  const user = useSelector((state) => state.userReducer);

  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [values, setValues] = useState(initState);

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateModalShow = () => {
    setShowUpdateModal(true);
  };


  const getFormattedDate = (date) => {
    return new Date(date).toUTCString().substring(0, 16);
  };

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setIsDataEdited(true);
  };

  const handleCancelBooking= (e) => {
    setLoading(true);

    if (window.confirm("Are you sure you want to cancel?")) {
      updateABooking(currentItem?._id, { isCanceled: true}, user.token)
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
  }

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    updateABooking(currentItem?._id, values, user.token)
      .then((res) => {
        setLoading(false);
        setIsDataEdited(false);
        toast.success(`Booking is updated!`);
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
            <span className="enhanced-label">
              {currentItem?.vehicle?.model} ({currentItem?.vehicle?._id})
            </span>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <Button
              size="sm"
              style={{ fontSize: 'medium', marginRight: '10px' }}
              variant="outline-primary"
              onClick={(e) => {
                handleUpdateModalShow();
              }}
            >
              User Details
            </Button>
            <Button
              size="sm"
              style={{ fontSize: 'medium', marginRight: '10px' }}
              variant="outline-danger"
              onClick={(e) => {
                handleCancelBooking();
              }}
            >
              Cancel Booking
            </Button>
            <Button
              size="sm"
              style={{ fontSize: 'medium' }}
              variant={isDataEdited ? "outline-primary" : "outline-secondary"}
              disabled={!isDataEdited}
              onClick={e=> {
                submitHandler(e)
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>

        <div>
          <span>Booked For: </span>
          <span className="enhanced-label">
            {currentItem?.totalDays} {currentItem?.totalDays > 1 ? 'Days' : 'Day'}
          </span>
        </div>

        <div>
          <span>Total Amount: </span>
          <span className="enhanced-label">{currentItem?.totalAmount} Taka</span>
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
              onChange={changeHandler}
            >
              <option value="true" selected={currentItem?.handedOver === true}>
                Yes
              </option>
              <option value="false" selected={currentItem?.handedOver === false}>
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
            >
              <option value="true" selected={currentItem?.received === true}>
                Yes
              </option>
              <option value="false" selected={currentItem?.received === false}>
                No
              </option>
            </Form.Select>
          </div>
        </div>
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

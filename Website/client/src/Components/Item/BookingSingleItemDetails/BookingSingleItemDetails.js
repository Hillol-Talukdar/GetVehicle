import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserDetailsModal from '../../Modal/UserDetailsModal';
import './BookingSingleItemDetails.css';

const BookingSingleItemDetails = (props) => {
  const currentItem = props.item;

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateModalShow = () => {
    setShowUpdateModal(true);
  };

  const getFormattedDate = (date) => {
    return new Date(date).toUTCString().substring(0, 16);
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

        <div>
          <span>Payment Status: </span>
          <span className="enhanced-label">
            {currentItem?.paid ? 'Paid' : 'Not Paid'}{' '}
          </span>
        </div>

        <div>
          <span>Handed Over To User: </span>
          <span className="enhanced-label">
            {currentItem?.handedOver ? 'Yes' : 'Not yet'}{' '}
          </span>
        </div>

        <div>
          <span>Got Back From User: </span>
          <span className="enhanced-label">
            {currentItem?.received ? 'Yes' : 'Not yet'}{' '}
          </span>
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

export default BookingSingleItemDetails;

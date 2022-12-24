import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './BookingSingleItem.css';

const BookingSingleItem = (props) => {
  const currentItem = props.item;

  const getFormattedDate = (date) => {
    return new Date(date).toUTCString().substring(0, 16);
  };

  return (
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
          >
            User Details
          </Button>
          <Button
            size="sm"
            style={{ fontSize: 'medium' }}
            variant="outline-primary"
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
            name="payment_status"
            size="sm"
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
            name="is_handed_over_to_user"
            size="sm"
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
            name="is_handed_over_to_user"
            size="sm"
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
  );
};

export default BookingSingleItem;

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './BookingSingleItem.css';

const BookingSingleItem = (props) => {
  const currentItem = props.item;

  const getFormattedDate = (date) => {
    return new Date(date).toUTCString().substring(0, 16);
  };

  return (
    <div className="booking-single-item-container d-flex justify-content-between">
      <div className='w-100'>
        <span>{currentItem?.vehicle?.model} ({currentItem?.vehicle?._id})</span>
      </div>
      <div>
        <span>Booked For: </span>
        <span>{currentItem?.totalDays} </span>
        <span>Days</span>
      </div>
      <div>
        <span>Total Amount: </span>
        <span>{currentItem?.totalAmount} </span>
        <span>Taka</span>
      </div>
      <div>
        <span>Payment Method: </span>
        <span>{currentItem?.paymentMethod} </span>
      </div>
      <div>
        <span>Payment Status: </span>
        <span>{currentItem?.paid ? 'Paid' : 'Unpaid'}</span>
      </div>
      <div>
        <span>Handed Over To User: </span>
        <span>{currentItem?.handedOver ? 'Yes' : 'No'}</span>
      </div>
      <div>
        <span>Hand Over To User On: </span>
        <span>{getFormattedDate(currentItem?.handOverDate)}</span>
      </div>
      <div>
        <span>Got Back From User: </span>
        <span>{currentItem?.received ? 'Yes' : 'No'}</span>
      </div>
      <div>
        <span>Will Get Back From User On: </span>
        <span>{getFormattedDate(currentItem?.receiveDate)}</span>
      </div>
     <div style={{marginLeft: 'auto'}}>
        <Button size='sm' variant="outline-dark">User Details</Button>
     </div>
    
      
    </div>
  );
};

export default BookingSingleItem;

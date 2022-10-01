import React from 'react';
import { ListGroup } from 'react-bootstrap';

const VehicleDatalistItem = ({ data }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="d-flex justify-content-between">
        Transmission:
        <span>{data?.transmission}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Fuel Type:
        <span>{data?.fuelType}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Engine:
        <span>{data?.engine}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Boot Space:
        <span>{data?.bootSpace}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Ground Clearance:
        <span>{data?.groundClearance}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Cost Per Day:
        <span>{data?.costPerDay}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Seat Count:
        <span>{data?.seatCount}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Booking Status:
        <span>{data?.bookingStatus}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Rating:
        <span>{data?.averageRating}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Category:
        <span>{data?.categories?.category}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Sub Category:
        <span>{data?.categories?.subCategory}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Currrent Location:
        <span>{data?.currrentLocation}</span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default VehicleDatalistItem;

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
        Fuel Type: {data?.fuelType}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Engine: {data?.engine}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Boot Space: {data?.bootSpace}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Ground Clearance: {data?.groundClearance}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Cost Per Day: {data?.costPerDay}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Seat Count: {data?.seatCount}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Booking Status: {data?.bookingStatus}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Rating: {data?.averageRating}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Category: {data?.categories?.category}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Sub Category: {data?.categories?.subCategory}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        Currrent Location: {data?.currrentLocation}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default VehicleDatalistItem;

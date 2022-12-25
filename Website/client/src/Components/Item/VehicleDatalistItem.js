import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {
  BookingStatus,
  VehicleInfoConstants,
} from '../../Constants/CommonConstants';
import { showAverageRating } from '../showAverageRating';

const VehicleDatalistItem = ({ data }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.MODEL}:<span>{data?.model}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.TRANSMISSON}:<span>{data?.transmission}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.FUAL_TYPE}:<span>{data?.fuelType}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.ENGINE}:<span>{data?.engine}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.MILEAGE}:<span>{data?.mileage}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.BOOT_SPACE}:<span>{data?.bootSpace}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.GROUND_CLEARANCE}:
        <span>{data?.groundClearance}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.COST_PER_DAY}:<span>{data?.costPerDay}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.SEAT_COUNT}:<span>{data?.seatCount}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.BOOKING_STATUS}:
        <span>
          {data?.bookingStatus
            ? BookingStatus.RESERVED
            : BookingStatus.UNRESERVED}
        </span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {/* {VehicleInfoConstants.RATING}:<span>{data?.averageRating}</span> */}
        {VehicleInfoConstants.RATING}:
        <span>
          {data?.ratings && data?.ratings?.length > 0
            ? showAverageRating(data)
            : 0}
        </span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.CATEGORY}:<span>{data?.category?.name}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.SUB_CATEGORY}:
        <span>{data?.subCategory?.name}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.CURRENT_LOCATION}:
        <span>{data?.currentLocationString}</span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default VehicleDatalistItem;

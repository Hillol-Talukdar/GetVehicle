import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {
  BookingStatus,
  VehicleInfoConstants,
} from '../../Constants/CommonConstants';
import { showAverageRating } from '../showAverageRating';

const VehicleDatalistItem = ({ data }) => {

  const checkAndShowProperVehicleInfo = (currentInfo) => {
    return currentInfo === '' ? VehicleInfoConstants.NOT_APPLICABLE : currentInfo;
  }

  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.CATEGORY}:<span>{data?.category?.name}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.VEHICLE_TYPE}:
        <span>{data?.subCategory?.name}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.TRANSMISSON}:<span>{checkAndShowProperVehicleInfo(data?.transmission)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.FUAL_TYPE}:<span>{checkAndShowProperVehicleInfo(data?.fuelType)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.ENGINE}:<span>{checkAndShowProperVehicleInfo(data?.engine)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.MILEAGE}:<span>{checkAndShowProperVehicleInfo(data?.mileage)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.BOOT_SPACE}:{<span>{checkAndShowProperVehicleInfo(data?.bootSpace)}</span>}
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.GROUND_CLEARANCE}:
        <span>{checkAndShowProperVehicleInfo(data?.groundClearance)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.COST_PER_DAY}:<span>{data?.costPerDay}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.SEAT_COUNT}:<span>{checkAndShowProperVehicleInfo(data?.seatCount)}</span>
      </ListGroup.Item>

      <ListGroup.Item className="d-flex justify-content-between">
        {VehicleInfoConstants.RATING}:
        <span>
          {data?.ratings && data?.ratings?.length > 0
            ? showAverageRating(data)
            : "Not Rated Yet"}
        </span>
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
        {VehicleInfoConstants.CURRENT_LOCATION}:
        <span>{data?.currentLocationString}</span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default VehicleDatalistItem;

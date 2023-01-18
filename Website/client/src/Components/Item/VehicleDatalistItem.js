import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import {
  BookingStatus,
  VehicleInfoConstants,
} from '../../Constants/CommonConstants';
import { useDispatch } from 'react-redux';
import { getBookingDetailsByVehicleId } from '../../Services/BookingDataService';
import { getVehicleDetails } from '../../Services/VehicleDataService';
import { showAverageRating } from '../showAverageRating';
import BookedSchedulesModal from '../Modal/BookedSchedulesModal';

const VehicleDatalistItem = ({ data }) => {
  const dispatch = useDispatch();
  const [showBookedSchedulesModal, setShowBookedSchedulesModal] = useState(false);
  const [scheduledBookings, setScheduledBookings] = useState([]);

  useEffect(() => {
    dispatch(getVehicleDetails(data?._id));

    getBookingDetailsByVehicleId(data?._id)
      .then((res) => {
        setScheduledBookings(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch, data]);

  const checkAndShowProperVehicleInfo = (currentInfo) => {
    return currentInfo === ''
      ? VehicleInfoConstants.NOT_APPLICABLE
      : currentInfo;
  };

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.CATEGORY}:<span>{data?.category?.name}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.VEHICLE_TYPE}:
          <span>{data?.subCategory?.name}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.TRANSMISSON}:
          <span>{checkAndShowProperVehicleInfo(data?.transmission)}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.FUAL_TYPE}:
          <span>{checkAndShowProperVehicleInfo(data?.fuelType)}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.ENGINE}:
          <span>{checkAndShowProperVehicleInfo(data?.engine)}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.MILEAGE}:
          <span>{checkAndShowProperVehicleInfo(data?.mileage)}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.BOOT_SPACE}:
          {<span>{checkAndShowProperVehicleInfo(data?.bootSpace)}</span>}
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.GROUND_CLEARANCE}:
          <span>{checkAndShowProperVehicleInfo(data?.groundClearance)}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.COST_PER_DAY}:<span>{data?.costPerDay}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.SEAT_COUNT}:
          <span>{checkAndShowProperVehicleInfo(data?.seatCount)}</span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.RATING}:
          <span>
            {data?.ratings && data?.ratings?.length > 0
              ? showAverageRating(data)
              : 'Not Rated Yet'}
          </span>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.BOOKED_DATES}:
          <Button
            onClick={() => setShowBookedSchedulesModal(true)}
            size="sm"
            variant="outline-info"
            style={{ border: 'none' }}
            className="check-booked-date-button"
          >
            Check Booked Dates
          </Button>
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between">
          {VehicleInfoConstants.CURRENT_LOCATION}:
          <span>{data?.currentLocationString}</span>
        </ListGroup.Item>
      </ListGroup>
      <BookedSchedulesModal
        show={showBookedSchedulesModal}
        handleClose={() => setShowBookedSchedulesModal(false)}
        scheduledBookings={scheduledBookings ? scheduledBookings : []}
      ></BookedSchedulesModal>
    </>
  );
};

export default VehicleDatalistItem;

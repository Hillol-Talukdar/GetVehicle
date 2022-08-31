import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { getVehicleDetails } from '../../Services/VehicleDataService';
import { ColorConstants } from '../../Constants/CommonConstants';

const ItemDetailsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;

  useEffect(() => {
    dispatch(getVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <Container
      fluid
      style={{ backgroundColor: ColorConstants.HOMEPAGE_BACKGROUND_COLOR }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Row className="p-3">
            <Col md={4}>
              <Image
                src={
                  vehicle?.data?.categories?.category == 'Bike'
                    ? '/templateBike.jpg'
                    : '/templateCar.jpg'
                }
                alt="Card image cap"
                fluid
              />
            </Col>

            <Col md={3}>
              <p>Model: {vehicle?.data?.model}</p>
              <p>Transmission: {vehicle?.data?.transmission}</p>
              <p>Fuel Type: {vehicle?.data?.fuelType}</p>
              <p>Engine: {vehicle?.data?.engine}</p>
              <p>Boot Space: {vehicle?.data?.bootSpace}</p>
              <p>Ground Clearance: {vehicle?.data?.groundClearance}</p>
              <p>Cost Per Day: {vehicle?.data?.costPerDay}</p>
              <p>Seat Count: {vehicle?.data?.seatCount}</p>
              <p>Booking Status: {vehicle?.data?.bookingStatus}</p>
              <p>Average Rating: {vehicle?.data?.averageRating}</p>
              <p>Category: {vehicle?.data?.categories?.category}</p>
              <p>Sub Category: {vehicle?.data?.categories?.subCategory}</p>
              <p>Currrent Location: {vehicle?.data?.currrentLocation}</p>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ItemDetailsContainer;

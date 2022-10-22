import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getVehicleDetails } from '../../Services/VehicleDataService';
import { ColorConstants } from '../../Constants/CommonConstants';
import DetailsSingleItem from '../Item/DetailsSingleItem/DetailsSingleItem';

const ItemDetailsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;
  let { data } = vehicle;

  useEffect(() => {
    dispatch(getVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <Container
      fluid
      // style={{ backgroundColor: ColorConstants.HOMEPAGE_BACKGROUND_COLOR }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <DetailsSingleItem data={data} />
        </>
      )}
    </Container>
  );
};

export default ItemDetailsContainer;

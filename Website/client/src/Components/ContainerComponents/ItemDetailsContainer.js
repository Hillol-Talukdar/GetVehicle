import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVehicleDetails } from '../../Services/VehicleDataService';

const ItemDetailsContainer = () => {
	const { id } = useParams();
  const dispatch = useDispatch();

  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;

  useEffect(() => {
    dispatch(getVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{vehicle.data?.model}</p>
        </>
      )}
    </>
  );
};

export default ItemDetailsContainer;

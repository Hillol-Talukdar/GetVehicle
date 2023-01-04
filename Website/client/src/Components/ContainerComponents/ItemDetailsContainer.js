import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getVehicleDetails,
  vehicleStar,
} from '../../Services/VehicleDataService';
import ReviewSection from '../Item/Review/ReviewSection/ReviewSection';
import DetailsSingleItem from '../Item/DetailsSingleItem/DetailsSingleItem';
import { toast } from 'react-toastify';

const ItemDetailsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer);

  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;
  let { data } = vehicle;

  const [star, setStar] = useState(0);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    if(vehicle && vehicle.data && vehicle.data.isTrashed) {
      setTimeout(()=>{
        window.location.replace('/');
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getVehicleDetails(id));
    setReloadPage(false);
  }, [dispatch, id, reloadPage]);

  useEffect(() => {
    if (data?.ratings && user) {
      let existingRatingObject = data?.ratings.find(
        (element) => element?.postedBy?.toString() === user?._id?.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const onClickStar = (newRating, name) => {
    setStar(newRating);
    vehicleStar(name, newRating, user.token).then((res) => {
      toast.success("Thanks For Your Valuable Review!");
      dispatch(getVehicleDetails(id));
    });
  };

  return (
    <Container fluid>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !loading && vehicle?.data?.isTrashed ? (
        <h5 className='text-danger'>This vehicle is deleted. Redirecting to Home...</h5>
      ) : (
        <>
          <DetailsSingleItem
            data={data}
            onClickStar={onClickStar}
            star={star}
          />

          <ReviewSection
            vehicleData={data}
            star={star}
            setReloadPage={setReloadPage}
          />
        </>
      )}
    </Container>
  );
};

export default ItemDetailsContainer;

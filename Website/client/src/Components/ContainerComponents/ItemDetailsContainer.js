import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  let navigate = useNavigate();

  const user = useSelector((state) => state.userReducer);

  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;
  let { data } = vehicle;

  const [star, setStar] = useState(0);
  const [reloadPage, setReloadPage] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    setStar(0);
  }, [dispatch, id, reloadPage]);

  useEffect(() => {
    if (data?.ratings && user) {
      let existingRatingObject = data?.ratings.find(
        (element) => element?.postedBy?.toString() === user?._id?.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const handleShowModal = () => {
    if (user && user.token) {
      setShowModal(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const onClickStar = (newRating, name) => {
    handleCloseModal();

    vehicleStar(name, newRating, user.token).then((res) => {
      setStar(newRating);
      toast.success("Thanks For Your Valuable Review!");
      dispatch(getVehicleDetails(id));
    }).catch(err => {
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
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
            user = {user}
            onClickStar={onClickStar}
            star={star}
            showModal= {showModal}
            handleShowModal = {handleShowModal}
            handleCloseModal = {handleCloseModal}
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

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { googleLogin } from '../../../../Services/GoogleAuthService';
import { getVehicleDetails } from '../../../../Services/VehicleDataService';
import AskForLoginModal from '../../../Modal/AskForLoginModal';

const Booking = () => {
  const user = useSelector((state) => state.userReducer);
  const [showLoginModal, setShowLoginModal] = useState(user ? false : true);

  const { id } = useParams();

  const dispatch = useDispatch();
  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;
  const { data } = vehicle;

  useEffect(() => {
    dispatch(getVehicleDetails(id));
  }, [dispatch, id]);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const startGoogleLoginProcess = () => {
    googleLogin(dispatch);
    handleLoginModalClose();
  };

  return (
    <Container fluid>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <AskForLoginModal
            show={showLoginModal}
            handleClose={handleLoginModalClose}
            startGoogleLoginProcess={startGoogleLoginProcess}
          ></AskForLoginModal>
        </>
      )}
    </Container>
  );
};

export default Booking;

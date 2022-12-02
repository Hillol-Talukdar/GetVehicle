import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { googleLogin } from '../../../../Services/GoogleAuthService';
import { getVehicleDetails } from '../../../../Services/VehicleDataService';
import AskForLoginModal from '../../../Modal/AskForLoginModal';
import { ImLocation } from 'react-icons/im';
import { TbCurrencyTaka } from 'react-icons/tb';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';

const Booking = () => {
  const user = useSelector((state) => state.userReducer);
  const [showLoginModal, setShowLoginModal] = useState(user ? false : true);

  const { id } = useParams();

  const dispatch = useDispatch();
  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;
  const vehicleData = vehicle && vehicle.data;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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
          <div className='booking-container'>
            <div className='left-container'>
            {user && (
              <div className='user-details enhance-div'>
                <span className='field-bottom-margin'>Delivery To: {user.name}</span>
                <span>Email: {user.email}</span>
              </div>
              )
            }

            {vehicleData && (
              <div className='vehicle-details enhance-div'>
                <div className='vehicle-image'>
                <Image
                    id='vehicle-image'
                    src={vehicleData.photo.length ? vehicleData.photo[0] : 
                      vehicleData?.category?.name === 'Bike' ? '/templateBike.jpg' : '/templateCar.jpg'
                    }
                    alt='Vehicle Image'
                    key='vehicle-image'
                    fluid
                  />
                </div>
                <div className='vehicle-info'>
                  <span className='vehicle-model'>{vehicleData.model}</span>
                  <span className='field-bottom-margin vehicle-category'>{vehicleData.subCategory.name} {vehicleData.category.name}</span>
                  {/* <span className='field-bottom-margin location-details enhance-div'><TbCurrencyTaka/> Cost Per Day: {vehicleData.costPerDay}</span> */}
                  <div className='location-details enhance-div'>
                    <span>You will get your delivery from <ImLocation/> {vehicleData.currentLocationString}</span>  
                  </div>
                </div>
              </div>
            )
            }
            </div>
            
            <div className='booking-info enhance-div'>
              Select the range when you want to book
              <div className='date-picker-container'>
                <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
              </div>
            
            </div>
          </div>
          {/* <AskForLoginModal
            show={showLoginModal}
            handleClose={handleLoginModalClose}
            startGoogleLoginProcess={startGoogleLoginProcess}
          ></AskForLoginModal> */}
        </>
      )}
    </Container>
  );
};

export default Booking;

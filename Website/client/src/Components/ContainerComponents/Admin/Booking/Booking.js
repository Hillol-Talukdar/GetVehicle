import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { googleLogin } from '../../../../Services/GoogleAuthService';
import { getVehicleDetails } from '../../../../Services/VehicleDataService';
import AskForLoginModal from '../../../Modal/AskForLoginModal';
import { ImLocation } from 'react-icons/im';
import { FcMoneyTransfer } from 'react-icons/fc';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

const Booking = () => {
  const user = useSelector((state) => state.userReducer);
  const [showLoginModal, setShowLoginModal] = useState(user ? false : true);
  const [phoneNumber, setPhoneNumber] = useState('+880 ');

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

  const checkAndSetPhoneNumber = (e) => {
    let phoneNumberInput = e.target.value;
    if (phoneNumberInput.length <= 4) return;
    setPhoneNumber(e.target.value);
  };

  return (
    <Container fluid>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="booking-container">
            <div className="left-container">
              {user && (
                <div className="user-details enhance-div">
                  <div className="field-bottom-margin-x-lg">
                    <span className="enhanced-label">Delivery To</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="email">
                    <span className="enhanced-label">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="phone-number">
                    <span className="phone-number-label enhanced-label">
                      Phone
                    </span>
                    <input
                      className="form-control phone-number-input form-control-sm"
                      required
                      value={phoneNumber}
                      onChange={checkAndSetPhoneNumber}
                    ></input>
                    <span className="text-danger required-text">Required</span>
                  </div>
                </div>
              )}

              {vehicleData && (
                <div className="vehicle-details enhance-div">
                  <div className="vehicle-image enhance-div">
                    <Image
                      id="vehicle-image"
                      src={
                        vehicleData.photo.length
                          ? vehicleData.photo[0]
                          : vehicleData?.category?.name === 'Bike'
                          ? '/templateBike.jpg'
                          : '/templateCar.jpg'
                      }
                      alt="Vehicle Image"
                      key="vehicle-image"
                      fluid
                    />
                  </div>
                  <div className="vehicle-info">
                    <div className="vehicle-info-title enhance-div vehicle-info-items">
                      <span className="vehicle-model">{vehicleData.model}</span>
                      <span className="field-bottom-margin vehicle-category">
                        {vehicleData.subCategory.name}{' '}
                        {vehicleData.category.name}
                      </span>
                    </div>
                    <span className="field-bottom-margin vehicle-info-items enhance-div">
                      <img src="/money-icon.png" /> Cost Per Day:{' '}
                      {vehicleData.costPerDay}
                    </span>
                    <div className="vehicle-info-items enhance-div">
                      <span>
                        You can pick up your vehicle from{' '}
                        <img src="/location-icon.png" />{' '}
                        {vehicleData.currentLocationString}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="booking-info enhance-div">
              <div className="date-picker-container">
                <span className="field-bottom-margin">Select Date Range</span>
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

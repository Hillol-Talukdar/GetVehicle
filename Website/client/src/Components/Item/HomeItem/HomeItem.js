import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {
  UserRole,
  VehicleInfoConstants,
} from '../../../Constants/CommonConstants';
import { MdDoubleArrow } from 'react-icons/md';
import { FaRegHandPointRight } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import './HomeItem.css';
import { useSelector } from 'react-redux';
import { DELETE_VEHICLE_CONFIRMATION } from '../../../Constants/AlertConstants';
import { updateAVehicle } from '../../../Services/VehicleDataService';
import { toast } from 'react-toastify';

const HomeItem = (props) => {
  const loggedInUserDetails = useSelector((state) => state.userReducer);
  const user = useSelector((state) => state.userReducer);

  const currentItem = props.item;
  const coverPhoto =
    currentItem?.photo && currentItem?.photo.length
      ? currentItem?.photo[0]
      : currentItem?.category?.name === 'Bike'
      ? 'templateBike.jpg'
      : 'templateCar.jpg';

  const handleDeleteButtonClick = (e) => {
    if (window.confirm(DELETE_VEHICLE_CONFIRMATION)) {
      updateAVehicle(
        e.target.value,
        { [VehicleInfoConstants.IS_TRASHED_IN_MODEL]: true },
        user.token
      )
        .then((res) => {
          toast.success(`Deleted ${res.data.data.model} successfully!`);
          props.loadAllVehicles();
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
    }
  };

  return (
    <Card
      style={{ width: '15rem', margin: '8px' }}
      className="HomeItemCard flex-fill"
    >
      {loggedInUserDetails && loggedInUserDetails.role === UserRole.ADMIN && (
        <Link to='/admin/create-or-update-vehicle' state={currentItem}>
          <Button
            style={{ margin: '15px' }}
            variant="warning"
            size="sm"
          >
            Edit <BiEditAlt className="mb-1" />
          </Button>
        </Link>
      )}
      <Card.Img variant="top" src={coverPhoto} alt="Card image cap"></Card.Img>
      <Card.Body>
        <Card.Title>{currentItem.model}</Card.Title>
        <Card.Text>
          {VehicleInfoConstants.MILEAGE + ': ' + currentItem.mileage} {' | '}
          {VehicleInfoConstants.ENGINE + ': ' + currentItem.engine}
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <div className="d-flex justify-content-around">
          <Link to={'/details/' + currentItem._id}>
            <Button variant="outline-primary" size="sm">
              View Details <MdDoubleArrow className="mb-1" />
            </Button>
          </Link>

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.USER && (
            <Link to="#">
              <Button variant="outline-primary" size="sm">
                <FaRegHandPointRight className="mb-1" /> Book Now
              </Button>
            </Link>
          )}

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.ADMIN && (
            <Button
              onClick={handleDeleteButtonClick}
              value={currentItem._id}
              variant="outline-danger"
              size="sm"
            >
              <RiDeleteBin2Fill className="mb-1" /> Delete Now
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeItem;

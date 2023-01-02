import { React } from 'react';
import { Button, Carousel, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {
  UserRole,
  VehicleInfoConstants,
  ButtonConstants,
} from '../../../Constants/CommonConstants';
import { MdDoubleArrow } from 'react-icons/md';
import { FaRegHandPointRight } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import './HomeItem.css';
import { useSelector } from 'react-redux';
import { DELETE_CONFIRMATION } from '../../../Constants/AlertConstants';
import { updateAVehicle } from '../../../Services/VehicleDataService';
import { toast } from 'react-toastify';
import { showAverageRating } from '../../showAverageRating';
import Rating from "react-star-ratings";

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
    if (window.confirm(DELETE_CONFIRMATION)) {
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
      style={{ width: '13rem', margin: '8px' }}
      className="home-item-card flex-fill"
    >
      {loggedInUserDetails && loggedInUserDetails.role === UserRole.ADMIN && (
        <Link to="/admin/create-or-update-vehicle" state={currentItem}>
          <Button
            className="home-item-edit-button"
            variant="warning"
            size="sm"
            style={{ fontSize: 'small' }}
          >
            {ButtonConstants.EDIT_BUTTON} <BiEditAlt className="mb-1" />
          </Button>
        </Link>
      )}

      {currentItem?.photo && currentItem?.photo.length ? (
        <Carousel controls={false} indicators={false} interval={2500}>
          {currentItem?.photo.map((photo, idx) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={photo}
                alt="Vehicle Image Missing"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img
          variant="top"
          src={coverPhoto}
          alt="Vehicle Image Missing"
        ></Card.Img>
      )}

      <Card.Body>
        <Card.Title style={{ fontSize: 'medium' }}>
          {currentItem.model}
        </Card.Title>
        <Card.Text className="card-text-color">
          {/* {VehicleInfoConstants.MILEAGE + ': ' + currentItem.mileage} {' | '}
          {VehicleInfoConstants.ENGINE + ': ' + currentItem.engine} */}
          ৳ {currentItem.costPerDay} {' | '}{' '}
          {VehicleInfoConstants.ENGINE + ' ' + currentItem.engine}
        </Card.Text>
        <Card.Text>
          {currentItem?.ratings && currentItem?.ratings?.length > 0
            ? showAverageRating(currentItem)
            : (<div className="text-center d-flex">
            <span>
                <Rating
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="#ffd700"
                    editing={false}
                    rating={0}
                />
            </span>
            <span>
                &nbsp;(0)
            </span>
        </div>)}
        </Card.Text>
      </Card.Body>

      <Card.Footer style={{ border: 'none', borderWidth: 0, border: 0 }}>
        <div className="d-flex justify-content-around card-button-div">
          <Link to={'/details/' + currentItem._id}>
            <Button variant="info" size="sm" style={{ fontSize: 'small' }}>
              View Details <MdDoubleArrow className="mb-1" />
            </Button>
          </Link>

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.USER && (
            <Link to={'/booking/' + currentItem._id}>
              <Button variant="warning" size="sm" style={{ fontSize: 'small' }}>
                <FaRegHandPointRight className="mb-1" /> Book Now
              </Button>
            </Link>
          )}

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.ADMIN && (
            <Button
              onClick={handleDeleteButtonClick}
              value={currentItem._id}
              variant="danger"
              size="sm"
              style={{ fontSize: 'small' }}
            >
              <RiDeleteBin2Fill className="mb-1" /> Remove
            </Button>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default HomeItem;

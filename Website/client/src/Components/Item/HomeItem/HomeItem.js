import { React } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { UserRole, VehicleInfoConstants } from '../../../Constants/CommonConstants';
import { MdDoubleArrow } from 'react-icons/md'
import { FaRegHandPointRight } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import './HomeItem.css';
import { useSelector } from 'react-redux';

const HomeItem = (props) => {
  const loggedInUserDetails = useSelector((state) => state.userReducer);
  console.log(loggedInUserDetails);
  const currentItem = props.item;
  const coverPhoto =
    currentItem?.photo && currentItem?.photo.length
      ? currentItem?.photo[0]
      : currentItem?.category?.name === 'Bike'
        ? 'templateBike.jpg'
        : 'templateCar.jpg';

  return (
    <Card
      style={{ width: '15rem', margin: '8px' }}
      className="HomeItemCard flex-fill"
    >
      <Card.Img variant="top" src={coverPhoto} alt="Card image cap" />
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
            <Button variant="outline-primary" size="sm">View Details <MdDoubleArrow className='mb-1' /></Button>
          </Link>

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.USER && (
            <Link to="#">
              <Button variant="outline-primary" size="sm"><FaRegHandPointRight className='mb-1' /> Book Now</Button>
            </Link>
          )}

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.ADMIN && (
            <Link to="#">
              <Button variant="outline-danger" size="sm"><RiDeleteBin2Fill className='mb-1' /> Delete Now</Button>
            </Link>
          )}



        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeItem;

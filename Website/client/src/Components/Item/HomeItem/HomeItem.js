import { React } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { VehicleInfoConstants } from '../../../Constants/CommonConstants';
import './HomeItem.css';

const HomeItem = (props) => {
  const currentItem = props.item;
  const coverPhoto =
    currentItem?.photo && currentItem?.photo.length
      ? currentItem?.photo[0]
      : currentItem.categories.category === 'Bike'
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
          <Link to={'/details/' + currentItem._id}>View Details</Link>
          <Link to="#">Book Now</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeItem;

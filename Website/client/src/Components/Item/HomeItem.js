import { React, Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { VehicleInfoConstants } from '../../Constants/CommonConstants';

const HomeItem = (props) => {
  const currentItem = props.item;
  const coverPhoto =
    currentItem?.photo && currentItem?.photo.length
      ? currentItem?.photo[0]
      : currentItem.categories.category === 'Bike'
      ? 'templateBike.jpg'
      : 'templateCar.jpg';

  return (
    <Card style={{ width: '15rem', margin: '8px' }} className="flex-fill">
      <Card.Img variant="top" src={coverPhoto} alt="Card image cap" />
      <Card.Body>
        <Card.Title>{currentItem.model}</Card.Title>
        <Card.Text>
          {VehicleInfoConstants.MILEAGE + ': ' + currentItem.mileage} {' | '}
          {VehicleInfoConstants.ENGINE + ': ' + currentItem.engine}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Link href={'/details/' + currentItem._id}>View Details</Card.Link>
        <Card.Link href="#">Book Now</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default HomeItem;

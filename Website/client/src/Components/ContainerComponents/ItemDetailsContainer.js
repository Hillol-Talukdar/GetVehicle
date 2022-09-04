import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  Container,
  Tabs,
  Tab,
  Card,
  ListGroup,
} from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getVehicleDetails } from '../../Services/VehicleDataService';
import { ColorConstants } from '../../Constants/CommonConstants';

const ItemDetailsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const vehicleDetails = useSelector((state) => state.vehicleDetailsReducer);
  const { loading, error, vehicle } = vehicleDetails;
  let { data } = vehicle;
  let coverImages = ['/templateBike.jpg', '/templateCar.jpg'];

  useEffect(() => {
    dispatch(getVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <Container
      fluid
      style={{ backgroundColor: ColorConstants.HOMEPAGE_BACKGROUND_COLOR }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Row className="p-3">
            <Col md={6}>
              {/* {data?.photo && data?.photo.length ? (
                <Carousel showArrows={true} autoPlay infiniteLoop>
                  {data?.photo &&
                    data?.photo.map((photo) => (
                      <img src={photo.url} key={photo.public_id} />
                    ))}
                </Carousel>
              ) : (
                <Image
                  src={
                    data?.categories?.category == 'Bike'
                      ? '/templateBike.jpg'
                      : '/templateCar.jpg'
                  }
                  alt="Card image cap"
                  fluid
                />
              )} */}

              <Carousel showArrows={true} autoPlay infiniteLoop>
                {coverImages.map((photo) => (
                  <Image src={photo} key={photo.public_id} />
                ))}
              </Carousel>

              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="description" title="Description">
                  Description
                </Tab>
                <Tab eventKey="moree" title="More">
                  More
                </Tab>
              </Tabs>
            </Col>

            <Col md={6}>
              <h1>{data?.model}</h1>

              <Card>
                <Card.Body>
                  <Card.Text>
                    <p>Transmission: {data?.transmission}</p>
                    <p>Fuel Type: {data?.fuelType}</p>
                    <p>Engine: {data?.engine}</p>
                    <p>Boot Space: {data?.bootSpace}</p>
                    <p>Ground Clearance: {data?.groundClearance}</p>
                    <p>Cost Per Day: {data?.costPerDay}</p>
                    <p>Seat Count: {data?.seatCount}</p>
                    <p>Booking Status: {data?.bookingStatus}</p>
                    <p>Rating: {data?.averageRating}</p>
                    <p>Category: {data?.categories?.category}</p>
                    <p>Sub Category: {data?.categories?.subCategory}</p>
                    <p>Currrent Location: {data?.currrentLocation}</p>
                  </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ItemDetailsContainer;

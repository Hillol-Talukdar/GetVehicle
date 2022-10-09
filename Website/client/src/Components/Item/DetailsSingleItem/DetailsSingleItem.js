import React from 'react';
import { Row, Col, Image, Tabs, Tab, Card, ListGroup } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './DetailsSingleItem.css';
import VehicleDatalistItem from '../VehicleDatalistItem';
import { TabsConstants } from '../../../Constants/CommonConstants';
import { Link } from 'react-router-dom';

const DetailsSingleItem = ({ data }) => {
  let coverImages = ['/templateBike.jpg', '/templateCar.jpg'];

  return (
    <>
      <Row className="p-3">
        <Col md={7}>
          <div className="mt-3">
            {data?.photo && data?.photo.length ? (
              <Carousel
                showArrows={true}
                showThumbs={false}
                autoPlay
                infiniteLoop
              >
                {data?.photo.map((photo, idx) => (
                  <Image
                    id="CarouselImage"
                    src={photo}
                    alt="Card image cap"
                    key={idx}
                    fluid
                  />
                ))}
              </Carousel>
            ) : (
              <Image
                id="CarouselImage"
                src={
                  data?.category?.name == 'Bike'
                    ? '/templateBike.jpg'
                    : '/templateCar.jpg'
                }
                alt="Card image cap"
                fluid
              />
            )}
          </div>

          <Tabs
            defaultActiveKey={TabsConstants.DESCRIPTION}
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
          >
            <Tab eventKey={TabsConstants.DESCRIPTION} title="Description">
              Description
            </Tab>
            <Tab eventKey={TabsConstants.MORE} title="More">
              More
            </Tab>
          </Tabs>
        </Col>

        <Col md={5}>
          <h1>{data?.model}</h1>

          <Card id="itemDetailsCard">
            <Card.Body>
              <Card.Text>
                <VehicleDatalistItem data={data} />
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div className="d-flex justify-content-around">
                  <Link to={'/details'}>View Details</Link>
                  <Link to="#">Book Now</Link>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DetailsSingleItem;

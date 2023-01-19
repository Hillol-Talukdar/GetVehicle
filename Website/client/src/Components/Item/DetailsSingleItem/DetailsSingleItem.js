import React from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import Rating from 'react-star-ratings';
import { UserRole } from '../../../Constants/CommonConstants';
import { googleLogin } from '../../../Services/GoogleAuthService';
import RatingModal from '../../Modal/RatingModal';
import VehicleDatalistItem from '../VehicleDatalistItem';
import './DetailsSingleItem.css';

const DetailsSingleItem = ({ 
  data,
  user,
  onClickStar,
  star,
  showModal,
  handleShowModal,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    googleLogin(dispatch);
  };

  return (
    <>
      <Row className="p-2">
        <Col md={7}>
          <div className="d-flex">
            <h4 className='text-secondary'>Details of&nbsp;</h4>
            <h4 className='text-success'>{data?.model}</h4>
          </div>
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
                  data?.category?.name === 'Bike'
                    ? '/templateBike.jpg'
                    : '/templateCar.jpg'
                }
                alt="Card image cap"
                fluid
              />
            )}
          </div>
        </Col>

        <Col md={5}>
          <Card id="itemDetailsCard">
            <Card.Body>
              <Card.Text>
                <VehicleDatalistItem data={data} />
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div className="d-flex justify-content-around">
                  <RatingModal
                    user = {user}  
                    showModal = {showModal}
                    handleShowModal = {handleShowModal}
                    handleCloseModal = {handleCloseModal}
                    >
                      <Rating
                        name={data?._id}
                        numberOfStars={5}
                        rating={star}
                        isSelectable={true}
                        starRatedColor="#ffd700"
                        starHoverColor="#ffd700"
                        changeRating={onClickStar}
                      />
                  </RatingModal>

                  {user && user?.role === UserRole.USER ? (
                    <Link style={{width: '65%'}} className='btn btn-success' to={'/booking/' + data?._id}>Book Now</Link>
                  ) : (
                    <Button
                      variant='success'
                      onClick={handleGoogleLogin}
                      style={{width: '65%'}}
                    >
                      Login as a User to Book
                    </Button>
                  )}
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

import React from 'react';
import { Card } from 'react-bootstrap';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const ReviewSectionCard = ({ review }) => {
  const user = useSelector((state) => state.userReducer);

  return (
    <Card
      style={{ margin: '0 auto', marginTop: 16 }}
      className="home-item-card flex-fill"
    >
      <Card.Body>
        <Card.Title>{review?.user?.name}</Card.Title>
        <Card.Text>{review?.createdAt?.substr(11, 5)}</Card.Text>
      </Card.Body>

      <Card.Body>
        <Card.Text>{review?.comment}</Card.Text>

        {user?._id === review.user?._id && (
          <>
            <BiEditAlt
              className="commentEditIcon"
              style={{ color: 'orange', cursor: 'pointer' }}
            />

            <span>&nbsp;&nbsp;</span>

            <RiDeleteBin2Fill
              className="commentDeleteIcon"
              style={{ color: 'red', cursor: 'pointer' }}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewSectionCard;

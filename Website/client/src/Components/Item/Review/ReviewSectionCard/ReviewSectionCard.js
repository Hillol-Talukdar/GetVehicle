import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DELETE_CONFIRMATION } from '../../../../Constants/AlertConstants';
import {
  deleteAReview,
  updateAReview,
} from '../../../../Services/ReviewsService';
import UpdateReviewModal from '../../../Modal/UpdateReviewModal';
import Rating from 'react-star-ratings';

const ReviewSectionCard = ({ review, setReloadPage }) => {
  const user = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateModalShow = () => {
    setShowUpdateModal(true);
  };

  const modalChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const handleDelete = async (e) => {
    if (window.confirm(DELETE_CONFIRMATION)) {
      deleteAReview(review?._id, user.token)
        .then((res) => {
          toast.success(`Review is Deleted!`);
          setReloadPage(true);
        })
        .catch((err) => {
          toast.error(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
        });
    }
  };

  const submitHandler = (e, id) => {
    e.preventDefault();

    updateAReview(review?._id, { comment: comment }, user.token)
      .then((res) => {
        toast.success(`Review updated successfully!`);
        setComment('');
        handleUpdateModalClose();
        setReloadPage(true);
      })
      .catch((err) => {
        toast.error(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      });
  };

  const getFormattedDate = (date) => {
    return new Date(date).toUTCString();
  };

  return (
    <>
      <Card
        style={{ margin: '0 auto', marginTop: 16 }}
        className="home-item-card flex-fill"
      >
        <Card.Body>
          <Card.Title>
            {review?.user?.name}{' '}
            {
              <Rating
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#ffd700"
                editing={false}
                rating={review?.rating ? review?.rating : 0}
              />
            }
          </Card.Title>
          <Card.Text>{getFormattedDate(review?.createdAt)}</Card.Text>
        </Card.Body>

        <Card.Body>
          <Card.Text>{review?.comment}</Card.Text>

          {user?._id === review.user?._id && (
            <>
              <BiEditAlt
                className="commentEditIcon"
                style={{ color: 'orange', cursor: 'pointer' }}
                onClick={(e) => {
                  handleUpdateModalShow();
                  setComment(review?.comment);
                }}
              />

              <span>&nbsp;&nbsp;</span>
            </>
          )}

          {(user?._id === review.user?._id || user?.role === 'Admin') && (
            <>
              <RiDeleteBin2Fill
                className="commentDeleteIcon"
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={handleDelete}
              />
            </>
          )}
        </Card.Body>
      </Card>

      <UpdateReviewModal
        id={review?._id}
        show={showUpdateModal}
        handleClose={handleUpdateModalClose}
        comment={comment}
        submitHandler={submitHandler}
        changeHandler={modalChangeHandler}
      />
    </>
  );
};

export default ReviewSectionCard;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createReview } from '../../../../Services/ReviewsService';
import CreateOrUpdateReviewForm from '../../../Forms/CreateOrUpdateReviewForm';
import ReviewSectionCard from '../ReviewSectionCard/ReviewSectionCard';
import './ReviewSection.css';

const ReviewSection = ({ vehicleData, star, setReloadPage }) => {
  const [comment, setComment] = useState('');

  const user = useSelector((state) => state.userReducer);

  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e, id) => {
    e.preventDefault();

    createReview(
      {
        rating: star,
        comment: comment,
        deleted: false,
        user: `${user._id}`,
        vehicle: `${vehicleData?._id}`,
        isTrashed: false,
      },
      user.token
    )
      .then((res) => {
        toast.success(`Review posted successfully!`);
        setComment('');
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

  return (
    <>
      <h5 className="mt-4">{vehicleData?.reviews?.length} Reviews:</h5>

      <div className="mb-4 reviewSectionPostCommentContainer">
        <CreateOrUpdateReviewForm
          id=""
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          buttonName="Post"
        />
      </div>

      {vehicleData?.reviews?.map((review) => (
        <ReviewSectionCard
          key={review._id}
          review={review}
          setReloadPage={setReloadPage}
        />
      ))}
    </>
  );
};

export default ReviewSection;

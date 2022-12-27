import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createReview } from '../../../../Services/ReviewsService';
import CreateReviewForm from '../../../Forms/CreateReviewForm';
import ReviewSectionCard from '../ReviewSectionCard/ReviewSectionCard';
import './ReviewSection.css';


const ReviewSection = ({ vehicleData, star }) => {
  const [comment, setComment] = useState('');

  const user = useSelector((state) => state.userReducer);

  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
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
        window.location.reload();
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

      {vehicleData?.reviews?.map((review) => (
        <ReviewSectionCard key={review._id} review={review} />
      ))}

      <div className="mb-4 reviewSectionPostCommentContainer">
        <CreateReviewForm
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          buttonName="Post"
        />
      </div>
    </>
  );
};

export default ReviewSection;

import axios from 'axios';

export const createReview = async (reviewData, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/review`, reviewData, {
    headers: {
      authtoken,
    },
  });
};

export const deleteAReview = async (id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/review/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateAReview = async (id, reviewData, authtoken) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/review/${id}`,
    reviewData,
    {
      headers: {
        authtoken,
      },
    }
  );
};

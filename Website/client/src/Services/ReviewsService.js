import axios from 'axios';

export const createReview = async (reviewData, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/review`, reviewData, {
    headers: {
      authtoken,
    },
  });
};

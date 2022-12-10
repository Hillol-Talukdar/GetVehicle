import axios from 'axios';

export const getAllBookings = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/booking`, {
    headers: {
      authtoken,
    },
  });
};

export const getBookingDetailsByVehicleId = async (vehicleId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/booking/dates/${vehicleId}`
  );
};

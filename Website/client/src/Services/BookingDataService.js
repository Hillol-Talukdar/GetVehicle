import axios from 'axios';

export const getAllBookings = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/booking`, {
    headers: {
      authtoken,
    },
  });
};

export const getAllMyBookings = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/booking/my`, {
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

export const createBooking = async (bookingData, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/booking`,
    bookingData,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateABooking = async (id, bookingData, authtoken) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/booking/${id}`,
    bookingData,
    {
      headers: {
        authtoken,
      },
    }
  );
};

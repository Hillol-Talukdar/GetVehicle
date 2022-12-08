import axios from "axios";

export const getBookingDetailsByVehicleId = async (vehicleId) => {
    return await axios.get(
      `${process.env.REACT_APP_API}/booking/dates/${vehicleId}`
    );
};

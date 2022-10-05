import axios from 'axios';
import {
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from '../Constants/ReduxConstants';

export const getAllVehicleList = async () => {
  console.log(process.env.REACT_APP_API);

  return await axios.get(`${process.env.REACT_APP_API}/vehicle`);
};

export const getVehicleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLE_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/vehicle/${id}`
    );

    dispatch({
      type: VEHICLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

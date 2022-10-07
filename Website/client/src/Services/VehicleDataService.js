import axios from 'axios';
import {
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
  VEHICLE_CREATE_REQUEST,
  VEHICLE_CREATE_SUCCESS,
} from '../Constants/ReduxConstants';

export const getAllVehicleList = async () => {
  // console.log(process.env.REACT_APP_API);

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

export const createVehicle =
  (vehicleData, authtoken, email) => async (dispatch) => {
    try {
      dispatch({ type: VEHICLE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        token: authtoken,
        data: {
          email: email,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/vehicle`,
        vehicleData,
        config
      );

      dispatch({
        type: VEHICLE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: VEHICLE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

import axios from 'axios';
import {
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from '../Constants/ReduxConstants';

export const getAllVehicleList = async () => {
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

export const createVehicle = async (vehicleData, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/vehicle`, vehicleData, {
    headers: {
      authtoken,
    },
  });
};

export const uploadImagesOnCloudinary = (imageFiles, resolve, reject) => {

  let allSecureUrl = [];

  const uploaders = imageFiles.map(file => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "ynv8wlxz");

    return axios.post('https://api.cloudinary.com/v1_1/getvehicle/image/upload', formData).then((response)=>{
      allSecureUrl.push(response.data.secure_url);
    });
  });

  axios.all(uploaders).then((response) => {
    console.log(allSecureUrl);
    console.log("/////////////////////////////////////");
    console.log(response);
    resolve(allSecureUrl);
  });
  
};

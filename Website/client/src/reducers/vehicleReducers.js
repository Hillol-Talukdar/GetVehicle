import {
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from '../Constants/vehicleConstants';

export const vehicleDetailsReducer = (state = { vehicle: {} }, action) => {
  switch (action.type) {
    case VEHICLE_DETAILS_REQUEST:
      return { ...state, laoding: true };
    case VEHICLE_DETAILS_SUCCESS:
      return { loading: false, vehicle: action.payload };
    case VEHICLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import {
  VEHICLE_CREATE_REQUEST,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_CREATE_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from '../Constants/ReduxConstants';

export const vehicleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_CREATE_REQUEST:
      return { laoding: true };
    case VEHICLE_CREATE_SUCCESS:
      return { loading: false, suceess: true, vehicle: action.payload };
    case VEHICLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

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

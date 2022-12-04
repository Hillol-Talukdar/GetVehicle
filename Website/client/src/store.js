import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer } from './Reducers/UserReducers';
import {
  vehicleDetailsReducer
} from './Reducers/VehicleReducers';

const reducer = combineReducers({
  vehicleDetailsReducer: vehicleDetailsReducer,
  userReducer: userReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  vehicleDetailsReducer,
  vehicleCreateReducer,
} from './Reducers/VehicleReducers';
import { userReducer } from './Reducers/UserReducers';
import { categoryListReducer } from './Reducers/CategoryReducers';

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

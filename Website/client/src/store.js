import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  vehicleDetailsReducer,
  vehicleCreateReducer,
} from './Reducer/VehicleReducer';
import { userReducer } from './Reducer/UserReducers';
import { categoryListReducer } from './Reducer/CategoryReducers';

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

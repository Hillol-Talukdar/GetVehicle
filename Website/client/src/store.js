import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { vehicleDetailsReducer } from './reducers/vehicleReducers';

const reducer = combineReducers({
    vehicleDetailsReducer: vehicleDetailsReducer, 
})

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
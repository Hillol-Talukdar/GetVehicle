import { LOGGED_IN_USER, NO_LOGGED_IN_USER } from "../Constants/ReduxConstants";

export const userReducer = (state = null, action) => {
    switch (action.type) {
        case LOGGED_IN_USER:
            return action.payload;

        case NO_LOGGED_IN_USER:
            return null;

        default:
            return state;
    }
};
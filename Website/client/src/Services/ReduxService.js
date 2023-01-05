import { LOGGED_IN_USER, NO_LOGGED_IN_USER } from '../Constants/ReduxConstants';

export const createUserPayloadAndDispatch = function (dispatch, token, res) {
    dispatch({
        type: LOGGED_IN_USER,
        payload: {
            name: res.data.user.name,
            email: res.data.user.email,
            imageUrl: res.data.user.image,
            token: token,
            role: res.data.user.role,
            _id: res.data.user._id,
        },
    });
}

export const removeUserAndDispatch = function (dispatch) {
  dispatch({
    type: NO_LOGGED_IN_USER,
    payload: null,
  });
};

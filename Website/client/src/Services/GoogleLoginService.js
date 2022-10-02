import { toast } from "react-toastify";
import { auth, provider } from "../Authentication/FirebaseConfig";
import { userCreateOrUpdate } from "../Services/AuthService";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { LOGGED_IN_USER } from "../Constants/ReduxConstants";

const getUserData = function (user) {
    return {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL
    };
}

export const googleLogin = async (dispatch) => {

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const userData = getUserData(user);

            userCreateOrUpdate(token, userData)
                .then((res) => {
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
                })
                .catch();

            toast.success(
                `Hi ${user.displayName}, Welcome to GetVehicle again!`
            );

        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

};
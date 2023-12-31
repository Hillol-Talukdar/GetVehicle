import { toast } from "react-toastify";
import { auth, provider } from "../Authentication/FirebaseConfig";
import { userCreateOrUpdate } from "./AuthService";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createUserPayloadAndDispatch, removeUserAndDispatch } from "./ReduxService";

const getUserData = function (user) {
    return {
        email: user.email,
        // displayName: user.displayName,
        displayName: getUserName(user),
        photoUrl: getUserPicture(user)
    };
}

const getUserPicture = (user) => {
    return user.photoURL !=null ? user.photoURL : '/UserProfileIcon.png';
}


const getUserName = (user) => {
    return user.email.split("@")[0];
}

export const googleLogin = async (dispatch) => {

    signInWithPopup(auth, provider)
        .then(async (result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            const userData = getUserData(user);
            const idTokenResult = await user.getIdTokenResult();

            userCreateOrUpdate(idTokenResult.token, userData)
                .then((res) => {
                    createUserPayloadAndDispatch(dispatch, idTokenResult.token, res);

                    toast.success(
                        `Hi ${getUserName(user)}, Welcome to GetVehicle again!`
                    );
                })
                .catch(err => {
                    toast.error(err.response.data.message);
                });

            
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
            toast.error(error.response.data.message);
        });

};

export const googleLogout = async (dispatch, navigate) => {
    signOut(auth).then(() => {
        removeUserAndDispatch(dispatch);
        navigate("/login")
    }).catch((error) => {
        
    });
}
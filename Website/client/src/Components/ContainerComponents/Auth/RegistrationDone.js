import React, { useState, useEffect } from "react";
import { auth } from "../../../Authentication/FirebaseConfig";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userCreateOrUpdate } from "../../../Services/AuthService";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { createUserPayloadAndDispatch } from "../../../Services/ReduxService";

const RegistrationDone = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    let dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForSignIn"));
    }, [navigate]);

    const getUserData = function (user) {
        return {
            email: user.email,
            displayName: user.email.split("@")[0],
            photoUrl: user.photoURL
        };
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!password && !email) {
            toast.warning(
                "Please enter email and password to complete the registration"
            );
            return;
        }
        if (!email) {
            toast.warning("Please enter email to complete the registration");
            return;
        }
        if (!password) {
            toast.warning("Please enter password to complete the registration");
            return;
        }
        if (password.length < 6) {
            toast.warning("Password must be contain atleast 6 characters");
            return;
        }
        try {
            const status = await signInWithEmailLink(
                auth,
                email,
                window.location.href
            );
            if (status.user.emailVerified) {
                //getting current user and token
                let user = auth.currentUser;
                await updatePassword(user,password);
                //deleting email
                window.localStorage.removeItem("emailForSignIn");


                // const user = result.user;
                const userData = getUserData(user);
                const idTokenResult = await user.getIdTokenResult();
    
                userCreateOrUpdate(idTokenResult.token, userData)
                    .then((res) => {
                        console.log("res", res);
                        createUserPayloadAndDispatch(dispatch, idTokenResult.token, res);
    
                        toast.success(
                            `Hi ${user.email}, Your registration is done! Welcome to GetVehicle!`
                        );
                    })
                    .catch(err => {
                        toast.error(err.response.data.message);
                    });

                //redirecting to the expected page
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const registrationDoneForm = () => (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                class="form-control text-center"
                id="regEmail"
                name="email"
                value={email}
                disabled
            />
            <input
                type="password"
                class="form-control text-center mt-2"
                id="regPass"
                placeholder="Password"
                password={password}
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
            />
            <div class="d-grid gap-2 col-6 mx-auto mt-3">
                <button class="btn btn-outline-primary" type="submit">
                    Done
                </button>
            </div>
        </form>
    );

    return (
        <div className="d-flex p-5 justify-content-center">
            <div className="row align-items-center">
                <div className="d-flex justify-content-center">
                    <h1 className="text-primary">GetVehicle</h1>
                </div>
                <div className="mt-3">
                    <h4 className="d-flex justify-content-center">
                        Complete Your Registration
                    </h4>
                    {registrationDoneForm()}
                </div>
            </div>
        </div>
    );
};

export default RegistrationDone;

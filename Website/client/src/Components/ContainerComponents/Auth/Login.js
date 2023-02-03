import React, { useState, useEffect } from "react";
import { auth, provider } from "../../../Authentication/FirebaseConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userCreateOrUpdate } from "../../../Services/AuthService";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserPayloadAndDispatch } from "../../../Services/ReduxService";
import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "../../../Services/GoogleAuthService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        // let intent = navigate;

        // if (intent) {
            // return;
        // } else {
            if (user && user.token) {
                navigate("/");
            }
        // }
    }, [user, navigate]);



    const getUserData = function (user) {
        return {
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL
        };
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = result.user;
            const userData = getUserData(user);
            const idTokenResult = await user.getIdTokenResult();

            userCreateOrUpdate(idTokenResult.token, userData)
                .then((res) => {

                    createUserPayloadAndDispatch(dispatch, idTokenResult.token, res);

                    // console.log("create or up response", res) // for checking if data is coming from the backend or not
                    // dispatch({
                    //     type: "LOGGED_IN_USER",
                    //     payload: {
                    //         name: res.data.name,
                    //         email: res.data.email,
                    //         token: idTokenResult.token,
                    //         role: res.data.role,
                    //         _id: res.data._id,
                    //     },
                    // });

                    navigate("/")
                })
                .catch();

            // history.push("/");
            toast.success(
                `Hi ${user.email}, Welcome to getVehicle again!`
            );
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        googleLogin(dispatch);
    };

    const loginForm = () => (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                className="form-control text-center"
                id="loginEmail"
                placeholder="Email"
                value={email}
                name="loginEmail"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <input
                type="password"
                className="form-control text-center mt-3"
                id="loginPassword"
                placeholder="Password"
                name="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div
                className="d-grid gap-2 col-6 mx-auto mt-3"
                data-toggle="tooltip"
                data-placement="top"
                title="Email and Password which contains atleast 6 character will enable this button"
            >
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!email || password.length < 6}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-envelope-fill mb-1"
                        viewBox="0 0 16 16"
                    >
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                    </svg>
                    &nbsp;&nbsp;Continue with Email
                </button>
            </div>
        </form>
    );

    const googleLoginButton = () => (
        <div class="d-grid gap-2 col-6 mx-auto mt-3">
            <button className="content" onClick={handleGoogleLogin}>
                <div className="google-icon">
                    <FcGoogle />
                </div>
                <span className="google-button-text">Sign in with Google</span>
            </button>
        </div>
    );

    return (
        <div className="d-flex p-5 justify-content-center">
            <div className="row align-items-center">
                <div className="d-flex justify-content-center">
                    <h1 className="text-primary">GetVehicle</h1>
                </div>
                <div className="mt-3">
                    {loading ? (
                        <h4 className="d-flex justify-content-center text-primary">
                            Logging in...
                        </h4>
                    ) : (
                        <h4 className="d-flex justify-content-center">
                            Login With Your Account
                        </h4>
                    )}
                    {loginForm()}
                    {googleLoginButton()}
                </div>
            </div>
        </div>
    );
};

export default Login;

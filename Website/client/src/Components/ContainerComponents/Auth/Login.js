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

    const [count, setCount] = useState(2);

    useEffect(() => {
        if(user && user.token) {
            const interval = setInterval(() => {
                setCount((currentCount) => --currentCount);
            }, 1000);
            count === 0 && navigate(-1);
            return () => clearInterval(interval);
        }
    }, [count, navigate,user]);

    // useEffect(() => {
    //      if(user && user.token) {
    //         // navigate("/");
    //         navigate(-1);
    //     }
    // }, [user]);



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
                    // navigate(-1)
                })
                .catch();
                
                // navigate(-1)

            toast.success(
                `Hi ${getUserName(user)}, Welcome to getVehicle again!`
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
                className="d-grid gap-2 col-12 mx-auto mt-3"
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
                    &nbsp;&nbsp;Login with email and password
                </button>
            </div>
        </form>
    );

    const googleLoginButton = () => (
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
            <button class="btn btn-danger" type="submit" onClick={handleGoogleLogin}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-google mb-1"
                    viewBox="0 0 16 16"
                >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                &nbsp;&nbsp;Continue with Google
            </button>
        </div>


        // <div class="d-grid gap-2 col-6 mx-auto mt-3">
        //     <button className="content" onClick={handleGoogleLogin}>
        //         <div className="google-icon">
        //             <FcGoogle />
        //         </div>
        //         <span className="google-button-text">Sign in with Google</span>
        //     </button>
        // </div>
    );

    const resetPassword = () => (
        <div class="d-grid gap-2 col-12 mx-auto mt-3">
            <Link class="btn btn-dark" to="/reset/password">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-1"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-bootstrap-reboot"
                    viewBox="0 0 16 16"
                >
                    <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 0 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                    <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                </svg>
                &nbsp;&nbsp; Reset Password
            </Link>
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
                    {resetPassword()}
                </div>
            </div>
        </div>
    );
};

export default Login;

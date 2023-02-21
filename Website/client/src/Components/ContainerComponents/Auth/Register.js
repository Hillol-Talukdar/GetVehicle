import React, { useState, useEffect } from "react";
import { auth } from "../../../Authentication/FirebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { sendSignInLinkToEmail } from "firebase/auth";

const Register = () => {
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (user && user.token) {
            navigate('/');
        }
    }, [user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.warning("Please enter email to complete the registration");
            return;
        }
        const googleConfig = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            // This must be true.
            handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(auth, email, googleConfig);
        window.localStorage.setItem("emailForSignIn", email);
        toast.success(
            `An email has been sent to ${email}. Please check your inbox.`
        );
        setEmail("");
    };

    const registerForm = () => (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                className="form-control text-center"
                id="regEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <div class="d-grid gap-2 col-6 mx-auto mt-3">
                <button class="btn btn-outline-primary" type="submit">
                    Register
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
                        Get Started With Your Account
                    </h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/NavbarAndFooter/Footer";
import Header from "./Components/NavbarAndFooter/Header/Header";
import HomeContainer from "./Components/ContainerComponents/HomeContainer";
import ItemDetailsContainer from "./Components/ContainerComponents/ItemDetailsContainer";
import { useDispatch } from "react-redux";
import { currentUser } from "./Services/AuthService";
import { LOGGED_IN_USER } from "./Constants/ReduxConstants";
import { auth } from "./Authentication/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createUserPayloadAndDispatch } from "./Services/ReduxService";

const App = () => {

    const dispatch = useDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser(user.accessToken, user.email).then((res) => {
                createUserPayloadAndDispatch(dispatch, user.accessToken, res);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    });

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomeContainer />} />
                <Route path="/details/:id" element={<ItemDetailsContainer />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;

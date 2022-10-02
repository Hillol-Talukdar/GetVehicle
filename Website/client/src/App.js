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

const App = () => {
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

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeContainer from "./Components/ContainerComponents/HomeContainer";
import ItemDetailsContainer from "./Components/ContainerComponents/ItemDetailsContainer";

const App = () => {
    return (
        <>
            <Header />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <HomeContainer /> }/>
                    <Route path="/details/:id" element={ <ItemDetailsContainer /> }/>
                </Routes>
            </BrowserRouter>
               
            <Footer />
        </>
    );
};

export default App;

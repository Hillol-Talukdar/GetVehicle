import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import ItemDetails from "./Components/ItemDetails";

const App = () => {
    return (
        <>
            <Header />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <HomePage /> }/>
                    <Route path="/details/:id" element={ <ItemDetails /> }/>
                </Routes>
            </BrowserRouter>
               
            <Footer />
        </>
    );
};

export default App;

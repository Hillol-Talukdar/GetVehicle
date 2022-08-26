import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";

const App = () => {
    return (
        <Container fluid>

            <Header />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
               
            <Footer />

        </Container>
    );
};

export default App;

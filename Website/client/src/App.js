import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/NavbarAndFooter/Header/Header';
import HomeContainer from './Components/ContainerComponents/HomeContainer';
import ItemDetailsContainer from './Components/ContainerComponents/ItemDetailsContainer';
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentUser } from './Services/AuthService';
import { auth } from './Authentication/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserPayloadAndDispatch } from './Services/ReduxService';
import Footer from './Components/NavbarAndFooter/Footer/Footer';
import CreateItemContainer from './Components/ContainerComponents/Admin/Item/CreateItem/CreateItemContainer';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser(user.accessToken, user.email)
        .then((res) => {
          createUserPayloadAndDispatch(dispatch, user.accessToken, res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  });

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route exact path="/admin/create-item" element={<CreateItemContainer />} />
        <Route exact path="/details/:id" element={<ItemDetailsContainer />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

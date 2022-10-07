import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/NavbarAndFooter/Header/Header';
import HomeContainer from './Components/ContainerComponents/HomeContainer';
import ItemDetailsContainer from './Components/ContainerComponents/ItemDetailsContainer';
import { useDispatch } from 'react-redux';
import { currentUser } from './Services/AuthService';
import { auth } from './Authentication/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserPayloadAndDispatch } from './Services/ReduxService';
import Footer from './Components/NavbarAndFooter/Footer/Footer';
import CreateItem from './Components/ContainerComponents/Admin/Item/CreateItem/CreateItem';
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
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route exact path="/admin/create-item" element={<CreateItem />} />
        <Route exact path="/details/:id" element={<ItemDetailsContainer />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/NavbarAndFooter/Header/Header';
import HomeContainer from './Components/ContainerComponents/HomeContainer/HomeContainer';
import ItemDetailsContainer from './Components/ContainerComponents/ItemDetailsContainer';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from './Services/AuthService';
import { auth } from './Authentication/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserPayloadAndDispatch } from './Services/ReduxService';
import Footer from './Components/NavbarAndFooter/Footer/Footer';
import CreateOrUpdateItemContainer from './Components/ContainerComponents/Admin/Item/CreateOrUpdateItem/CreateOrUpdateItem';
import CreateOrUpdateCategoryContainer from './Components/ContainerComponents/Admin/Item/CreateOrUpdateCategoryContainer/CreateOrUpdateCategoryContainer';
import { CreateOrUpdateSubCategoryContainer } from './Components/ContainerComponents/Admin/Item/CreateOrUpdateSubCategoryContainer/CreateOrUpdateSubCategoryContainer';
import AdminPrivateRoute from './Components/Route/AdminPrivateRoute';
import Booking from './Components/ContainerComponents/Booking/Booking';
import BookingList from './Components/ContainerComponents/Admin/BookingListContainer/BookingList';
import CanceledBookingList from './Components/ContainerComponents/Admin/BookingListContainer/CanceledBookingList';
import SuccessfulBookingList from './Components/ContainerComponents/Admin/BookingListContainer/SuccessfulBookingList';
import UserPrivateRoute from './Components/Route/UserPrivateRoute';
import UserBookingList from './Components/ContainerComponents/Booking/UserBookingList';
import UserSuccessfulBookingList from './Components/ContainerComponents/Booking/UserSuccessfulBookingList';

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
        <Route exact path="/" element={<HomeContainer/>} />
        <Route exact path="/details/:id" element={<ItemDetailsContainer />} />
        <Route
          exact
          path="/admin/create-or-update-vehicle"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/create-or-update-vehicle" element={<CreateOrUpdateItemContainer/>}/>
        </Route>

        <Route
          exact
          path="/admin/create-or-update-category"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/create-or-update-category" element={<CreateOrUpdateCategoryContainer/>}/>
        </Route>
        <Route
          exact
          path="/admin/category/:categoryId/create-or-update-category"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/category/:categoryId/create-or-update-category" element={<CreateOrUpdateSubCategoryContainer/>}/>
        </Route>

        <Route
          exact
          path="/admin/booking-list"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/booking-list" element={<BookingList/>}/>
        </Route>
        <Route
          exact
          path="/admin/cancled-booking-list"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/cancled-booking-list" element={<CanceledBookingList/>}/>
        </Route>
        <Route
          exact
          path="/admin/successful-booking-list"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/successful-booking-list" element={<SuccessfulBookingList/>}/>
        </Route>
        <Route exact path="/booking/:id" element={<Booking/>} />

        <Route
          exact
          path="/booking-list"
          element={<UserPrivateRoute />}>
            <Route exact path="/booking-list" element={<UserBookingList/>}/>
        </Route>
        <Route
          exact
          path="/cancled-booking-list"
          element={<UserPrivateRoute />}>
            <Route exact path="/cancled-booking-list" element={<CanceledBookingList/>}/>
        </Route>
        <Route
          exact
          path="/successful-booking-list"
          element={<UserPrivateRoute />}>
            <Route exact path="/successful-booking-list" element={<UserSuccessfulBookingList/>}/>
        </Route>

      </Routes>
      <Footer />
    </>
  );
};

export default App;

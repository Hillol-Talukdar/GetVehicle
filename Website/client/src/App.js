import React, { useEffect } from 'react';
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
import UserCanceledBookingList from './Components/ContainerComponents/Booking/UserCanceledBookingList';
import UserListContainer from './Components/ContainerComponents/Admin/User/UserListContainer';
import AdminPanel from './Components/ContainerComponents/Admin/AdminPanel/AdminPanel';
import Register from './Components/ContainerComponents/Auth/Register';
import RegistrationDone from './Components/ContainerComponents/Auth/RegistrationDone';
import Login from './Components/ContainerComponents/Auth/Login';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token, user.email)
          .then((res) => {
            createUserPayloadAndDispatch(dispatch, idTokenResult.token, res);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/done" element={<RegistrationDone />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/details/:id" element={<ItemDetailsContainer />} />

        <Route
          exact
          path="/admin/create-or-update-vehicle"
          element={<AdminPrivateRoute />}
        >
          <Route
            exact
            path="/admin/create-or-update-vehicle"
            element={<CreateOrUpdateItemContainer />}
          />
        </Route>

        <Route
          exact
          path="/admin/create-or-update-category"
          element={<AdminPrivateRoute />}
        >
          <Route
            exact
            path="/admin/create-or-update-category"
            element={<CreateOrUpdateCategoryContainer />}
          />
        </Route>

        <Route
          exact
          path="/admin/category/:categoryId/create-or-update-category"
          element={<AdminPrivateRoute />}
        >
          <Route
            exact
            path="/admin/category/:categoryId/create-or-update-category"
            element={<CreateOrUpdateSubCategoryContainer />}
          />
        </Route>

        <Route exact path="/admin/booking-list" element={<AdminPrivateRoute />}>
          <Route exact path="/admin/booking-list" element={<BookingList />} />
        </Route>

        <Route
          exact
          path="/admin/cancled-booking-list"
          element={<AdminPrivateRoute />}
        >
          <Route
            exact
            path="/admin/cancled-booking-list"
            element={<CanceledBookingList />}
          />
        </Route>

        <Route
          exact
          path="/admin/successful-booking-list"
          element={<AdminPrivateRoute />}
        >
          <Route
            exact
            path="/admin/successful-booking-list"
            element={<SuccessfulBookingList />}
          />
        </Route>

        <Route exact path="/booking/:id" element={<UserPrivateRoute />}>
          <Route exact path="/booking/:id" element={<Booking />} />
        </Route>

        <Route exact path="/booking-list" element={<UserPrivateRoute />}>
          <Route exact path="/booking-list" element={<UserBookingList />} />
        </Route>

        <Route
          exact
          path="/cancled-booking-list"
          element={<UserPrivateRoute />}
        >
          <Route
            exact
            path="/cancled-booking-list"
            element={<UserCanceledBookingList />}
          />
        </Route>

        <Route
          exact
          path="/successful-booking-list"
          element={<UserPrivateRoute />}
        >
          <Route
            exact
            path="/successful-booking-list"
            element={<UserSuccessfulBookingList />}
          />
        </Route>

        <Route
          exact
          path="/admin/user-list"
          element={<AdminPrivateRoute />}>
            <Route exact path="/admin/user-list" element={<UserListContainer/>}/>
        </Route>

        <Route exact path="/admin/admin-panel" element={<AdminPrivateRoute />}>
          <Route exact path="/admin/admin-panel" element={<AdminPanel />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;

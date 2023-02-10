import React, { useEffect } from 'react';
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  AppConstants,
  NavbarConstants,
  URL,
  UserRole,
} from '../../../Constants/CommonConstants';
import { googleLogin } from '../../../Services/GoogleAuthService';
import LoggedInUserInfoContainer from '../../ContainerComponents/LoggedInUserInfoContainer/LoggedInUserInfoContainer';
import './Header.css';
import { FcGoogle } from 'react-icons/fc';
import { BiLogIn } from 'react-icons/bi';
import { HiOutlineUserAdd } from 'react-icons/hi';

const Header = () => {
  const dispatch = useDispatch();

  const loggedInUserDetails = useSelector((state) => state.userReducer);

  const handleGoogleLogin = () => {
    googleLogin(dispatch);
  };

  return (
    <Container fluid id="navbarTop">
      <Navbar className='nav-bar-div' style={{padding: '2px'}}>
        <Navbar.Brand>
          <Link to="/" className="app-name-text-color-and-decoration">
            {AppConstants.APP_NAME}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 nav-element-container"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Navbar.Text style={{ marginRight: '25px', marginLeft: '10px' }}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'active-text-color-and-decoration'
                    : 'text-color-and-decoration'
                }
              >
                {NavbarConstants.HOME}
              </NavLink>
            </Navbar.Text>

            {loggedInUserDetails &&
              loggedInUserDetails.role === UserRole.ADMIN && (
                <Navbar.Text style={{ marginRight: '23px' }}>
                  <NavLink
                    to="/admin/admin-panel"
                    className={({ isActive }) =>
                      isActive
                        ? 'active-text-color-and-decoration'
                        : 'text-color-and-decoration'
                    }
                  >
                    {NavbarConstants.ADMIN_PANEL}
                  </NavLink>
                </Navbar.Text>
              )}

            {loggedInUserDetails &&
              loggedInUserDetails.role === UserRole.ADMIN && (
                <Navbar.Text style={{ marginRight: '20px' }}>
                  <NavLink
                    to="/admin/booking-list"
                    className={({ isActive }) =>
                      isActive
                        ? 'active-text-color-and-decoration'
                        : 'text-color-and-decoration'
                    }
                  >
                    {NavbarConstants.BOOKING_LIST}
                  </NavLink>
                </Navbar.Text>
              )}

            {loggedInUserDetails && loggedInUserDetails.role === UserRole.USER && (
              <Navbar.Text style={{ marginRight: '20px' }}>
                <NavLink
                  to="/booking-list"
                  className={({ isActive }) =>
                    isActive
                      ? 'active-text-color-and-decoration'
                      : 'text-color-and-decoration'
                  }
                >
                  {NavbarConstants.MY_BOOKINGS}
                </NavLink>
              </Navbar.Text>
            )}

            {loggedInUserDetails && loggedInUserDetails.role === UserRole.USER && (
              <Navbar.Text style={{ marginRight: '15px' }}>
                <NavLink
                  to="/successful-booking-list"
                  className={({ isActive }) =>
                    isActive
                      ? 'active-text-color-and-decoration'
                      : 'text-color-and-decoration'
                  }
                >
                  Completed Rides
                </NavLink>
              </Navbar.Text>
            )}

            {loggedInUserDetails && loggedInUserDetails.role === UserRole.USER && (
              <NavDropdown
                title={NavbarConstants.OTHERS}
                id="nav-dropdown"
                style={{ marginRight: '10px' }}
              >
                <NavDropdown.Item className="p-2" to="/cancled-booking-list">
                  <NavLink
                    to="/cancled-booking-list"
                    className={({ isActive }) =>
                      isActive
                        ? 'active-text-color-and-decoration'
                        : 'text-color-and-decoration'
                    }
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  >
                    Canceled Booking List
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {loggedInUserDetails && (
            <LoggedInUserInfoContainer
              userInfo={loggedInUserDetails}
            ></LoggedInUserInfoContainer>
          )}

          {/* {!loggedInUserDetails && (
            <button className="content" onClick={handleGoogleLogin}>
              <div className="google-icon">
                <FcGoogle />
              </div>
              <span className="google-button-text">Sign in with Google</span>
            </button>
          )} */}

          {!loggedInUserDetails && (
            <NavLink to="/register" style={{ color: "white", float: "right"  }}>
              <Button className="btn-info btn-sm px-3">
                <HiOutlineUserAdd/> &nbsp;Sign Up
              </Button>
            </NavLink>
          )}

          {!loggedInUserDetails && ( 
            <NavLink to="/login" className="mx-2" style={{ color: "white", float: "right"  }}>
              <Button className="btn-success btn-sm px-3 sign-in-button">
                <BiLogIn/> &nbsp;Sign In
              </Button>
            </NavLink>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;

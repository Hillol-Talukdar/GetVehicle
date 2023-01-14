import React from 'react';
import {
  Button,
  Container, Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  AppConstants,
  NavbarConstants,
  UserRole
} from '../../../Constants/CommonConstants';
import { googleLogin } from '../../../Services/GoogleAuthService';
import LoggedInUserInfoContainer from '../../ContainerComponents/LoggedInUserInfoContainer/LoggedInUserInfoContainer';
import './Header.css';
import { FcGoogle } from 'react-icons/fc';

const Header = () => {
  const dispatch = useDispatch();

  const loggedInUserDetails = useSelector((state) => state.userReducer);

  const handleGoogleLogin = () => {
    googleLogin(dispatch);
  };

  return (
    <Container fluid id="navbarTop">
      <Navbar>
        <Navbar.Brand>
          <Link to="/" className="text-color-and-decoration">
            {AppConstants.APP_NAME}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Navbar.Text>
              <NavLink to="/" className="text-color-and-decoration">
                {NavbarConstants.HOME}
              </NavLink>
            </Navbar.Text>

          {loggedInUserDetails && loggedInUserDetails.role === UserRole.ADMIN && 
            (<Navbar.Text>
              <NavLink to="/admin/admin-panel" className="text-color-and-decoration" style={{marginRight: '10px', marginLeft: '15px'}}>
                {NavbarConstants.ADMIN_PANEL}
              </NavLink>
            </Navbar.Text>)
          }

          {loggedInUserDetails && 
            (<NavDropdown title="User" id="basic-nav-dropdown">

              <NavDropdown.Item
                className="p-2"
                to="/booking-list"
              >
                <NavLink
                  to="/booking-list"
                  className="text-color-and-decoration"
                >
                  {NavbarConstants.BOOKING_LIST}
                </NavLink>
              </NavDropdown.Item>

              <NavDropdown.Item
                className="p-2"
                to="/successful-booking-list"
              >
                <NavLink
                  to="/successful-booking-list"
                  className="text-color-and-decoration"
                >
                  SuccessFul Booking List
                </NavLink>
              </NavDropdown.Item>
              
              <NavDropdown.Item
                className="p-2"
                to="/cancled-booking-list"
              >
                <NavLink
                  to="/cancled-booking-list"
                  className="text-color-and-decoration"
                >
                  Canceled Booking List
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>)
          }
          </Nav>

          {loggedInUserDetails && (
            <LoggedInUserInfoContainer
              userInfo={loggedInUserDetails}
            ></LoggedInUserInfoContainer>
          )}
          {!loggedInUserDetails && (
            <button class="content" onClick={handleGoogleLogin}> 
              <div className='google-icon'><FcGoogle/></div>
              <span className="google-button-text">Sign in with Google</span>
            </button>   
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;

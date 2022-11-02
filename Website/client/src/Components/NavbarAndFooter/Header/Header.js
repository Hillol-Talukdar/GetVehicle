import React from 'react';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  AppConstants,
  NavbarConstants,
} from '../../../Constants/CommonConstants';
import { googleLogin } from '../../../Services/GoogleAuthService';
import LoggedInUserInfoContainer from '../../ContainerComponents/LoggedInUserInfoContainer/LoggedInUserInfoContainer';
import './Header.css';

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
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Navbar.Text>
              <NavLink to="/" className="text-color-and-decoration">
                {NavbarConstants.HOME}
              </NavLink>
            </Navbar.Text>

            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item
                className="p-2"
                to="/admin/create-or-update-vehicle"
              >
                <NavLink
                  to="/admin/create-or-update-vehicle"
                  className="text-color-and-decoration"
                >
                  {NavbarConstants.CREATE_VEHICLE}
                </NavLink>
              </NavDropdown.Item>

              <NavDropdown.Item
                className="p-2"
                to="/admin/create-or-update-category"
              >
                <NavLink
                  to="/admin/create-or-update-category"
                  className="text-color-and-decoration"
                >
                  {NavbarConstants.CREATE_CATEGORY}
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={NavbarConstants.SEARCH}
              aria-label="Search"
          />
          </Form>
          {loggedInUserDetails && (
            <LoggedInUserInfoContainer
              userInfo={loggedInUserDetails}
            ></LoggedInUserInfoContainer>
          )}
          {!loggedInUserDetails && (
            <Button
              className="ms-auto"
              variant="outline-primary"
              onClick={handleGoogleLogin}
            >
              {NavbarConstants.LOGIN}
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;

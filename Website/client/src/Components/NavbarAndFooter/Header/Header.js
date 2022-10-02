import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppConstants, NavbarConstants } from "../../../Constants/CommonConstants";
import { googleLogin } from "../../../Services/GoogleLoginService"
import LoggedInUserInfoContainer from "../../ContainerComponents/LoggedInUserInfoContainer/LoggedInUserInfoContainer";
import "./Header.css"

const Header = () => {

    const loggedInUserDetails = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    const handleGoogleLogin = () => {
        googleLogin(dispatch);
    }
    return (
        <Container fluid id="navbarTop">
            <Navbar>
                <Navbar.Brand href="/">{AppConstants.APP_NAME}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link href="#">{NavbarConstants.HOME}</Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder={NavbarConstants.SEARCH}
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-secondary">{NavbarConstants.SEARCH}</Button>
                    </Form>
                    {!loggedInUserDetails && (
                            <Button className="ms-auto" variant="outline-primary"
                                onClick={handleGoogleLogin}>{NavbarConstants.LOGIN}
                            </Button>
                        )
                    }
                    {loggedInUserDetails && (
                            <LoggedInUserInfoContainer userInfo={loggedInUserDetails}></LoggedInUserInfoContainer>
                        )
                    }
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;

import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { AppConstants, NavbarConstants } from "../Constants/CommonConstants";

const Header = () => {
    return (
        <Navbar>
            <Navbar.Brand href="#">{AppConstants.APP_NAME}</Navbar.Brand>
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
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;

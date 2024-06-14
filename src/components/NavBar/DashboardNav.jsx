import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For routing (optional)

function DashboardNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Your Dashboard Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="#">Home</Nav.Link>
                        <Nav.Link as={Link} to="#">Data</Nav.Link>
                        <NavDropdown title="Settings" id="settings-dropdown">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Preferences</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default DashboardNavbar;

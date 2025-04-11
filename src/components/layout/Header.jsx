import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar expand="md" className="bg-dark fw-bold" variant="dark">
      <Container>
        <Navbar.Brand href="#home">LMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="#home">
              Home
            </Link>
            <Link className="nav-link" to="#link">
              SignUP
            </Link>
            <Link className="nav-link" to="#link">
              LogIN
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

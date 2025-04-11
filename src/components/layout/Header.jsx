import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { BiLogIn } from "react-icons/bi";
import logo from "../../assets/library.png";

export const Header = () => {
  return (
    <Navbar expand="md" className="bg-dark fw-bold" variant="dark">
      <Container>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">
              <IoHome /> Home
            </Link>
            <Link className="nav-link" to="/signup">
              <SiGnuprivacyguard />
              SignUP
            </Link>
            <Link className="nav-link" to="/login">
              <BiLogIn />
              LogIN
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

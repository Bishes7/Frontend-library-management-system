import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { BiLogIn } from "react-icons/bi";
import logo from "../../assets/library.png";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { logOutAPI } from "../../services/authApiConnector";
import { setUser } from "../../features/user/userSLice";

export const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const handleOnLogOut = () => {
    logOutAPI();
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");

    dispatch(setUser({}));
  };

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

            {user?._id ? (
              <>
                {" "}
                <Link className="nav-link" to="/user">
                  <MdDashboard /> Dashboard
                </Link>
                <Link className="nav-link" onClick={handleOnLogOut}>
                  <IoLogOut />
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/signup">
                  <SiGnuprivacyguard />
                  SignUP
                </Link>
                <Link className="nav-link" to="/login">
                  <BiLogIn />
                  LogIN
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

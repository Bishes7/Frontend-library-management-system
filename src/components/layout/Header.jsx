import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { BiLogIn } from "react-icons/bi";
import logo from "../../assets/library.png";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { logOutAPI } from "../../services/authApiConnector";
import { setUser } from "../../features/user/userSLice";
import { toast } from "react-toastify";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { useRef } from "react";

export const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const bookSearchRef = useRef("");

  const handleOnLogOut = async () => {
    const pending = new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second wait
    toast.promise(pending, {
      pending: "Logging out...",
      success: "Logged out successfully!",
      error: "Logout failed",
    });

    await pending;

    logOutAPI();
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setUser({}));
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    const str = bookSearchRef.current.value;
    str && navigate("/search?query=" + str);
  };

  return (
    <Navbar expand="md" className="bg-dark fw-bold" variant="dark">
      <Container>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="w-100 d-flex justify-content-between flex-column flex-md-row m-1">
            <div></div>
            <Form style={{ width: "40%" }} onSubmit={handleOnSearch}>
              <InputGroup className="mt-1">
                <Form.Control
                  placeholder="Search Books"
                  aria-label="Search Books"
                  aria-describedby="basic-addon2"
                  name="s"
                  ref={bookSearchRef}
                />
                <InputGroup.Text id="basic-addon2" as="button">
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </Form>

            <Nav className="">
              <Link className="nav-link" to="/">
                <IoHome /> Home
              </Link>

              <Link className="nav-link" to="/all-books">
                <IoBookSharp /> Books
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

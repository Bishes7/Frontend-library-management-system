import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { logInUser } from "../../services/authApiConnector";
import { toast } from "react-toastify";
import { autoLogin, fetchUserAction } from "../../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const LogInPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const location = useLocation();
  const path = location?.state?.from ?? "/user";

  useEffect(() => {
    user?._id ? navigate(path) : dispatch(autoLogin());

    if (
      sessionStorage.getItem("accessJWT") ||
      localStorage.getItem("refreshJWT")
    ) {
      setTimeout(() => setLoader(false), 2000);
    } else {
      setLoader(false);
    }
  }, [user?._id, navigate, dispatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      setIsLoading(true);
      const { payload } = await logInUser({ email, password });

      if (payload?.accessJWT) {
        localStorage.setItem("refreshJWT", payload.refreshJWT);
        sessionStorage.setItem("accessJWT", payload.accessJWT);
        dispatch(fetchUserAction());
      }

      setIsLoading(false);
    } else {
      toast("Both inputs are required");
    }
  };

  if (loader) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <div className="login-wrapper position-relative vh-100">
      <div className="bg-blur"></div> {/*  Blur layer for background only */}
      <div className="login-content d-flex justify-content-center align-items-center vh-100 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={4}>
              <Card className="card animate-login">
                <Card.Body>
                  <Card.Title className="text-center mb-3">
                    <b>Welcome Back!</b>
                  </Card.Title>
                  <hr />
                  <Form onSubmit={handleOnSubmit} className="form">
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="input-icon">
                        <i className="fas fa-envelope icon"></i>
                        <Form.Control
                          type="email"
                          placeholder="example@email.com"
                          ref={emailRef}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <div className="input-icon">
                        <i className="fas fa-lock icon"></i>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          ref={passwordRef}
                          required
                        />
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          } eye-toggle`}
                          onClick={() => setShowPassword(!showPassword)}
                          title={
                            showPassword ? "Hide password" : "Show password"
                          }
                        ></i>
                      </div>
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="submit" variant="dark" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Loading...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center pt-3 fw-bold">
                    <Button
                      variant="link"
                      href="/forgot-password"
                      className="text-danger"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LogInPage;

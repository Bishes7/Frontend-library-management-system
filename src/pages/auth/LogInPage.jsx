import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import { logInUser } from "../../services/authApiConnector";
import { toast } from "react-toastify";
import { autoLogin, fetchUserAction } from "../../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true); // for page loading
  const [isLoading, setIsLoading] = useState(false); // for button loading

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    user?._id ? navigate("/user") : dispatch(autoLogin());

    if (
      sessionStorage.getItem("accessJWT") ||
      localStorage.getItem("refreshJWT")
    ) {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    } else {
      setLoader(false);
    }
  }, [user?._id, navigate, dispatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      setIsLoading(true); // Start button spinner

      const { payload } = await logInUser({ email, password });

      if (payload?.accessJWT) {
        localStorage.setItem("refreshJWT", payload.refreshJWT);
        sessionStorage.setItem("accessJWT", payload.accessJWT);

        dispatch(fetchUserAction());
      }

      setIsLoading(false); // Stop button spinner
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
    <div className="login d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-center">
            <b>Welcome Back!</b>
          </Card.Title>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              placeholder="something@gmail.com"
              required
              forwardref={emailRef}
            />
            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="*******"
              required
              forwardref={passwordRef}
            />

            <div className="d-grid">
              <Button type="submit" variant="info" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      style={{ fontWeight: "bold" }}
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

          <div className="text-center py-3 fw-bold">
            <a href="/forgot-password" className="text-danger">
              Forgot password?
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogInPage;

import React, { useEffect, useRef } from "react";

import { Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import { logInUser } from "../../services/authApiConnector";
import { toast } from "react-toastify";

import { autoLogin, fetchUserAction } from "../../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  // Using  dispatch to update the state
  const dispatch = useDispatch();

  // using useSelector to read the data from the state
  const { user } = useSelector((state) => state.userInfo);

  const navigate = useNavigate();

  // check if the user have id
  useEffect(() => {
    user?._id ? navigate("/user") : dispatch(autoLogin());
  }, [user?._id, navigate, dispatch]);

  // Using useRef to grab the input value
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      const { payload } = await logInUser({ email, password });

      if (payload?.accessJWT) {
        // Storing tokens in the browser storage
        localStorage.setItem("refreshJWT", payload.refreshJWT);
        sessionStorage.setItem("accessJWT", payload.accessJWT);
      }

      // call api to fetch user data
      dispatch(fetchUserAction());

      // Redirect users to the dashboard
    } else {
      toast("Both inputs are required");
    }

    console.log({ email, password });
  };
  return (
    <div className="login d-flex justify-content-center align-items-center">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <b>Welcome Back !</b>{" "}
          </Card.Title>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              placeholder="something@gmail.com"
              required
              ref={emailRef}
            />
            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="*******"
              required
              ref={passwordRef}
            />
            <div className="d-grid">
              <Button type="submit" variant="info">
                Login
              </Button>
            </div>
          </Form>
          <div className="text-center py-3 fw-bold  ">
            <a href="/forgot-password" className="text-danger">
              Forgot password ?
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogInPage;

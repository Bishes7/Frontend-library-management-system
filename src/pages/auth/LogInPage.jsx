import React, { useRef } from "react";

import { Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";

const LogInPage = () => {
  // Using useRef to grab the input value
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOnSubmit = (e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
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

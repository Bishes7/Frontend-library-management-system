import React, { useRef } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import useForm from "../../hooks/useForm";

const ForgotPasswordPage = () => {
  const initialState = {};

  const { form, setForm, passwordErrors, handleOnChange } =
    useForm(initialState);
  const emailRef = useRef();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
  };
  return (
    <div className="login d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "21rem" }}>
        <Card.Body>
          <Card.Title className="text-center">
            <b>Forgot Password !</b>
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

            <div className="d-grid">
              <Button type="submit" variant="success">
                Request OTP
              </Button>
            </div>
          </Form>
          <hr />

          <div className="text-center py-3  text-danger fw-bold">
            Reset your password now !!
          </div>

          <div>
            <Alert>Please check your email for OTP</Alert>
            <Form onSubmit={handleOnSubmit}>
              <CustomInput
                label="OTP"
                name="otp"
                type="number"
                placeholder="3455"
                required
                ref={emailRef}
                onChage={handleOnChange}
              />

              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="******"
                onChage={handleOnChange}
              />
              <CustomInput
                label="Confirm Password"
                name="confirmpassword"
                type="password"
                placeholder="******"
                onChage={handleOnChange}
              />

              <div className="d-grid">
                <Button type="submit" variant="success">
                  Request OTP
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;

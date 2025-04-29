import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import useForm from "../../hooks/useForm";

const ForgotPasswordPage = () => {
  const initialState = {};

  const { form, passwordErrors, handleOnChange } = useForm(initialState);

  // make state to show or hide the form
  const [showPswResetForm, setShowPswResetForm] = useState(false);

  const emailRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
  };

  const handleOnPswReset = (e) => {
    e.preventDefault();
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

          {showPswResetForm && (
            <>
              <div>
                <Alert>Please check your email for OTP</Alert>
                <Form onSubmit={handleOnPswReset}>
                  <CustomInput
                    label="OTP"
                    name="otp"
                    type="number"
                    placeholder="3455"
                    required
                    onChange={handleOnChange}
                  />

                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="******"
                    onChange={handleOnChange}
                  />
                  <CustomInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="******"
                    onChange={handleOnChange}
                  />
                  <div className="py-3">
                    <ul className="text-danger">
                      {passwordErrors.length > 0 &&
                        passwordErrors.map((message) => (
                          <li key={message}>{message}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="success"
                      disabled={passwordErrors.length}
                    >
                      Reset Password !
                    </Button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;

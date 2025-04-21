import React from "react";

import { Button, Card, Form } from "react-bootstrap";
import CustomInput from "../../components/custominput/CustomInput";
import useForm from "../../hooks/useForm";

const LogInPage = () => {
  const initialState = {};
  const { form, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
              onChange={handleOnChange}
            />
            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="*******"
              required
              onChange={handleOnChange}
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

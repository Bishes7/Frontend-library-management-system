import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/custominput/CustomInput";
import { inputTemplate } from "../../assets/custominputs/inputTemplate";
const SignUpPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <Form
        style={{ width: "450px" }}
        className="card p-4 mt-4 shadow-lg rounded-4 mb-5"
      >
        <h1>Explore our Library!</h1>
        <hr />

        {inputTemplate.map((input) => (
          <CustomInput key={input.name} {...input} />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUpPage;

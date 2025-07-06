import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/custominput/CustomInput";
import { inputTemplate } from "../../assets/custominputs/inputTemplate";
import useForm from "../../hooks/useForm";
import { signUpApi } from "../../services/authApiConnector";
import { Spinner } from "react-bootstrap";

const SignUpPage = () => {
  const initialState = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const { form, setForm, handleOnChange, passwordErrors } =
    useForm(initialState); // destrucutured useFOrm hook

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      // destructure names from form
      const { confirmPassword, ...rest } = form;
      if (confirmPassword !== rest.password)
        return alert("Password dont match");
      setIsLoading(true);
      const result = await signUpApi(rest);

      result.status === "success" && setForm(initialState);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center signup-wrapper">
      <div className="bg-blur"></div>
      <div className="blur-area position-relative">
        <Form
          className="glass-card p-4 mt-2 shadow-lg rounded-4 mb-4 "
          onSubmit={handleOnSubmit}
        >
          <h3 className="text-center mb-1 text-light">Explore our Library!</h3>

          <hr />

          {inputTemplate.map((input) => (
            <CustomInput
              key={input.name}
              {...input}
              value={form[input.name]}
              onChange={handleOnChange}
            />
          ))}

          <div className="py-3">
            <ul className="text-white small">
              {passwordErrors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>

          <Button
            type="submit"
            variant="dark"
            disabled={isLoading}
            className="w-100"
          >
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
              "Create New Account"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;

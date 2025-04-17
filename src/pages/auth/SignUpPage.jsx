import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/custominput/CustomInput";
import { inputTemplate } from "../../assets/custominputs/inputTemplate";
import useForm from "../../hooks/useForm";
import { signUpApi } from "../../services/authApiConnector";

const SignUpPage = () => {
  const initialState = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { form, setForm, handleOnChange, passwordErrors } =
    useForm(initialState); // destrucutured useFOrm hook

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // destructure names from form
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) return alert("Password dont match");

    const result = await signUpApi(rest);
    console.log(result);

    result.status === "success" && setForm(initialState);
  };
  return (
    <div className="d-flex justify-content-center">
      <Form
        style={{ width: "450px" }}
        className="card p-4 mt-4 shadow-lg rounded-4 mb-5"
        onSubmit={handleOnSubmit}
      >
        <h1>Explore our Library!</h1>
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
          <ul className="text-danger">
            {passwordErrors.length > 0 &&
              passwordErrors.map((message) => <li key={message}>{message}</li>)}
          </ul>
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={passwordErrors.length}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUpPage;

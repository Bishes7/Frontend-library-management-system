import { useEffect, useState } from "react";
import { validator } from "../utils/validatePassword";

const handleOnChange = ({ e, form, setForm }) => {
  let { name, value, checked } = e.target;

  // for the switch
  if (name === "status") {
    value = checked ? "active" : "inactive";
  }

  setForm({
    ...form,
    [name]: value,
  });
};

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [passwordErrors, setPasswordErrors] = useState([]); // state to store the errors

  //only when password and confirm password changes
  useEffect(() => {
    const errorList = validator(form.password, form.confirmPassword);
    setPasswordErrors(errorList);
  }, [form.password, form.confirmPassword]);

  return {
    form,
    setForm,
    passwordErrors,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
  };
};

export default useForm;

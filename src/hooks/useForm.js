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

const useForm = (initialState, type = "default") => {
  const [form, setForm] = useState(initialState);
  const [passwordErrors, setPasswordErrors] = useState([]); // state to store the errors

  //only when password and confirm password changes
  useEffect(() => {
    if (type === "changePassword") {
      const errorList = validator(form.newPassword, form.confirmPassword);
      setPasswordErrors(errorList);
    } else {
      const errorList = validator(form.password, form.confirmPassword);
      setPasswordErrors(errorList);
    }
  }, [form.password, form.confirmPassword, form.newPassword]);

  return {
    form,
    setForm,
    passwordErrors,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
  };
};

export default useForm;

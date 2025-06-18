import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({
  label,
  forwardref,
  value,
  icon,
  isPassword,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  let valueData = value;
  if (rest.type === "date") {
    valueData = value ? value.slice(0, 10) : null;
  }

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : rest.type;

  return (
    <Form.Group className="mb-3 position-relative">
      <Form.Label>{label}</Form.Label>
      <div className="input-icon position-relative">
        {icon && <i className={`${icon} icon`}></i>}

        <Form.Control
          {...rest}
          ref={forwardref}
          type={inputType}
          value={valueData}
          className="pl-5"
        />

        {isPassword && (
          <i
            className={`fas ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } eye-toggle`}
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
          ></i>
        )}
      </div>
    </Form.Group>
  );
};

export default CustomInput;

import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({ label, forwardref, value, ...rest }) => {
  let valueData = value;
  if (rest.type === "date") {
    valueData = value ? value.slice(0, 10) : null;
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} ref={forwardref} value={valueData} />
    </Form.Group>
  );
};

export default CustomInput;

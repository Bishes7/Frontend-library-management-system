import React from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ThankyouPage = () => {
  return (
    <div className="text-center">
      <Alert variant="success">Thank you for exploring our services</Alert>
      <Link to="/user/borrow">view your borrowed book</Link>
    </div>
  );
};

export default ThankyouPage;

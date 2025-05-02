import React from "react";
import { NewBookForm } from "../../components/forms";

const NewBookPage = () => {
  return (
    <div>
      <div className="p-3 fw-bold bg">New Book Page</div>
      <hr className="hr-book" />
      <NewBookForm />
    </div>
  );
};

export default NewBookPage;

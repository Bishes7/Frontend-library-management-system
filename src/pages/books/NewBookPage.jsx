import React from "react";
import { NewBookForm } from "../../components/forms";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";

const NewBookPage = () => {
  return (
    <div className="p-3">
      <div className="p-3 fw-bold bg">New Book Page</div>
      <hr className="hr-book" />

      <Link to="/user/books">
        <Button>
          <IoMdArrowRoundBack /> Back
        </Button>
      </Link>
      <NewBookForm />
    </div>
  );
};

export default NewBookPage;

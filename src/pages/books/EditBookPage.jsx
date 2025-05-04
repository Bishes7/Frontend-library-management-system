import React from "react";
import { EditBookForm } from "../../components/forms";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const EditBookPage = () => {
  // getting id using usePararms
  const { _id } = useParams();
  return (
    <div className="p-3">
      <div className="p-3 fw-bold bg">Edit Book Page</div>
      <hr className="hr-book" />
      <Link to="/user/books">
        <Button>
          <IoMdArrowRoundBack /> Back
        </Button>
      </Link>
      <div>
        <EditBookForm />
      </div>
    </div>
  );
};

export default EditBookPage;

import React from "react";
import { EditBookForm } from "../../components/forms";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBookAPi } from "../../features/books/bookApi";

const EditBookPage = () => {
  const navigate = useNavigate();
  // getting id using usePararms
  const { _id } = useParams();

  // function do delete the book
  const handleOnDelete = async () => {
    if (confirm("Are you sure you want to delete the book ? ")) {
      const { status } = await deleteBookAPi(_id);
      status === "success" && navigate("/user/books");
    }
  };

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
      <div className="d-grid p-5">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EditBookPage;

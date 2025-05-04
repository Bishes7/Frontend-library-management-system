import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import BookTable from "../../components/table/BookTable";
import { getAllAdminBooks } from "../../features/books/bookAction";
import { useDispatch } from "react-redux";
import { MdAssignmentAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const Books = () => {
  const dispatch = useDispatch();

  // useEffect to fetch the books in page render
  useEffect(() => {
    dispatch(getAllAdminBooks());
  }, [dispatch]);
  return (
    <div>
      <div className="p-4 fw-bold bg">
        Books
        <hr className="hr-book" />
        <div className="text-end p-4">
          <Link to="/user/new-book">
            <Button>
              <MdAssignmentAdd /> Add New Book
            </Button>
          </Link>
        </div>
        <BookTable />
      </div>
    </div>
  );
};

export default Books;

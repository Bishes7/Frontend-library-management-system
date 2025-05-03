import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import BookTable from "../../components/table/BookTable";
import { getAllAdminBooks } from "../../features/books/bookAction";

const Books = () => {
  // useEffect to fetch the books in page render
  useEffect(() => {
    getAllAdminBooks();
  }, []);
  return (
    <div>
      <div className="p-4 fw-bold bg">
        Books
        <hr className="hr-book" />
        <div className="text-end p-4">
          <Button>Add New Book</Button>
        </div>
        <div className="d-flex justify-content-between">
          <div>10 Books found</div>
          <div className="mb-4">
            <Form.Control placeholder="Search Books" />
          </div>
        </div>
        <BookTable />
      </div>
    </div>
  );
};

export default Books;

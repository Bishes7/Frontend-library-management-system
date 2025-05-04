import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const BookTable = () => {
  // useSelector to read the data from the state
  const { book } = useSelector((state) => state.bookInfo);

  // state to show array of books
  const [books, setBooks] = useState([]);

  // useEffect to show books on first render
  useEffect(() => {
    setBooks(book);
  }, [book]);

  // function to filter the boooks based on value

  const handleOnSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setBooks(book.filter((books) => books.title.includes(value)));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="text-secondary">{books.length} books found</div>
        <div className="mb-4">
          <Form.Control placeholder="Search Books" onChange={handleOnSearch} />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Thumbnail</th>
            <th>Name </th>
            <th>Available ?</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {books.map(({ _id, imgUrl, genre, title, year, status }, i) => (
            <tr key={_id}>
              <td>{i + 1}</td>
              <td
                className={status === "active" ? "text-success" : "text-danger"}
              >
                {status}
              </td>
              <td>{imgUrl}</td>
              <td>{title}</td>
              <td>Yes/No</td>
              <td>
                <Button variant="warning">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;

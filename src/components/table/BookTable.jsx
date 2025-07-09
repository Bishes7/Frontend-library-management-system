import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
          {books.map(
            (
              {
                _id,
                imgUrl,
                genre,
                title,
                year,
                status,
                available,
                expectedAvailable,
              },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td
                  className={
                    status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {status}
                </td>
                <td>
                  {" "}
                  <img
                    src={
                      imgUrl
                        ? `${import.meta.env.VITE_BASE_URL}${imgUrl
                            .replace("public", "")
                            .replace(/\\/g, "/")}`
                        : "/default-thumbnail.png"
                    }
                    width="50"
                    alt="image"
                  />
                </td>
                <td>{title}</td>
                <td>
                  {available
                    ? "Yes"
                    : !available && expectedAvailable
                    ? expectedAvailable.slice(0, 10)
                    : "N/A"}
                </td>
                <td>
                  <Link to={"/user/edit-book/" + _id}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;

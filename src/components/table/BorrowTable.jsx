import React, { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBorrows } from "../../features/borrow/borrowAction";

const BorrowTable = () => {
  const dispatch = useDispatch();

  // useSelector
  const { allBorrows } = useSelector((state) => state.borrowInfo);

  // useEffect to show books on first render
  useEffect(() => {
    dispatch(getAllBorrows());
  }, [dispatch]);

  // function to filter the boooks based on value

  const handleOnSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="text-secondary">10 books found</div>
        <div className="mb-4">
          <Form.Control placeholder="Search Books" onChange={handleOnSearch} />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Due Date </th>
            <th>Return Date </th>
            <th>Status</th>
            <th>Thumbnail</th>

            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {allBorrows.map(
            (
              { bookTitle, _id, isReturned, dueDate, returnedDate, thumbnail },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>{dueDate.slice(0, 10)}</td>
                <td>{isReturned ? returnedDate : "Not yet"}</td>
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
                    src={import.meta.env.VITE_BASE_URl + thumbnail.slice(6)}
                    width="50"
                    alt="image"
                  />
                </td>
                <td>{bookTitle}</td>

                <td>
                  <Link to={"/user/edit-book/" + _id}>
                    <Button variant="warning">Return Book</Button>
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

export default BorrowTable;

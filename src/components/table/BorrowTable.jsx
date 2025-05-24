import React, { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAllBorrows } from "../../features/borrow/borrowAction";

const BorrowTable = ({ admin }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const pathname = location.pathname;

  // useSelector
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);

  const borrowSource = admin ? allBorrows : myBorrows;

  // useEffect to show books on first render
  useEffect(() => {
    dispatch(getAllBorrows(admin));
  }, [dispatch, admin]);

  // function to filter the boooks based on value

  const handleOnSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="text-secondary fw-bold">
          {borrowSource.length} books found
        </div>
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
            {!pathname.includes("my-borrow") && <th>Status</th>}
            <th>Thumbnail</th>
            <th>Title</th>
            {!admin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {borrowSource.map(
            (
              {
                bookTitle,
                _id,
                isReturned,
                dueDate,
                returnedDate,
                thumbnail,
                reviewId,
              },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>{dueDate.slice(0, 10)}</td>
                <td>{isReturned ? returnedDate : "Not yet"}</td>
                {!pathname.includes("my-borrow") && (
                  <td>
                    {isReturned ? "Returned" : "Borrowed"}
                    {reviewId && " & Left Review"}
                  </td>
                )}
                <td>
                  {" "}
                  <img
                    src={import.meta.env.VITE_BASE_URl + thumbnail.slice(6)}
                    width="50"
                    alt="image"
                  />
                </td>
                <td>{bookTitle}</td>

                {!pathname.includes("borrow") && (
                  <td>
                    {!isReturned && (
                      <Button variant="warning">Return Book</Button>
                    )}
                    {isReturned && !reviewId && (
                      <Button variant="info">Leave Review</Button>
                    )}
                    {reviewId && "Reviewded"}
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BorrowTable;

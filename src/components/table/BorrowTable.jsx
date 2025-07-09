import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getAllBorrows,
  returnBookACtion,
} from "../../features/borrow/borrowAction";
import {
  setModalContent,
  setModalShow,
} from "../../features/system/systemSlice";
import ReviewForm from "../forms/ReviewForm";

const BorrowTable = ({ admin }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  const borrowSource = admin ? allBorrows : myBorrows;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllBorrows(admin));
  }, [dispatch, admin]);

  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleOnBookReturn = (_id) => {
    dispatch(returnBookACtion({ _id }));
  };

  const handleONLeaveReview = (obj) => {
    dispatch(
      setModalContent({
        content: <ReviewForm borrowData={obj} />,
        title: <h3>Leave a Review</h3>,
      })
    );
    dispatch(setModalShow(true));
  };

  const filteredBorrows = borrowSource.filter((item) =>
    item.bookTitle?.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="text-secondary fw-bold">
          {filteredBorrows.length} books found
        </div>
        <div className="mb-4">
          <Form.Control
            placeholder="Search Books"
            value={searchTerm}
            onChange={handleOnSearch}
          />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Due Date</th>
            <th>Return Date</th>
            {!pathname.includes("my-borrow") && <th>Status</th>}
            <th>Thumbnail</th>
            <th>Title</th>
            {!admin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBorrows.map(
            (
              {
                bookTitle,
                _id,
                isReturned,
                dueDate,
                returnedDate,
                thumbnail,
                reviewId,
                bookSlug,
                bookId,
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
                  const cleanedThumb = thumbnail?.replace("public",
                  "").replace(/\\/g, "/");
                  <img
                    src={
                      thumbnail
                        ? `${import.meta.env.VITE_BASE_URL}${thumbnail
                            .replace("public", "")
                            .replace(/\\/g, "/")}`
                        : "/default-thumbnail.png"
                    }
                    width="50"
                    alt="thumbnail"
                  />
                </td>
                <td>
                  <a
                    href={`/book/${bookSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookTitle}
                  </a>
                </td>
                {!admin && (
                  <td>
                    {!isReturned && (
                      <Button
                        variant="warning"
                        onClick={() => handleOnBookReturn(_id)}
                      >
                        Return Book
                      </Button>
                    )}
                    {isReturned && !reviewId && (
                      <Button
                        onClick={() => handleONLeaveReview({ _id, bookId })}
                        variant="info"
                      >
                        Leave Review
                      </Button>
                    )}
                    {reviewId && "Reviewed"}
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

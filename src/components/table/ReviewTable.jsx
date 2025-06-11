import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ReviewTable = () => {
  const { reviews } = useSelector((state) => state.reviewInfo);

  const [displayReview, setDisplayReview] = useState([]);

  useEffect(() => {
    setDisplayReview(reviews);
  }, [reviews]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <div>{displayReview.length} Reviews found !</div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {displayReview.map(
            ({ _id, title, reviewMessage, rating, isApproved, bookId }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>
                  <div>
                    <a href={"/book/" + bookId?.slug} target="_blank">
                      {bookId?.title}
                    </a>
                  </div>
                  <div>
                    <img
                      src={
                        import.meta.env.VITE_BASE_URl + bookId?.imgUrl?.slice(6)
                      }
                      width="150"
                      alt="image"
                    />
                  </div>
                </td>
                <td>
                  <div>Status:{isApproved}</div>
                  <div>Title:{title}</div>
                  <div>Message:{reviewMessage}</div>
                  <div>Ratings:{rating}</div>
                  <div>
                    <Button variant="danger">Delete</Button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

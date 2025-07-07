import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllReviews,
  updateSelectedReviews,
} from "../../features/review/reviewAction";
import { deletedReviewApi } from "../../features/review/reviewApi";
import { toast } from "react-toastify";

export const ReviewTable = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviewInfo);
  const { user } = useSelector((state) => state.userInfo);

  const [displayReview, setDisplayReview] = useState([]);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  useEffect(() => {
    setDisplayReview(reviews);
  }, [reviews]);

  // function for switch  button
  const handleOnStatusUpdate = (obj) => {
    if (confirm("Do you want to change the status of review")) {
      dispatch(updateSelectedReviews(user?.role === "admin", obj));
    }
  };

  const handleDeleteReview = async (id) => {
    if (confirm("Are you sure you want to delete the review")) {
      try {
        const response = await deletedReviewApi(id);
        const { status, message } = response;
        status === "success" && toast[status](message);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

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
                  <div className={isApproved ? "text-success" : "text-danger"}>
                    Status:
                    <Form.Check
                      type="switch"
                      label={isApproved ? "Approved" : "Pending"}
                      onChange={() =>
                        handleOnStatusUpdate({ _id, isApproved: !isApproved })
                      }
                      checked={isApproved}
                    />
                  </div>
                  <div>Title:{title}</div>
                  <div>Message:{reviewMessage}</div>
                  <div>Ratings:{rating}</div>
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteReview(_id)}
                    >
                      Delete
                    </Button>
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

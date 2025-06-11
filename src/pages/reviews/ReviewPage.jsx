import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../features/review/reviewAction";
import { ReviewTable } from "../../components/table/ReviewTable";

const ReviewPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(fetchAllReviews(user?.role === "admin"));
  }, [dispatch]);

  return (
    <div>
      <div className="p-4 fw-bold bg">
        Reviews
        <hr className="hr-book" />
        <ReviewTable />
      </div>
    </div>
  );
};

export default ReviewPage;

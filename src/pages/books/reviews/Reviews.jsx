import React from "react";
import Star from "../../../components/star/star";
import { formatDistance, formatDistanceToNow, subDays } from "date-fns";

const reviews = [
  {
    title: "Awesome Book",
    rating: 4.6,
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit voluptatem distinctio dolore eaque ipsam ipsum",
    createdAt: "2-02-2025",
    reviewdBy: "Name",
  },
];

const Reviews = () => {
  return (
    <div className="reviews-tab">
      {reviews.map((review, i) => (
        <div
          key={i}
          className=" border rounded shadow-lg p-3 d-flex review-item gap-5 "
        >
          <div className="left d-flex align-items-center justify-content-center">
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3 ">
              PA
            </div>
          </div>
          <div className="right">
            <h3>{review.title}</h3>
            <div className="d-flex gap-3">
              <Star avgRating={review.rating} />
              <span>
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <p>{review.details}</p>
            <div className="text-end">-{review.reviewdBy}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

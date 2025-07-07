import React from "react";

import { formatDistanceToNow } from "date-fns";
import Star from "../../../components/star/StarAvg";

const Reviews = ({ reviewsArr }) => {
  return (
    <div className="reviews-tab">
      {reviewsArr.map((r, i) => (
        <div
          key={i}
          className=" border rounded shadow-lg p-3 d-flex review-item gap-5 "
        >
          <div className="left d-flex align-items-center justify-content-center">
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3 ">
              {r.userName.split(" ")[0][0].toUpperCase()}
              {r.userName.split(" ").at(-1)[0].toUpperCase()}
            </div>
          </div>
          <div className="right">
            <h3>{r.title}</h3>
            <div className="d-flex gap-3">
              <Star avgRating={r.rating} />
              <span>
                {formatDistanceToNow(new Date(r.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <p>{r.reviewMessage}</p>
            <div className="text-end">-{r.userName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

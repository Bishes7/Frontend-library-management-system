import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { ImStarEmpty } from "react-icons/im";

const Star = ({ avgRating }) => {
  if (avgRating < 0 || avgRating > 5) {
    return "";
  }
  const maxRating = 5;
  const showStars = [];

  const fullStar = Math.floor(avgRating);
  const halfStar = !Number.isInteger(avgRating);

  const emptyStar = maxRating - fullStar - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStar; i++) {
    showStars.push(<FaStar className="text-warning" />);
  }

  if (halfStar) showStars.push(<FaStarHalfAlt className="text-warning" />);

  for (let i = 0; i < emptyStar; i++) {
    showStars.push(<ImStarEmpty />);
  }

  return <div>{showStars}</div>;
};

export default Star;

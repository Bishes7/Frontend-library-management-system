import React from "react";
import SectionTitle from "../sectionTitle/SectionTitle";
import { CustomCard } from "../customCard/CustomCard";
import { useSelector } from "react-redux";

const BestRead = () => {
  const { publicBook } = useSelector((state) => state.bookInfo);

  let topRatedBooks = [];
  if (publicBook.length) {
    // You can customize this logic to filter your "Best Read"
    topRatedBooks = [...publicBook]
      .filter((book) => book.averageRating >= 4)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 4);
  }

  return (
    <div className="mt-5">
      <SectionTitle title="Best Read" />
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        {topRatedBooks.map((book) => (
          <CustomCard key={book._id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BestRead;

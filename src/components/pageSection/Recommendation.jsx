import React from "react";
import SectionTitle from "../sectionTitle/SectionTitle";
import { CustomCard } from "../customCard/CustomCard";
import { useSelector } from "react-redux";

const Recommendation = () => {
  const { publicBook } = useSelector((state) => state.bookInfo);

  let recommendedBooks = [];
  if (publicBook.length) {
    recommendedBooks = [...publicBook]
      .filter((book) => book.available === true)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 4);
  }
  return (
    <div className="mt-5">
      <SectionTitle title="Recommendation" />
      <div className="d-flex gap-2  justify-content-center flex-wrap">
        {recommendedBooks.map((book) => (
          <CustomCard key={book._id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;

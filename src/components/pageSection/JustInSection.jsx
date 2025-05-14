import React from "react";
import SectionTitle from "../sectionTitle/SectionTitle";
import { CustomCard } from "../customCard/CustomCard";
import { useSelector } from "react-redux";

const JustInSection = () => {
  // first read the book using useSelector
  const { publicBook } = useSelector((state) => state.bookInfo);

  let books = [];
  if (publicBook.length) {
    const sortedBook = [...publicBook].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    books = sortedBook.slice(0, 4);
  }

  return (
    <div className="mt-5">
      <SectionTitle title="Just In" />
      <div className="d-flex gap-2  justify-content-center flex-wrap">
        {books.map((book) => (
          <CustomCard key={book._id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default JustInSection;

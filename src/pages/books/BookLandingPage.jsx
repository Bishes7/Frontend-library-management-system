import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookLandingPage = () => {
  const { slug } = useParams();

  const [clickedBook, setClickedBook] = useState({});

  const { publicBook } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    const selectedBook = publicBook.find((book) => book.slug === slug);
    setClickedBook(selectedBook);
  }, [publicBook]);
  console.log(clickedBook);

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <img
              src={
                import.meta.env.VITE_BASE_URl + clickedBook?.imgUrl?.slice(6)
              }
              alt=""
              width="250px"
            />
          </div>
        </Col>
        <Col>book info</Col>
      </Row>
      <Row>
        <Col>details</Col>
      </Row>
    </Container>
  );
};

export default BookLandingPage;

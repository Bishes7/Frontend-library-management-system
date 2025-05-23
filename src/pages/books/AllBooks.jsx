import React from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import BookListing from "../../components/bookListing/BookListing";

const AllBooks = () => {
  // Read books from redux
  const { publicBook } = useSelector((state) => state.bookInfo);

  return (
    <Container>
      <Row className="my-2">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/all-books" }}>
              All Books
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <BookListing booklist={publicBook} />
    </Container>
  );
};

export default AllBooks;

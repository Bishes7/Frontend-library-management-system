import React from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BookListing from "../../components/bookListing/BookListing";

const Search = () => {
  const { publicBook } = useSelector((state) => state.bookInfo);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const navigate = useNavigate();

  !query && navigate("/");

  const searchBookArr = publicBook.filter((book) => {
    const searchSet = book.title + " " + book.description.toLowerCase();
    return searchSet.includes(query.toLocaleLowerCase());
  });

  return (
    <Container>
      <Row className="my-2">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/all-books" }}>
              Search
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <BookListing booklist={searchBookArr} />
    </Container>
  );
};

export default Search;

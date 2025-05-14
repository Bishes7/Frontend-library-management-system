import React, { useEffect, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOnlySelectedBook } from "../../features/books/bookAction";
import { FaStar } from "react-icons/fa";

const BookLandingPage = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const [clickedBook, setClickedBook] = useState({});

  // const { publicBook } = useSelector((state) => state.bookInfo);
  const { selectedBook } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    // First Approach Locally
    // const selectedBook = publicBook.find((book) => book.slug === slug);
    // setClickedBook(selectedBook);

    // Second Approach- Fetch from server
    dispatch(getOnlySelectedBook(slug));
  }, [dispatch, slug]);

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
            <Breadcrumb.Item active>{selectedBook?.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {!selectedBook?._id && (
        <Row>
          <Col>
            <Alert variant="danger fw-bold">
              This book is not available at the moment
            </Alert>
          </Col>
        </Row>
      )}

      {selectedBook?._id && (
        <>
          <Row>
            <Col>
              <div>
                <img
                  src={
                    import.meta.env.VITE_BASE_URl +
                    selectedBook?.imgUrl?.slice(6)
                  }
                  alt=""
                  width="250px"
                />
              </div>
            </Col>
            <Col>
              <div className="d-flex h-100 flex-column justify-content-between ">
                <div className="top">
                  <h1>{selectedBook.title}</h1>
                  <div className="fw-bold">
                    {selectedBook.author} - {selectedBook.year}
                  </div>
                  <div className="my-2">
                    <span>{selectedBook.genre}</span> |{" "}
                    <span>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </span>
                  </div>
                  <div>{selectedBook.description.slice(0, 300)}...</div>
                </div>
                <div className="buttom">
                  <hr />
                  <div className="d-grid">
                    <Button variant="dark">Add to Borrow List</Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>details</Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookLandingPage;

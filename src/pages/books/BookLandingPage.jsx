import React, { useEffect, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOnlySelectedBook } from "../../features/books/bookAction";

import Reviews from "./reviews/Reviews";
import { setCartItem } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import StarAvg from "../../components/star/StarAvg";

const BookLandingPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [showImg, setShowImg] = useState(1);
  const [loader, setLoader] = useState(true);

  const { selectedBook } = useSelector((state) => state.bookInfo);
  const { cartItem } = useSelector((state) => state.cartInfo);
  const { reviews } = useSelector((state) => state.reviewInfo);

  useEffect(() => {
    const fetchBook = async () => {
      setLoader(true);
      try {
        await dispatch(getOnlySelectedBook(slug));
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
      setLoader(false);
    };

    fetchBook();
  }, [dispatch, slug]);

  const handleOnAddCart = () => {
    dispatch(setCartItem(selectedBook));
    toast.info("Book successfully added to the cart");
  };

  const IsBookInCart = cartItem.find((book) => book._id === selectedBook._id);

  const bookReviews = reviews.filter(
    (r) => r.bookId?._id === selectedBook?._id
  );

  const avgRating =
    bookReviews.reduce((acc, r) => acc + r.rating, 0) / bookReviews.length || 0;

  console.log("🧠 imageList:", selectedBook.imageList);

  if (loader) {
    return (
      <Container>
        <Row className="justify-content-center py-5">
          <Col className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

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

      {!selectedBook?._id ? (
        <Row>
          <Col>
            <Alert variant="danger fw-bold">
              This book is not available at the moment
            </Alert>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <div className="mb-3" style={{ height: "400px" }}>
                <img
                  src={
                    import.meta.env.VITE_BASE_URl +
                    selectedBook?.imageList[showImg].slice(6)
                  }
                  alt={selectedBook.title}
                  className="h-100 w-100 object-fit-contain"
                />
              </div>
              <div className="d-flex overflow-auto gap-2 py-2"></div>
            </Col>

            <Col>
              <div className="d-flex h-100 flex-column justify-content-between">
                <div className="top">
                  <h1>{selectedBook.title}</h1>
                  <div className="fw-bold">
                    {selectedBook.author} - {selectedBook.year}
                  </div>
                  <div className="my-2">
                    <span>{selectedBook.genre}</span>
                    <StarAvg avgRating={avgRating} />
                  </div>
                  <div>{selectedBook.description.slice(0, 300)}...</div>
                </div>
                <div className="buttom">
                  <hr />
                  <div className="d-grid">
                    <Button
                      variant="dark"
                      onClick={handleOnAddCart}
                      disabled={IsBookInCart || selectedBook.expectedAvailable}
                    >
                      {selectedBook.expectedAvailable
                        ? `Expected Available: ${selectedBook.expectedAvailable.slice(
                            0,
                            10
                          )}`
                        : IsBookInCart
                        ? "Book already exists in the Cart"
                        : "Add Book to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-5 mb-5">
            <Col className="border p-3 rounded shadow-lg">
              <h3 className="margin-auto mt-5 text-center">
                More Details here
              </h3>
              <Tabs
                defaultActiveKey="description"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="description" title="Description">
                  <div>{selectedBook.description}</div>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Reviews reviewsArr={bookReviews} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookLandingPage;

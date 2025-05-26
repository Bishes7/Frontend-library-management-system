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
import Star from "../../components/star/star";
import Reviews from "./reviews/Reviews";
import { setCartItem } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

const BookLandingPage = () => {
  const { slug } = useParams();

  const [showImg, setShowImg] = useState(0);

  const dispatch = useDispatch();

  // const [clickedBook, setClickedBook] = useState({});

  // const { publicBook } = useSelector((state) => state.bookInfo);
  const { selectedBook } = useSelector((state) => state.bookInfo);
  const { cartItem } = useSelector((state) => state.cartInfo);

  useEffect(() => {
    // First Approach Locally
    // const selectedBook = publicBook.find((book) => book.slug === slug);
    // setClickedBook(selectedBook);

    // Second Approach- Fetch from server
    dispatch(getOnlySelectedBook(slug));
  }, [dispatch, slug]);

  const handleOnAddCart = () => {
    dispatch(setCartItem(selectedBook));
    toast.info("Book Successfully added in the cart");
  };

  const IsBookInCart = cartItem.find((book) => book._id === selectedBook._id);

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
            <Col md={4}>
              <div className="mb-3" style={{ height: "400px" }}>
                <img
                  src={
                    import.meta.env.VITE_BASE_URl +
                    selectedBook?.imageList[showImg].slice(6)
                  }
                  alt={selectedBook.title}
                  // width="100%"
                  className="h-100 w-100 object-fit-contain"
                />
              </div>
              {/* Scrollable THumbnails */}
              <div className="d-flex overflow-auto gap-2 py-2">
                {selectedBook.imageList?.map((url, i) => (
                  <img
                    src={import.meta.env.VITE_BASE_URl + url?.slice(6)}
                    key={url}
                    width={"70px"}
                    className="img-thumbnail"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowImg(i)}
                  />
                ))}
              </div>
            </Col>
            <Col>
              <div className="d-flex h-100 flex-column justify-content-between  ">
                <div className="top">
                  <h1>{selectedBook.title}</h1>
                  <div className="fw-bold">
                    {selectedBook.author} - {selectedBook.year}
                  </div>
                  <div className="my-2">
                    <span>{selectedBook.genre}</span>
                    <Star avgRating={2} />
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
                <Tab eventKey="reviews" title="reviews">
                  <Reviews />
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

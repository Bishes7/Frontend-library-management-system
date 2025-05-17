import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Col,
  Container,
  Pagination,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCard, CustomList } from "../../components/customCard/CustomCard";
import { useSelector } from "react-redux";

const booksPerScreen = 9;

const AllBooks = () => {
  const [view, setView] = useState("card");

  //   state to track the clicked pages
  const [active, setActive] = useState(1);
  // Read books from redux
  const { publicBook } = useSelector((state) => state.bookInfo);

  const pages = Math.ceil(publicBook.length / booksPerScreen);

  const startIndex = (active - 1) * booksPerScreen;
  const endIndex = startIndex + booksPerScreen;

  const booksDisplayed = publicBook.slice(startIndex, endIndex);

  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>
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
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="fw-bold d-flex justify-content-between align-items-center ">
            <div> 100 Books found</div>
            <div>
              <ButtonGroup className="shadow-lg">
                <Button variant="primary" onClick={() => setView("card")}>
                  Card
                </Button>
                <Button variant="warning" onClick={() => setView("list")}>
                  List
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <hr />
          <div className="booklist-container d-flex gap-2 flex-wrap mt-3">
            {booksDisplayed.length > 0 &&
              booksDisplayed.map((books) =>
                view === "card" ? (
                  <CustomCard {...books} key={books._id} />
                ) : (
                  <CustomList {...books} key={books._id} />
                )
              )}
          </div>

          <div className="pagination d-flex justify-content-center mt-3">
            <Pagination>{items}</Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllBooks;

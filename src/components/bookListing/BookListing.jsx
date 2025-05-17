import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import PaginationTemplate from "../PaginationTemplate/PaginationTemplate";
import { CustomCard, CustomList } from "../customCard/CustomCard";

const booksPerScreen = 9;

const BookListing = ({ booklist }) => {
  const [active, setActive] = useState(1);
  const [view, setView] = useState("card");

  const startIndex = (active - 1) * booksPerScreen;
  const endIndex = startIndex + booksPerScreen;
  const pages = Math.ceil(booklist.length / booksPerScreen);

  const booksDisplayed = booklist.slice(startIndex, endIndex);

  //   state to track the clicked pages

  return (
    <Row>
      <Col>
        <div className="fw-bold d-flex justify-content-between align-items-center ">
          <div> {booklist.length} books found</div>
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

        <PaginationTemplate
          active={active}
          setActive={setActive}
          pages={pages}
        />
      </Col>
    </Row>
  );
};

export default BookListing;

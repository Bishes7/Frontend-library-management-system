import React, { useEffect } from "react";

import { Row, Col, Card, Badge, ProgressBar, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllBorrows } from "../borrow/borrowAction";
import UserBorrowChart from "../../components/charts/UserBorrowChart";

const UserDashboardContent = () => {
  const dispatch = useDispatch();
  const { myBorrows } = useSelector((state) => state.borrowInfo);

  useEffect(() => {
    dispatch(getAllBorrows());
  }, [dispatch]);

  const totalBorrowed = myBorrows.length;
  const activeBorrows = myBorrows.filter((borrow) => !borrow.isReturned);

  const activeBorrowsList = myBorrows.filter((borrow) => !borrow.isReturned);

  const activeCount = activeBorrowsList.length;

  const topBook = myBorrows.length
    ? myBorrows[0].bookTitle || "unknown"
    : "N/A";

  const currentBorrows = activeBorrowsList.map((b) => ({
    title: b.bookTitle,
    dueDate: new Date(b.dueDate).toLocaleDateString(),
  }));

  //   Badge Logic
  let readingLevel = "Beginner Reader";
  let badgeVariant = "secondary";

  if (totalBorrowed > 10) {
    readingLevel = "Book Master";
    badgeVariant = "success";
  } else if (totalBorrowed > 5) {
    readingLevel = "Avid Reader";
    badgeVariant = "primary";
  }
  return (
    <div>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Total Books Borrowed</h6>
            <h4>{totalBorrowed}</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Currently Borrowed</h6>
            <h4>{activeCount}</h4>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Your Favourite Book</h6>
            <h4>{topBook}</h4>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h6>Reading Level</h6>
            <Badge bg={badgeVariant}>{readingLevel} </Badge>
            <ProgressBar
              striped
              now={(totalBorrowed / 15) * 100}
              label={`${totalBorrowed}/15`}
              className="mt-2"
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h6>Currently Borrowed Books</h6>
            {currentBorrows.length > 0 ? (
              <ListGroup variant="flush">
                {currentBorrows.map((b, i) => (
                  <ListGroup.Item key={i}>
                    <strong>{b.title}</strong> - due by <span>{b.dueDate}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted">No active borrowings</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-3 shadow-sm text-center mt-4">
            <UserBorrowChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboardContent;

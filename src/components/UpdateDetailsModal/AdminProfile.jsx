import React, { useState } from "react";
import { Tab, Nav, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import ChangePasswordModal from "../../components/UpdateDetailsModal/ChangePasswordModal";

const AdminProfile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { publicBook } = useSelector((state) => state.bookInfo);
  const { myBorrows } = useSelector((state) => state.borrowInfo);

  const approvedBooksCount = publicBook?.filter(
    (book) => book.status === "active" || book.status === "approved"
  ).length;

  const usersManaged = 18;

  const [key, setKey] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOnClose = () => setShowModal(false);
  const handleOnShow = () => setShowModal(true);

  return (
    <div className="container mt-4">
      <h4 className="mb-3 fw-bold">Welcome, {user?.fName} (Admin)!</h4>

      <Card className="p-3 shadow-sm rounded-4">
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="profile">
                Profile Info <FaInfoCircle />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="password"> Change Password 🔐</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="activity">
                Activity Log <RxActivityLog />
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="profile">
              <p>
                <strong>Bio:</strong> Passionate about managing digital
                libraries and helping users find books faster.
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span className="text-muted">{user.email}</span>
              </p>
              <p>
                <strong>Phone:</strong> 0451280806
              </p>
              <p>
                <strong>Joined:</strong> {user?.createdAt?.slice(0, 10)}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>

              <hr className="mt-4 mb-3" />

              <Row className="text-center">
                <Col md={4}>
                  <h5>{usersManaged}</h5>
                  <b>👥 Users Managed</b>
                </Col>
                <Col md={4}>
                  <h5>{approvedBooksCount}</h5>
                  <b>📚 Books Approved</b>
                </Col>
                <Col md={4}>
                  <h5>{myBorrows.length}</h5>
                  <b>📦 Total Borrows</b>
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="password">
              <Button onClick={handleOnShow} variant="dark">
                Update your credentials?
              </Button>

              <ChangePasswordModal show={showModal} onHide={handleOnClose} />
            </Tab.Pane>

            <Tab.Pane eventKey="activity">
              <p className="mb-3">
                Below is a simulation of recent admin activities to showcase
                system functionality.
              </p>
              <ul className="list-unstyled">
                <li>
                  🗓️ <strong>2025-06-20:</strong> Approved 5 new books for the
                  library.
                </li>
                <li>
                  🗓️ <strong>2025-06-18:</strong> Updated book categories and
                  metadata.
                </li>
                <li>
                  🗓️ <strong>2025-06-15:</strong> Managed access rights for 3
                  new users.
                </li>
                <li>
                  🗓️ <strong>2025-06-10:</strong> Reviewed weekly book borrow
                  stats.
                </li>
                <li>
                  🗓️ <strong>2025-06-08:</strong> Tested new password change
                  module.
                </li>
              </ul>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </div>
  );
};

export default AdminProfile;

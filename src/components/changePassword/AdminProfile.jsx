import React, { useState } from "react";
import {
  Tab,
  Nav,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { changePasswordApi } from "../../services/authApiConnector";
import { FaInfoCircle } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";

const AdminProfile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { publicBook } = useSelector((state) => state.bookInfo);
  const { myBorrows } = useSelector((state) => state.borrowInfo);

  const approvedBooksCount = publicBook?.filter(
    (book) => book.status === "active" || book.status === "approved"
  ).length;

  const usersManaged = 18;

  const initialState = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const { form, setForm, handleOnChange, passwordErrors } = useForm(
    initialState,
    "changePassword"
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (passwordErrors.length) {
      toast.error("Password validation failed. Please check requirements.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await changePasswordApi(form);
      const { status, message } = response;
      toast[status](message);
      if (status === "success") {
        setForm({ ...initialState });
        handleClose();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const errorMessages = {
    minLength: "At least 6 characters required",
    uppercase: "At least 1 UPPERCASE letter required",
    lowercase: "At least 1 lowercase letter required",
    number: "At least 1 number required",
    specialChar: "At least 1 special character required",
  };

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
              <Button onClick={handleShow} variant="dark">
                Update your credentials?
              </Button>

              <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-2">
                      <Form.Label>Current Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">🔒</span>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={form.password}
                          onChange={handleOnChange}
                          required
                        />
                        <span
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </span>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>New Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">🔒</span>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={form.newPassword}
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Confirm New Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">🔒</span>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={form.confirmPassword}
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                    </Form.Group>

                    {passwordErrors.length > 0 && (
                      <Alert variant="warning" className="small mt-2">
                        <ul className="mb-0 ps-3">
                          {passwordErrors.map((err, i) => (
                            <li key={i}>{errorMessages[err] || err}</li>
                          ))}
                        </ul>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="dark"
                      className="w-100 mt-3 fw-bold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
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

import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { changePasswordApi } from "../../services/authApiConnector";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const ChangePasswordModal = ({ show, onHide }) => {
  const initialState = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { form, setForm, handleOnChange, passwordErrors } = useForm(
    initialState,
    "changePassword"
  );

  const errorMessages = {
    minLength: "At least 6 characters required",
    upperCase: "At least 1 UPPERCASE letter required",
    lowercase: "At least 1 lowercase letter required",
    number: "At least 1 number required",
    specialChar: "At least 1 special character required",
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Password do not match");
      setIsLoading(false);
      return;
    }

    if (passwordErrors.length) {
      toast.error("Password validation failed, please ccheck requirements");
      setIsLoading(false);
      return;
    }

    try {
      const response = await changePasswordApi(form);
      const { status, message } = response;

      if (status === "success") {
        toast.success(message);
        setForm(initialState);
        onHide();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
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
                className="input-text-group"
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
            <Alert variant="danger" className="small mt-2">
              <ul className="ps-3">
                {passwordErrors.map((err, i) => (
                  <li key={i}>{errorMessages[err]}</li>
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
                />{" "}
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;

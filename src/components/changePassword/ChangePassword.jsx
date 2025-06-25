import React, { useState } from "react";
import { Card, Alert, Form, Button } from "react-bootstrap";
import { RiLockPasswordLine } from "react-icons/ri";

import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { changePasswordApi } from "../../services/authApiConnector";

const ChangePassword = () => {
  const initialState = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const { form, setForm, passwordErrors, handleOnChange } = useForm(
    initialState,
    "changePassword"
  );

  const handleOnnSubmit = async (e) => {
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
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="p-4 shadow-sm rounded-4 mt-3 mx-auto bg-white"
      style={{ maxWidth: "500px" }}
    >
      <h4 className="mb-1 text-center text-dark fw-semibold">
        Change Password <RiLockPasswordLine />
      </h4>
      <hr />

      <Form onSubmit={handleOnnSubmit}>
        <Form.Group className="mb-1">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            name="password"
            value={form.password}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        {passwordErrors.length > 0 && (
          <div className="alert alert-warning small mt-2">
            <ul className="mb-0 ps-3">
              {passwordErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Button
          type="submit"
          variant="dark"
          className="w-100 mt-3 fw-bold"
          disabled={isLoading}
          style={{ transition: "all 0.3s ease" }}
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
    </Card>
  );
};

export default ChangePassword;

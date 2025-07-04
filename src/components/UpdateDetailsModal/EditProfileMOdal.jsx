import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetailsApi } from "../../features/user/userApi";
import { toast } from "react-toastify";
import { fetchUserAction } from "../../features/user/userAction";
import { Button, Form, Modal } from "react-bootstrap";

const EditProfileMOdal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const { form, handleOnChange } = useForm(
    {
      fName: user?.fName || "",
      lName: user?.lName || "",
      email: user?.email || "",
    },
    "default"
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, message } = await updateProfileDetailsApi(form);
      if (status === "success") {
        toast.success(message);
        dispatch(fetchUserAction());
        onHide();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="fName"
                value={form.fName}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                name="lName"
                value={form.lName}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProfileMOdal;

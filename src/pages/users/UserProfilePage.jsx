import React, { useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { uploadProfileImageApi } from "../../features/user/userApi";
import { toast } from "react-toastify";
import ChangePasswordModal from "../../components/changePassword/ChangePasswordModal";

const UserProfilePage = () => {
  const [showModal, setShowModal] = useState(false);

  // pop up modal
  const handleOnShow = () => setShowModal(true);
  const handleOnClose = () => setShowModal(false);

  const BACKEND_URL = import.meta.env.VITE_BASE_URl || "http://localhost:8000";
  const { user } = useSelector((state) => state.userInfo);
  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(
    user?.profilePic
      ? `${BACKEND_URL}${user.profilePic}`
      : "/default-profile.png"
  );

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const { payload, status, message } = await uploadProfileImageApi(
        formData
      );
      if (status === "success" && payload?.profilePic) {
        setImagePreview(`${BACKEND_URL}${payload.profilePic}`);
      }
    } catch (error) {
      toast.error("Failed to uplaod the file");
    }
  };
  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="mb-4">User Profile</h2>

        <Row>
          <Col md={6}>
            <p>
              <strong>Name: </strong>
              {user.fName} {user.lName}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Role: </strong>
              <span
                className={`badge ${
                  user?.role === "admin" ? "bg-success" : "bg-secondary"
                }`}
              >
                {user.role}
              </span>
            </p>
            <p>
              <strong>Status: </strong>
              <span
                className={`badge ${
                  user?.status === "active" ? "bg-success" : "bg-danger"
                }`}
              >
                {user.status}
              </span>
            </p>
            <p>
              <strong>Joined: </strong>
              {new Date(user.createdAt).toDateString()}
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div style={{ cursor: "pointer" }}>
              <img
                src={imagePreview}
                alt="Profile"
                className="img-thumbnail"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <p className="text-muted mt-2">Click image to upload</p>
            </div>
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="primary" className="me-3">
            Edit Profile
          </Button>
          <Button variant="warning" onClick={handleOnShow}>
            Change Password
          </Button>
        </div>
      </Card>
      <ChangePasswordModal show={showModal} onHide={handleOnClose} />
    </div>
  );
};

export default UserProfilePage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfileApi } from "../../features/user/userApi";
import { Badge, Card, Col, Row, Spinner } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchuser = async () => {
      const { status, payload } = await getUserProfileApi(id);

      if (status === "success") {
        setUser(payload);
      }
      setIsLoading(false);
    };
    fetchuser();
  }, [id]);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-4 border-bottom  pb-2 ">
        <i
          className="bi bi-person-circle"
          style={{ fontSize: "3rem", color: "#6c757d" }}
        >
          User Profile
        </i>
      </h4>
      <button
        className="mb-2 btn btn-outline-secondary"
        onClick={() => navigate("/user/all")}
      >
        <IoMdArrowRoundBack /> Back
      </button>

      <Card className="p-4 shadow-sm rounded">
        <Row className="mb-3">
          <Col sm={4} className="fw-semibold">
            Full Name :
          </Col>
          <Col sm={8}>
            {user.fName} {user.lName}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={4} className="fw-semibold">
            Email :
          </Col>
          <Col sm={8}>{user.email}</Col>
        </Row>

        <Row>
          <Col sm={4} className="fw-semibold">
            Role :
          </Col>
          <Col sm={8}>
            <Badge bg={user.role === "admin" ? "success" : "secondary"}>
              {user.role}
            </Badge>
          </Col>
        </Row>

        <Row>
          <Col sm={4} className="fw-semibold">
            Status :
          </Col>
          <Col sm={8}>
            <Badge bg={user.status === "active" ? "success" : "warning"}>
              {user.status}
            </Badge>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;

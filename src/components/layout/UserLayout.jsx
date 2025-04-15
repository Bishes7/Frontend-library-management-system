import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "./SideBar";
import AuthRoute from "../auth/AuthRoute";

export const UserLayout = () => {
  return (
    <AuthRoute>
      {/* NavBAR */}
      <Header />

      <Container fluid>
        <Row>
          <Col md={3} xl={2} className="bg-dark text-white fw-bold">
            <div className="p-3 text-warning">
              <div>Welcome Back</div>
              <h4>Bishes Adhikari</h4>
            </div>
            <hr />
            <SideBar />
          </Col>
          <Col md={9} xl={10}>
            {/* Main Page */}
            <main className="main">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </AuthRoute>
  );
};

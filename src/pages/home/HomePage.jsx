import React from "react";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import { Col, Container, Row } from "react-bootstrap";
import JustInSection from "../../components/pageSection/JustInSection";
import BestRead from "../../components/pageSection/BestRead";
import Recommendation from "../../components/pageSection/Recommendation";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          {/* Hero Section */}
          <CustomCarousel />
          {/* Just In Sectionn */}
          <JustInSection />

          {/* Best Read Section */}
          <BestRead />

          {/* Recommendation Section */}
          <Recommendation />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

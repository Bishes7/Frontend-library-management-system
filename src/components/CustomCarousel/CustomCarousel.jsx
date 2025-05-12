import React from "react";
import { Carousel } from "react-bootstrap";
import a from "../../assets/images/1.jpg";
import b from "../../assets/images/2.jpg";
import c from "../../assets/images/3.jpg";

const CustomCarousel = () => {
  return (
    <Carousel className="mt-4">
      <Carousel.Item>
        <img src={a} alt="First slide" className="d-block w-100% " />
        <Carousel.Caption className="carousel-caption rounded p-2">
          <h3>Track Progress. Empower Learning</h3>
          <hr />
          <p>
            Monitor student achievements in real-time. Support every learner
            with data-driven insights.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b} alt="Second slide" />
        <Carousel.Caption>
          <h3>Smart Tools for Smarter Education</h3>
          <hr />
          <p>
            All-in-one platform for assignments, grades, and communication.
            Designed to simplify and enhance your teaching workflow.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={c} alt="Third slide" />
        <Carousel.Caption>
          <h3>Seamless Access. Anytime, Anywhere</h3>
          <hr />
          <p>
            Responsive design for learning on the go. Access courses and
            resources 24/7 from any device.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;

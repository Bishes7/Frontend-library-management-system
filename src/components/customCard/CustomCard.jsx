import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// For the card View
export const CustomCard = ({ imgUrl, title, year, slug, author }) => {
  return (
    <Card className="shadow" style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={import.meta.env.VITE_BASE_URl + imgUrl?.slice(6)}
        width="50"
        alt="image"
      />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {author}-{year}
        </Card.Text>
        <Link to={"/book/" + slug}>
          <Button variant="dark">View Book Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// For the List VIew
export const CustomList = ({
  imgUrl,
  title,
  year,
  slug,
  author,
  description,
}) => {
  return (
    <Card>
      <div>
        <div className="Shadow d-flex gap-3 align-items-start">
          <Card.Img
            variant="top"
            src={import.meta.env.VITE_BASE_URl + imgUrl?.slice(6)}
            style={{ width: "120px", height: "auto", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Title>{description}</Card.Title>
            <Card.Text>
              {author}- {year}
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

// For the card View
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const CustomCard = ({ imgUrl, title, year, slug, author }) => {
  // Clean the path for slashes and "public"
  const cleanedImgUrl = `${import.meta.env.VITE_BASE_URL}${imgUrl
    ?.replace("public", "")
    .replace(/\\/g, "/")}`;

  return (
    <Card className="shadow" style={{ width: "16rem" }}>
      <Card.Img variant="top" src={cleanedImgUrl} alt="image" />
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {author} - {year}
        </Card.Text>
        <Link to={`/book/${slug}`}>
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
  const cleanedImgUrl = `${import.meta.env.VITE_BASE_URL}${imgUrl
    ?.replace("public", "")
    .replace(/\\/g, "/")}`;

  return (
    <Card>
      <div>
        <div className="shadow d-flex gap-3 align-items-start">
          <Card.Img
            variant="top"
            src={cleanedImgUrl}
            style={{ width: "120px", height: "auto", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Title>{description}</Card.Title>
            <Card.Text>
              {author} - {year}
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

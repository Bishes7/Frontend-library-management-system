import React from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, resetCartItem } from "../../features/cart/cartSlice";
import { borrowBookAPi } from "../../features/cart/cartApi";
import { toast } from "react-toastify";

const CartPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // Read books from redux
  const { cartItem } = useSelector((state) => state.cartInfo);
  const { user } = useSelector((state) => state.userInfo);

  const handleOnBookDelete = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleOnBorrow = async () => {
    if (window.confirm("Are you sure, you wanna proceed to checkout ? ")) {
      // To do
      const bookArr = cartItem.map(({ _id, title, imgUrl, slug }) => {
        return {
          bookId: _id,
          bookTitle: title,
          thumbnail: imgUrl,
          bookSlug: slug,
        };
      });
      const pending = borrowBookAPi(bookArr);
      toast.promise(pending, { pending: "Please wait" });

      const { status, message, payload } = await pending;

      toast[status](message);

      dispatch(resetCartItem());

      navigate("/user/thankyou");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="py-3 text-center">My Borrow List</h1>

          <div>
            <Table>
              <tbody>
                {cartItem.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <img
                        src={
                          import.meta.env.VITE_BASE_URl + book.imgUrl.slice(6)
                        }
                        alt={book.title}
                        style={{
                          width: "80px",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>Return Date : 20-09-2026</td>
                    <td>
                      <Button
                        variant="Link"
                        onClick={() => handleOnBookDelete(book._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {cartItem.length > 0 ? (
              <div className="text-end">
                {user._id ? (
                  <Button variant="dark" onClick={handleOnBorrow}>
                    Borrow
                  </Button>
                ) : (
                  <Link to="/login" state={{ from: "/cart" }}>
                    <Button variant="dark">Login To Borrow </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div>
                <Alert variant="info fw-bold">Your Cart is Empty</Alert>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;

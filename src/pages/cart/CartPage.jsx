import React from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../features/books/bookSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  // Read books from redux
  const { cartItem } = useSelector((state) => state.bookInfo);

  const handleOnBookDelete = (_id) => {
    dispatch(removeFromCart(_id));
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
                        alt=""
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
                <Button variant="dark">Login To Borrow || Proceed</Button>
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

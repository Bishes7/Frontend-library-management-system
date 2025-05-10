import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../custominput/CustomInput";
import { editBookTemplate } from "../../../assets/custominputs/bookTemplate";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { updateBookApi } from "../../../features/books/bookApi";

const EditBookForm = () => {
  const initialState = {};
  const { form, setForm, handleOnChange } = useForm(initialState);
  const navigate = useNavigate();
  const { _id } = useParams();
  // get books from redux store
  const { book } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    if (_id !== form._id) {
      const selectedBook = book.find((books) => books._id === _id);
      selectedBook?._id ? setForm(selectedBook) : navigate("/user/books");
    }
  }, [_id, book, form._id, setForm]);

  // Function to submit form
  const handlOnSubmit = async (e) => {
    e.preventDefault();
    const {
      addedBy,
      createdAt,
      slug,
      updatedAt,
      expectedAvailable,
      __v,
      isbn,
      lastUpdateBy,
      available,
      ...rest
    } = form;

    const result = await updateBookApi(rest);
  };

  return (
    <div className="p-4">
      <h3>Insert new book details !</h3>
      <Form className="m-3" onSubmit={handlOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            name="status"
            type="switch"
            id="custom-switch"
            label={form.status}
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>
        {editBookTemplate.map((book) => (
          <CustomInput
            key={book.name}
            {...book}
            onChange={handleOnChange}
            value={form[book.name]}
          />
        ))}

        <div className="mb-3 text-secondary">
          <h4>Addtional Info</h4>
          <hr />
          <div className="fw-bold">
            Added By: {form?.addedBy?.name} <br />
            Date:{form?.createdAt}
          </div>
          <div className="fw-bold">
            last Updated By: {form?.lastUpdateBy?.name} <br />
            Date:{form?.updatedAt}
          </div>
        </div>

        <div className="d-grid">
          <Button type="submit" variant="info">
            Edit Book
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditBookForm;

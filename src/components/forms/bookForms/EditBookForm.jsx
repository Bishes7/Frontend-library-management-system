import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../custominput/CustomInput";
import { editBookTemplate } from "../../../assets/custominputs/bookTemplate";
import useForm from "../../../hooks/useForm";
import { postNewBook } from "../../../features/books/bookAction";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
      selectedBook?._id ? setForm(selectedBook) : navigate("user/books");
    }
  }, [setForm]);

  // Function to submit form
  const handlOnSubmit = async (e) => {
    e.preventDefault();
    const data = await postNewBook(form);
  };

  return (
    <div className="p-4">
      <h3>Insert new book details !</h3>
      <Form className="m-3" onSubmit={handlOnSubmit}>
        {editBookTemplate.map((book) => (
          <CustomInput key={book.name} {...book} onChange={handleOnChange} />
        ))}

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

import React from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../custominput/CustomInput";
import { bookTemplate } from "../../../assets/custominputs/bookTemplate";
import useForm from "../../../hooks/useForm";
import { postNewBook } from "../../../features/books/bookAction";

const NewBookForm = () => {
  const initialState = {};

  const { form, setForm, handleOnChange } = useForm(initialState);

  // Function to submit form
  const handlOnSubmit = async (e) => {
    e.preventDefault();
    const data = await postNewBook(form);
    console.log(data);
  };

  return (
    <div className="p-4">
      <h3>Insert new book details !</h3>
      <Form className="m-3" onSubmit={handlOnSubmit}>
        {bookTemplate.map((book) => (
          <CustomInput key={book.name} {...book} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button type="submit" variant="info">
            Add Book
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewBookForm;

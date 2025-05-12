import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../custominput/CustomInput";
import { bookTemplate } from "../../../assets/custominputs/bookTemplate";
import useForm from "../../../hooks/useForm";
import { postNewBook } from "../../../features/books/bookAction";
import { data } from "react-router-dom";

const NewBookForm = () => {
  const [image, setImage] = useState();
  const initialState = {};

  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleOnImgSelect = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to submit form
  const handlOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append("image", image);
    const data = await postNewBook(formData);
    return data;
  };

  return (
    <div className="p-4">
      <h3>Insert new book details !</h3>
      <Form className="m-3" onSubmit={handlOnSubmit}>
        {bookTemplate.map((book) => (
          <CustomInput key={book.name} {...book} onChange={handleOnChange} />
        ))}

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="image"
            onChange={handleOnImgSelect}
            required
            accept="image/*"
          />
        </Form.Group>

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

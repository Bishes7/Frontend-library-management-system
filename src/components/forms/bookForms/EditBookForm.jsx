import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../custominput/CustomInput";
import { editBookTemplate } from "../../../assets/custominputs/bookTemplate";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { updateBookApi } from "../../../features/books/bookApi";
import { toast } from "react-toastify";

const EditBookForm = () => {
  const initialState = {};
  const { form, setForm, handleOnChange } = useForm(initialState);

  const [image, setImage] = useState([]);
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

  // Edit Book Img
  const handleOnImgSelect = (e) => {
    const files = [...e.target.files];
    if (files.length > 2) {
      e.target.value = "";
      toast.error("Max 2 images are allowed");
    }
    setImage([...e.target.files]);
  };

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

    const formData = new FormData();

    for (const key in rest) {
      formData.append(key, rest[key]);
    }

    image.map((img) => formData.append("image", img));

    const result = await updateBookApi(formData);
    return result;
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

        <div className="m-3 d-flex">
          {form?.imageList?.map((img) => (
            <div key={img} className="m-1">
              <Form.Check
                type="radio"
                name="imgUrl"
                value={img}
                checked={form.imgUrl === img}
                onChange={handleOnChange}
              />
              <Form.Label>Make Thumbnail</Form.Label>
              <Form.Check type="checkbox" />
              <Form.Label>Delete</Form.Label>

              <img
                src={import.meta.env.VITE_BASE_URl + img.slice(6)}
                width="250px"
                className="img-thumbnail"
                alt=""
              />
            </div>
          ))}
        </div>
        <Form.Group className="mb-3 fw-bold text-info ">
          <Form.Label>Upload more images (Max - 2)</Form.Label>
          <Form.Control
            type="file"
            name="image"
            multiple
            accept="image/*"
            onChange={handleOnImgSelect}
          ></Form.Control>
        </Form.Group>

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
          <Button type="submit" variant="warning">
            Edit Book
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditBookForm;

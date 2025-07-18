import React from "react";
import useForm from "../../hooks/useForm";
import { Button, Form } from "react-bootstrap";
import { reviewTemplate } from "../../assets/custominputs/reviewTemplate";
import CustomInput from "../custominput/CustomInput";
import { useDispatch } from "react-redux";
import { postNewReview } from "../../features/review/reviewAction";

const ReviewForm = ({ borrowData }) => {
  const dispatch = useDispatch();
  const initialState = {};
  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      borrowId: borrowData._id,
      bookId: borrowData.bookId,
    };
    // call review api from action
    dispatch(postNewReview(payload));
  };

  return (
    <div className="p-4">
      <Form className="m-2" onSubmit={handleOnSubmit}>
        {reviewTemplate.map((item) => (
          <CustomInput {...item} key={item.name} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button type="Submit">Add a Review</Button>
        </div>
      </Form>
    </div>
  );
};

export default ReviewForm;

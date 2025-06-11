import "./App.css";

import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUserBooks } from "./features/books/bookAction";
import { ModalWrapper } from "./components/modelWrapper/ModalWrapper";
import { fetchAllReviews } from "./features/review/reviewAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserBooks());
    dispatch(fetchAllReviews());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
      <ToastContainer />
      <ModalWrapper />
    </>
  );
}

export default App;

import "./App.css";

import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUserBooks } from "./features/books/bookAction";
import { ModalWrapper } from "./components/modelWrapper/ModalWrapper";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserBooks());
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

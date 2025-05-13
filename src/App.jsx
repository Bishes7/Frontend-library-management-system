import "./App.css";

import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUserBooks } from "./features/books/bookAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserBooks());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;

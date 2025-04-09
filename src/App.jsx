import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function App() {
  toast.info("hello");
  return (
    <>
      <ToastContainer />
      <div>Coming soon</div>;<Button>Hello</Button>
    </>
  );
}

export default App;

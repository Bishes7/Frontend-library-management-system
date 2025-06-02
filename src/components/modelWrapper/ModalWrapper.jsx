import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModalShow } from "../../features/system/systemSlice";

export const ModalWrapper = (props) => {
  const dispatch = useDispatch();
  const { modalShow, modalContent } = useSelector((state) => state.systemInfo);
  return (
    <Modal
      show={modalShow}
      onHide={() => dispatch(setModalShow(false))}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalContent.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent.content}</Modal.Body>
    </Modal>
  );
};

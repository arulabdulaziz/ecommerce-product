import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { convertMoney } from "../helper";

const ModalKeranjang = ({
  showModal,
  handleClose,
  chartDetail,
  amount,
  note,
  plus,
  minus,
  changeHandler,
  handleSubmit,
  totalPrice,
  deleteOrder,
  loadingModal
}) => {
  if (chartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {chartDetail.product.name}{" "}
            <strong>({convertMoney(chartDetail.product.price)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>{convertMoney(+totalPrice)}</strong>
              </p>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Amount :</Form.Label>
              <br />
              <Button
                variant="primary"
                size="sm"
                className="mr-2"
                onClick={() => minus()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>

              <strong>{amount}</strong>

              <Button
                variant="primary"
                size="sm"
                className="ml-2"
                onClick={() => plus()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Note :</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="note"
                placeholder="Example: pedas, telur 2"
                value={note}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loadingModal}>
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => deleteOrder(chartDetail.id)}
            disabled={loadingModal}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete Order
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>Not Found</Modal.Body>
      </Modal>
    );
  }
};

export default ModalKeranjang;

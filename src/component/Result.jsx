import React, { useState } from "react";
import { Row, Col, Card, ListGroup, Spinner, Badge } from "react-bootstrap";
import TotalPayment from "./TotalPayment";
import { convertMoney } from "../helper";
import ModalChart from "./ModalChart";
import axios from "../axios/axios";
import swal from "sweetalert";
function Result(props) {
  const initialModalState = {
    showModal: false,
    chartDetail: null,
    amount: 0,
    note: "",
    totalPrice: 0,
  };
  const [modalState, setModalState] = useState({ ...initialModalState });
  const [loadingModal, setLoadingModal] = useState(false);
  const handleClose = () => {
    setModalState({ ...initialModalState });
  };
  const plus = () => {
    setModalState({
      ...modalState,
      amount: modalState.amount + 1,
      totalPrice:
        modalState.chartDetail.product.price * (modalState.amount + 1),
    });
  };

  const minus = () => {
    if (modalState.amount !== 1) {
      setModalState({
        ...modalState,
        amount: modalState.amount - 1,
        totalPrice:
          modalState.chartDetail.product.price * (modalState.amount - 1),
      });
    }
  };

  const changeHandler = (event) => {
    setModalState({
      ...modalState,
      note: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const payload = {
        amount: modalState.amount,
        total_price: modalState.totalPrice,
        product: modalState.chartDetail.product,
        note: modalState.note,
      };
      setLoadingModal(true);
      const { data } = await axios.put(
        "charts/" + modalState.chartDetail.id,
        payload
      );
      props.fetchCharts();
      swal({
        title: "Success Update  Chart",
        text: payload.product.name + " has been updated from chart",
        icon: "success",
        button: false,
        timer: 1500,
      });
      setModalState({ ...initialModalState });
    } catch (error) {
      swal({
        title: "Error",
        icon: "error",
        text: JSON.stringify(error),
      });
    } finally {
      setLoadingModal(false);
    }
  };
  const deleteOrder = async (id) => {
    try {
      setLoadingModal(true);
      const { data } = await axios.delete("charts/" + id);
      swal({
        title: "Success Remove from Chart",
        text: modalState.chartDetail.product.name + " has been deleted from chart",
        icon: "success",
        button: false,
        timer: 1500,
      });
      props.fetchCharts();
      setModalState({ ...initialModalState });
    } catch (error) {
      swal({
        title: "Error",
        icon: "error",
        text: JSON.stringify(error),
      });
    } finally {
      setLoadingModal(false);
    }
  };
  const handleShow = (chart) => {
    setModalState({
      showModal: true,
      chartDetail: chart,
      amount: chart.amount,
      note: chart.note,
      totalPrice: chart.total_price,
    });
  };
  const { charts, error, loading } = props;
  const title = (
    <div>
      <h4>
        <strong>Result</strong>
      </h4>
      <hr />
    </div>
  );
  if (loading) {
    return (
      <div className="text-center">
        {title}
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  } else if (error) {
    return (
      <div>
        {title}
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }
  return (
    <div>
      {title}
      {charts.length == 0 && (
        <h5>
          <strong>Not Any Chart</strong>
        </h5>
      )}
      {charts.length != 0 && (
        <Card className="overflow-auto">
          <ListGroup variant="flush" className="result">
            {charts.map((e) => (
              <ListGroup.Item
                key={e.id}
                onClick={() => handleShow(e)}
                className="cursor-pointer"
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {e.amount}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{e.product.name}</h5>
                    <p>{convertMoney(e.product.price)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      {convertMoney(e.total_price)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalChart
              loadingModal={loadingModal}
              handleClose={handleClose}
              {...modalState}
              plus={plus}
              minus={minus}
              changeHandler={changeHandler}
              deleteOrder={deleteOrder}
              handleSubmit={handleSubmit}
            />
          </ListGroup>
        </Card>
      )}
      <TotalPayment charts={charts} />
    </div>
  );
}

export default Result;
